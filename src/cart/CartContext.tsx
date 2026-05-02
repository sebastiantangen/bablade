import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import type { ReactNode } from 'react'
import products from '@/data/products'
import type { Product } from '@/data/products'

export type CartLine = {
  product: Product
  quantity: number
  lineTotal: number
}

type CartItem = {
  productId: number
  quantity: number
}

type CartContextValue = {
  items: CartItem[]
  lines: CartLine[]
  itemCount: number
  subtotal: number
  isCartOpen: boolean
  addItem: (productId: number, quantity?: number) => void
  decrementItem: (productId: number) => void
  removeItem: (productId: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)
const storageKey = 'bablade-cart'
const maxQuantity = 99

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [hasLoadedStoredCart, setHasLoadedStoredCart] = useState(false)

  useEffect(() => {
    try {
      const storedCart = window.localStorage.getItem(storageKey)
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart)
        if (Array.isArray(parsedCart)) {
          setItems(normalizeItems(parsedCart))
        }
      }
    } catch {
      window.localStorage.removeItem(storageKey)
    } finally {
      setHasLoadedStoredCart(true)
    }
  }, [])

  useEffect(() => {
    if (!hasLoadedStoredCart) return

    window.localStorage.setItem(storageKey, JSON.stringify(items))
  }, [hasLoadedStoredCart, items])

  const lines = useMemo(() => {
    return items
      .map((item) => {
        const product = products.find((candidate) => candidate.id === item.productId)
        if (!product) return null

        return {
          product,
          quantity: item.quantity,
          lineTotal: product.price * item.quantity,
        }
      })
      .filter((line): line is CartLine => line !== null)
  }, [items])

  const itemCount = useMemo(
    () => lines.reduce((sum, line) => sum + line.quantity, 0),
    [lines],
  )

  const subtotal = useMemo(
    () => lines.reduce((sum, line) => sum + line.lineTotal, 0),
    [lines],
  )

  const addItem = useCallback((productId: number, quantity = 1) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.productId === productId)
      const nextQuantity = Math.min(maxQuantity, Math.max(1, quantity))

      if (existingItem) {
        return currentItems.map((item) =>
          item.productId === productId
            ? {
                ...item,
                quantity: Math.min(maxQuantity, item.quantity + nextQuantity),
              }
            : item,
        )
      }

      return [...currentItems, { productId, quantity: nextQuantity }]
    })
  }, [])

  const decrementItem = useCallback((productId: number) => {
    setItems((currentItems) =>
      currentItems.flatMap((item) => {
        if (item.productId !== productId) return [item]

        const quantity = item.quantity - 1
        return quantity > 0 ? [{ ...item, quantity }] : []
      }),
    )
  }, [])

  const removeItem = useCallback((productId: number) => {
    setItems((currentItems) => currentItems.filter((item) => item.productId !== productId))
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      lines,
      itemCount,
      subtotal,
      isCartOpen,
      addItem,
      decrementItem,
      removeItem,
      clearCart,
      openCart: () => setIsCartOpen(true),
      closeCart: () => setIsCartOpen(false),
    }),
    [addItem, clearCart, decrementItem, isCartOpen, itemCount, items, lines, removeItem, subtotal],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const value = useContext(CartContext)

  if (!value) {
    throw new Error('useCart must be used inside CartProvider')
  }

  return value
}

function normalizeItems(value: unknown[]): CartItem[] {
  return value.reduce<CartItem[]>((items, candidate) => {
    if (!isStoredCartItem(candidate)) return items
    if (!products.some((product) => product.id === candidate.productId)) return items

    const existingItem = items.find((item) => item.productId === candidate.productId)
    const quantity = Math.min(maxQuantity, Math.max(1, candidate.quantity))

    if (existingItem) {
      existingItem.quantity = Math.min(maxQuantity, existingItem.quantity + quantity)
      return items
    }

    return [...items, { productId: candidate.productId, quantity }]
  }, [])
}

function isStoredCartItem(value: unknown): value is CartItem {
  if (!value || typeof value !== 'object') return false

  const candidate = value as Record<string, unknown>

  return (
    Number.isInteger(candidate.productId) &&
    Number.isInteger(candidate.quantity) &&
    Number(candidate.productId) > 0 &&
    Number(candidate.quantity) > 0
  )
}
