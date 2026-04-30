import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { LoaderCircle, Minus, Plus, ShoppingBag, X } from 'lucide-react'
import type { Product } from '@/data/products'

type OrderPanelProps = {
  isOpen: boolean
  product: Product | null
  onClose: () => void
}

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error'

const phoneErrorText = 'Skriv inn et gyldig norsk telefonnummer.'

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

export default function OrderPanel({ isOpen, product, onClose }: OrderPanelProps) {
  const [quantity, setQuantity] = useState(1)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [status, setStatus] = useState<SubmitStatus>('idle')

  useEffect(() => {
    if (!isOpen || !product) return

    setQuantity(1)
    setPhoneNumber('')
    setPhoneError('')
    setSubmitError('')
    setStatus('idle')
  }, [isOpen, product])

  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && status !== 'submitting') {
        onClose()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen, onClose, status])

  const total = useMemo(() => {
    if (!product) return 0
    return product.price * quantity
  }, [product, quantity])

  if (!isOpen || !product) return null

  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(1, current - 1))
  }

  const increaseQuantity = () => {
    setQuantity((current) => Math.min(99, current + 1))
  }

  const handleQuantityChange = (value: string) => {
    const nextQuantity = Number(value)

    if (!Number.isInteger(nextQuantity)) return

    setQuantity(Math.min(99, Math.max(1, nextQuantity)))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const normalizedPhone = normalizeNorwegianPhone(phoneNumber)

    if (!normalizedPhone) {
      setPhoneError(phoneErrorText)
      setStatus('idle')
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
          phoneNumber: normalizedPhone,
          items: [
            {
              productId: product.id,
              quantity,
            },
          ],
        }),
      })

      if (!response.ok) {
        throw new Error('Order request failed')
      }

      setStatus('success')
    } catch {
      setSubmitError('Kunne ikke sende bestillingen akkurat nå. Prøv igjen om litt.')
      setStatus('error')
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/45 px-4 py-4 md:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-panel-title"
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Lukk bestilling"
        onClick={() => {
          if (status !== 'submitting') onClose()
        }}
      />

      <div className="relative max-h-[calc(100vh-2rem)] w-full max-w-md overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl md:rounded-2xl md:p-6">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-full text-white"
              style={{ background: `linear-gradient(135deg, ${product.color}, ${product.colorAlt})` }}
            >
              <ShoppingBag size={21} aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-gray-400">Bestilling</p>
              <h2
                id="order-panel-title"
                className="text-2xl font-black leading-tight text-gray-950"
                style={{ fontFamily: 'Righteous, sans-serif' }}
              >
                Kjøp Bablade
              </h2>
            </div>
          </div>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-gray-200 disabled:opacity-50"
            title="Lukk"
            onClick={onClose}
            disabled={status === 'submitting'}
          >
            <X size={20} aria-hidden="true" />
            <span className="sr-only">Lukk</span>
          </button>
        </div>

        {status === 'success' ? (
          <div className="rounded-2xl bg-green-50 p-5 text-green-950">
            <p className="text-lg font-black leading-relaxed">
              Takk for din bestilling! Vi kontakter deg snart for betaling via Vipps.
            </p>
            <button
              type="button"
              className="mt-5 w-full rounded-2xl bg-green-700 px-5 py-3 font-black text-white transition hover:bg-green-800"
              onClick={onClose}
            >
              Lukk
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <p className="text-xs font-black uppercase tracking-widest text-gray-400">Valgte produkter</p>
              <div className="mt-3 flex items-center justify-between gap-4">
                <div>
                  <p className="font-black text-gray-950">{product.name}</p>
                  <p className="text-sm text-gray-500">kr {product.price},– per flaske</p>
                </div>
                <div
                  className="h-10 w-10 rounded-full"
                  style={{ background: `linear-gradient(135deg, ${product.color}, ${product.colorAlt})` }}
                  aria-hidden="true"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-black text-gray-800" htmlFor="order-quantity">
                Antall
              </label>
              <div className="grid grid-cols-[44px_1fr_44px] overflow-hidden rounded-2xl border border-gray-200">
                <button
                  type="button"
                  className="flex h-12 items-center justify-center bg-gray-50 text-gray-700 transition hover:bg-gray-100"
                  title="Reduser antall"
                  onClick={decreaseQuantity}
                >
                  <Minus size={18} aria-hidden="true" />
                  <span className="sr-only">Reduser antall</span>
                </button>
                <input
                  id="order-quantity"
                  className="h-12 min-w-0 border-x border-gray-200 text-center font-black text-gray-950 outline-none"
                  inputMode="numeric"
                  min="1"
                  max="99"
                  type="number"
                  value={quantity}
                  onChange={(event) => handleQuantityChange(event.target.value)}
                />
                <button
                  type="button"
                  className="flex h-12 items-center justify-center bg-gray-50 text-gray-700 transition hover:bg-gray-100"
                  title="Øk antall"
                  onClick={increaseQuantity}
                >
                  <Plus size={18} aria-hidden="true" />
                  <span className="sr-only">Øk antall</span>
                </button>
              </div>
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

            <div className="flex items-center justify-between rounded-2xl bg-gray-950 px-4 py-3 text-white">
              <span className="text-sm font-bold text-white/70">Totalt</span>
              <span className="text-2xl font-black" style={{ fontFamily: 'Righteous, sans-serif' }}>
                kr {total},–
              </span>
            </div>

            {submitError ? (
              <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
                {submitError}
              </p>
            ) : null}

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-4 text-lg font-black text-white transition hover:scale-[1.01] hover:shadow-xl active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
              style={{
                background: `linear-gradient(135deg, ${product.color}, ${product.colorAlt})`,
                boxShadow: `0 12px 28px ${product.color}35`,
                fontFamily: 'Righteous, sans-serif',
                letterSpacing: '1px',
              }}
              disabled={status === 'submitting'}
            >
              {status === 'submitting' ? (
                <>
                  <LoaderCircle className="animate-spin" size={20} aria-hidden="true" />
                  Sender
                </>
              ) : (
                'Bestill nå'
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
