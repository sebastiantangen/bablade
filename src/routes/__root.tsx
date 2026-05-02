import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'
import CartDrawer from '@/cart/CartDrawer'
import { CartProvider } from '@/cart/CartContext'
import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Bablade – Norsk Sommerbrus' },
      { name: 'description', content: 'Bablade er den ultimate norske sommerbrusen i 6 unike smaker. Opplev norsk sommer i hver flaske.' },
    ],
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Righteous&family=Nunito:wght@400;500;600;700;800;900&display=swap',
      },
    ],
  }),
  component: RootComponent,
  shellComponent: RootDocument,
})

function RootComponent() {
  return (
    <CartProvider>
      <Outlet />
      <CartDrawer />
    </CartProvider>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="no">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
