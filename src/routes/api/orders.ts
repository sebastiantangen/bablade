import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import products from '@/data/products'

export const Route = createFileRoute('/api/orders')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown

        try {
          body = await request.json()
        } catch {
          return Response.json({ message: 'Ugyldig bestilling.' }, { status: 400 })
        }

        const parsedOrder = orderSchema.safeParse(body)

        if (!parsedOrder.success) {
          return Response.json({ message: 'Ugyldig bestilling.' }, { status: 400 })
        }

        const phoneNumber = normalizeNorwegianPhone(parsedOrder.data.phoneNumber)

        if (!phoneNumber) {
          return Response.json({ message: 'Ugyldig telefonnummer.' }, { status: 400 })
        }

        const orderItems = parsedOrder.data.items.map((item) => {
          const product = products.find((candidate) => candidate.id === item.productId)
          return product ? { product, quantity: item.quantity } : null
        })

        if (orderItems.some((item) => item === null)) {
          return Response.json({ message: 'Ugyldig produkt.' }, { status: 400 })
        }

        const confirmedItems = orderItems.filter((item) => item !== null)
        const orderedAt = new Date()

        try {
          await sendOrderEmail({
            items: confirmedItems,
            phoneNumber,
            orderedAt,
          })
        } catch (error) {
          console.error('Order email failed', error)

          return Response.json(
            { message: 'Bestilling er midlertidig utilgjengelig.' },
            { status: 503 },
          )
        }

        return Response.json({ ok: true })
      },
    },
  },
})

const orderSchema = z.object({
  phoneNumber: z.string().min(1),
  items: z
    .array(
      z.object({
        productId: z.number().int().positive(),
        quantity: z.number().int().min(1).max(99),
      }),
    )
    .min(1)
    .max(20),
})

type OrderEmailInput = {
  items: Array<{
    product: (typeof products)[number]
    quantity: number
  }>
  phoneNumber: string
  orderedAt: Date
}

function normalizeNorwegianPhone(value: string) {
  const trimmed = value.trim()

  if (!trimmed) return null
  if (!/^[\d\s()+-]+$/.test(trimmed)) return null

  const digits = trimmed.replace(/\D/g, '')
  let localNumber = digits

  if (digits.startsWith('0047') && digits.length === 12) {
    localNumber = digits.slice(4)
  } else if (digits.startsWith('47') && digits.length === 10) {
    localNumber = digits.slice(2)
  }

  if (!/^\d{8}$/.test(localNumber)) return null

  return `+47 ${localNumber.slice(0, 3)} ${localNumber.slice(3, 5)} ${localNumber.slice(5)}`
}

async function sendOrderEmail({ items, phoneNumber, orderedAt }: OrderEmailInput) {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.ORDER_EMAIL_TO
  const from = process.env.ORDER_EMAIL_FROM ?? 'Bablade <orders@resend.dev>'

  if (!apiKey || !to) {
    throw new Error('Missing RESEND_API_KEY or ORDER_EMAIL_TO')
  }

  const orderTime = new Intl.DateTimeFormat('nb-NO', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Europe/Oslo',
  }).format(orderedAt)

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const itemLines = items.map(
    ({ product, quantity }) =>
      `${product.name} (${product.flavor}) x ${quantity} - kr ${product.price * quantity},-`,
  )

  const text = [
    'Ny bestilling fra Bablade',
    '',
    'Produkter:',
    ...itemLines,
    '',
    `Antall totalt: ${items.reduce((sum, item) => sum + item.quantity, 0)}`,
    `Totalsum: kr ${total},-`,
    `Telefonnummer: ${phoneNumber}`,
    `Tidspunkt: ${orderTime}`,
  ].join('\n')

  const html = `
    <h1>Ny bestilling fra Bablade</h1>
    <table cellpadding="8" cellspacing="0" style="border-collapse: collapse;">
      <thead>
        <tr>
          <th align="left">Produkt</th>
          <th align="left">Smak</th>
          <th align="right">Antall</th>
          <th align="right">Sum</th>
        </tr>
      </thead>
      <tbody>
        ${items
          .map(
            ({ product, quantity }) => `
              <tr>
                <td>${escapeHtml(product.name)}</td>
                <td>${escapeHtml(product.flavor)}</td>
                <td align="right">${quantity}</td>
                <td align="right">kr ${product.price * quantity},-</td>
              </tr>
            `,
          )
          .join('')}
      </tbody>
    </table>
    <p><strong>Totalsum:</strong> kr ${total},-</p>
    <p><strong>Telefonnummer:</strong> ${escapeHtml(phoneNumber)}</p>
    <p><strong>Tidspunkt:</strong> ${escapeHtml(orderTime)}</p>
  `

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: to.split(',').map((email) => email.trim()).filter(Boolean),
      subject: `Ny Bablade-bestilling - ${phoneNumber}`,
      text,
      html,
    }),
  })

  if (!response.ok) {
    throw new Error(`Resend failed with ${response.status}: ${await response.text()}`)
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}
