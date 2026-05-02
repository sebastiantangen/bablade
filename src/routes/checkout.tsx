import { Link, createFileRoute } from '@tanstack/react-router'
import { CheckCircle2, LoaderCircle, ShoppingCart } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { useCart } from '@/cart/CartContext'

export const Route = createFileRoute('/checkout')({
  component: CheckoutPage,
})

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error'

const phoneErrorText = 'Skriv inn et gyldig norsk telefonnummer.'

function CheckoutPage() {
  const { clearCart, items, lines, subtotal } = useCart()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [status, setStatus] = useState<SubmitStatus>('idle')

  const itemCount = useMemo(
    () => lines.reduce((sum, line) => sum + line.quantity, 0),
    [lines],
  )

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const normalizedPhone = normalizeNorwegianPhone(phoneNumber)

    if (!normalizedPhone) {
      setPhoneError(phoneErrorText)
      setStatus('idle')
      return
    }

    if (items.length === 0) {
      setSubmitError('Handlekurven er tom.')
      return
    }

    setPhoneError('')
    setSubmitError('')
    setStatus('submitting')

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer: {
            name,
            email,
            phoneNumber: normalizedPhone,
          },
          items,
        }),
      })

      const body = await response.json().catch(() => null)

      if (!response.ok) {
        throw new Error(body?.message ?? 'Order request failed')
      }

      clearCart()
      setStatus('success')
    } catch (error) {
      setSubmitError(
        error instanceof Error && error.message
          ? error.message
          : 'Kunne ikke sende bestillingen akkurat nå. Prøv igjen om litt.',
      )
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <main
        className="min-h-screen bg-green-50 px-5 py-16"
        style={{ fontFamily: 'Nunito, sans-serif' }}
      >
        <section className="mx-auto flex max-w-xl flex-col items-center text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-700 text-white">
            <CheckCircle2 size={38} aria-hidden="true" />
          </div>
          <h1
            className="text-4xl font-black text-gray-950"
            style={{ fontFamily: 'Righteous, sans-serif' }}
          >
            Bestilling mottatt
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-gray-700">
            Takk for bestillingen. Vi sender en bekreftelse på e-post og kontakter deg
            for betaling med Vipps før ordren bekreftes.
          </p>
          <Link
            to="/"
            className="mt-8 rounded-full bg-green-700 px-7 py-3 font-black text-white transition hover:bg-green-800"
          >
            Til forsiden
          </Link>
        </section>
      </main>
    )
  }

  return (
    <main
      className="min-h-screen bg-[#f8fffe] px-5 py-12"
      style={{ fontFamily: 'Nunito, sans-serif' }}
    >
      <div className="mx-auto max-w-5xl">
        <Link
          to="/"
          className="mb-8 inline-flex items-center rounded-full bg-white px-5 py-2.5 text-sm font-black text-green-800 shadow-sm transition hover:bg-green-50"
        >
          ← Fortsett å handle
        </Link>

        <div className="mb-9">
          <p className="text-sm font-black uppercase tracking-widest text-green-700">
            Bablade bestilling
          </p>
          <h1
            className="mt-2 text-4xl font-black text-gray-950 md:text-6xl"
            style={{ fontFamily: 'Righteous, sans-serif' }}
          >
            Fullfør bestilling
          </h1>
          <p className="mt-3 max-w-2xl text-gray-600">
            Send inn bestillingen, så kontakter vi deg og sender betalingskrav på Vipps.
          </p>
        </div>

        {lines.length === 0 ? (
          <section className="rounded-3xl border border-gray-200 bg-white px-6 py-12 text-center shadow-sm">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-800">
              <ShoppingCart size={28} aria-hidden="true" />
            </div>
            <h2 className="text-2xl font-black text-gray-950">Handlekurven er tom</h2>
            <p className="mt-2 text-gray-500">
              Du må legge til minst én Bablade før du kan sende bestilling.
            </p>
            <Link
              to="/"
              hash="smaker"
              className="mt-7 inline-block rounded-full bg-green-700 px-7 py-3 font-black text-white transition hover:bg-green-800"
            >
              Velg smaker
            </Link>
          </section>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm md:p-7"
            >
              <h2 className="text-2xl font-black text-gray-950">Kontaktinformasjon</h2>
              <p className="mt-2 text-sm text-gray-500">
                Vi bruker dette til ordrebekreftelse og Vipps-betalingen.
              </p>

              <div className="mt-6 space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-black text-gray-800" htmlFor="order-name">
                    Navn
                  </label>
                  <input
                    id="order-name"
                    className="h-12 w-full rounded-2xl border border-gray-200 px-4 font-semibold text-gray-950 outline-none transition focus:border-green-700 focus:ring-4 focus:ring-green-700/10"
                    autoComplete="name"
                    minLength={2}
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-black text-gray-800" htmlFor="order-email">
                    E-post
                  </label>
                  <input
                    id="order-email"
                    className="h-12 w-full rounded-2xl border border-gray-200 px-4 font-semibold text-gray-950 outline-none transition focus:border-green-700 focus:ring-4 focus:ring-green-700/10"
                    autoComplete="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-black text-gray-800" htmlFor="order-phone">
                    Telefonnummer
                  </label>
                  <input
                    id="order-phone"
                    className="h-12 w-full rounded-2xl border border-gray-200 px-4 font-semibold text-gray-950 outline-none transition focus:border-green-700 focus:ring-4 focus:ring-green-700/10"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="+47 123 45 678"
                    type="tel"
                    value={phoneNumber}
                    onBlur={() => {
                      if (phoneNumber && !normalizeNorwegianPhone(phoneNumber)) {
                        setPhoneError(phoneErrorText)
                      }
                    }}
                    onChange={(event) => {
                      setPhoneNumber(event.target.value)
                      setPhoneError('')
                    }}
                    required
                  />
                  {phoneError ? (
                    <p className="mt-2 text-sm font-bold text-red-700">{phoneError}</p>
                  ) : null}
                </div>
              </div>

              {submitError ? (
                <p className="mt-6 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
                  {submitError}
                </p>
              ) : null}

              <button
                type="submit"
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-2xl bg-green-700 px-5 py-4 text-lg font-black text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-70"
                style={{ fontFamily: 'Righteous, sans-serif' }}
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? (
                  <>
                    <LoaderCircle className="animate-spin" size={20} aria-hidden="true" />
                    Sender bestilling
                  </>
                ) : (
                  'Send bestilling'
                )}
              </button>
            </form>

            <aside className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
              <h2 className="text-2xl font-black text-gray-950">Ordre</h2>
              <div className="mt-5 space-y-4">
                {lines.map(({ product, quantity, lineTotal }) => (
                  <div key={product.id} className="flex gap-3">
                    <div
                      className="h-12 w-12 shrink-0 rounded-2xl"
                      style={{
                        background: `linear-gradient(135deg, ${product.color}, ${product.colorAlt})`,
                      }}
                      aria-hidden="true"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-black leading-tight text-gray-950">{product.name}</p>
                      <p className="text-sm text-gray-500">
                        {quantity} × kr {product.price},-
                      </p>
                    </div>
                    <p className="font-black text-gray-950">kr {lineTotal},-</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-gray-200 pt-5">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Antall flasker</span>
                  <span className="font-black text-gray-950">{itemCount}</span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-black text-gray-950">Totalsum</span>
                  <span
                    className="text-3xl font-black text-gray-950"
                    style={{ fontFamily: 'Righteous, sans-serif' }}
                  >
                    kr {subtotal},-
                  </span>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  )
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
