import { Link } from '@tanstack/react-router'
import { Minus, Plus, ShoppingCart, Trash2, X } from 'lucide-react'
import { useEffect } from 'react'
import { useCart } from '@/cart/CartContext'

export default function CartDrawer() {
  const {
    closeCart,
    decrementItem,
    isCartOpen,
    itemCount,
    lines,
    openCart,
    removeItem,
    addItem,
    subtotal,
  } = useCart()

  useEffect(() => {
    if (!isCartOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeCart()
    }

    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [closeCart, isCartOpen])

  return (
    <>
      <button
        type="button"
        className="fixed right-4 top-4 z-40 flex h-12 min-w-12 items-center justify-center gap-2 rounded-full bg-gray-950 px-4 text-white shadow-xl transition hover:scale-105 active:scale-95"
        title="Åpne handlekurv"
        onClick={openCart}
      >
        <ShoppingCart size={20} aria-hidden="true" />
        {itemCount > 0 ? (
          <span className="min-w-5 rounded-full bg-green-500 px-1.5 text-center text-xs font-black text-gray-950">
            {itemCount}
          </span>
        ) : null}
        <span className="sr-only">Åpne handlekurv</span>
      </button>

      {isCartOpen ? (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-black/45"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cart-title"
        >
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            aria-label="Lukk handlekurv"
            onClick={closeCart}
          />

          <aside className="relative flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between gap-4 border-b border-gray-200 px-5 py-4">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-green-700">
                  Bablade
                </p>
                <h2
                  id="cart-title"
                  className="text-2xl font-black text-gray-950"
                  style={{ fontFamily: 'Righteous, sans-serif' }}
                >
                  Handlekurv
                </h2>
              </div>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-gray-200"
                title="Lukk"
                onClick={closeCart}
              >
                <X size={20} aria-hidden="true" />
                <span className="sr-only">Lukk</span>
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-800">
                  <ShoppingCart size={28} aria-hidden="true" />
                </div>
                <p className="text-lg font-black text-gray-950">Handlekurven er tom</p>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-gray-500">
                  Legg til noen flasker, så samler vi bestillingen her.
                </p>
                <button
                  type="button"
                  className="mt-6 rounded-full bg-green-700 px-6 py-3 text-sm font-black text-white transition hover:bg-green-800"
                  onClick={closeCart}
                >
                  Velg smaker
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
                  {lines.map(({ product, quantity, lineTotal }) => (
                    <div
                      key={product.id}
                      className="grid grid-cols-[56px_1fr] gap-4 rounded-2xl border border-gray-200 bg-white p-3"
                    >
                      <div
                        className="h-14 w-14 rounded-2xl"
                        style={{
                          background: `linear-gradient(135deg, ${product.color}, ${product.colorAlt})`,
                        }}
                        aria-hidden="true"
                      />
                      <div className="min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="truncate font-black text-gray-950">{product.name}</p>
                            <p className="text-sm text-gray-500">kr {product.price},- per flaske</p>
                          </div>
                          <button
                            type="button"
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-red-50 hover:text-red-700"
                            title="Fjern"
                            onClick={() => removeItem(product.id)}
                          >
                            <Trash2 size={16} aria-hidden="true" />
                            <span className="sr-only">Fjern {product.name}</span>
                          </button>
                        </div>

                        <div className="mt-4 flex items-center justify-between gap-3">
                          <div className="grid grid-cols-[36px_44px_36px] overflow-hidden rounded-full border border-gray-200">
                            <button
                              type="button"
                              className="flex h-9 items-center justify-center bg-gray-50 text-gray-700 transition hover:bg-gray-100"
                              title="Reduser antall"
                              onClick={() => decrementItem(product.id)}
                            >
                              <Minus size={15} aria-hidden="true" />
                              <span className="sr-only">Reduser antall</span>
                            </button>
                            <div className="flex h-9 items-center justify-center border-x border-gray-200 text-sm font-black text-gray-950">
                              {quantity}
                            </div>
                            <button
                              type="button"
                              className="flex h-9 items-center justify-center bg-gray-50 text-gray-700 transition hover:bg-gray-100"
                              title="Øk antall"
                              onClick={() => addItem(product.id)}
                            >
                              <Plus size={15} aria-hidden="true" />
                              <span className="sr-only">Øk antall</span>
                            </button>
                          </div>
                          <p className="font-black text-gray-950">kr {lineTotal},-</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 p-5">
                  <div className="mb-4 flex items-center justify-between rounded-2xl bg-gray-950 px-4 py-3 text-white">
                    <span className="text-sm font-bold text-white/70">Totalsum</span>
                    <span
                      className="text-2xl font-black"
                      style={{ fontFamily: 'Righteous, sans-serif' }}
                    >
                      kr {subtotal},-
                    </span>
                  </div>
                  <Link
                    to="/checkout"
                    className="block rounded-2xl bg-green-700 px-5 py-4 text-center text-lg font-black text-white transition hover:bg-green-800"
                    style={{ fontFamily: 'Righteous, sans-serif' }}
                    onClick={closeCart}
                  >
                    Gå til bestilling
                  </Link>
                  <p className="mt-3 text-center text-xs font-semibold text-gray-500">
                    Vi kontakter deg etterpå og sender betalingskrav på Vipps.
                  </p>
                </div>
              </>
            )}
          </aside>
        </div>
      ) : null}
    </>
  )
}
