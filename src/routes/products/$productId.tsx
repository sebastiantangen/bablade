import { useState } from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'
import OrderPanel from '@/components/OrderPanel'
import products, { type Product } from '../../data/products'

export const Route = createFileRoute('/products/$productId')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const product = products.find((p) => p.id === +params.productId)
    if (!product) throw new Error('Product not found')
    return product
  },
})

function NorwegianBg({ product }: { product: Product }) {
  const id = `detail-${product.id}`
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e88e5" />
          <stop offset="50%" stopColor="#90caf9" />
          <stop offset="100%" stopColor="#e3f2fd" />
        </linearGradient>
        <linearGradient id={`${id}-water`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={product.color} stopOpacity="0.55" />
          <stop offset="100%" stopColor={product.capColor} stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id={`${id}-mtn`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f5f5f5" />
          <stop offset="40%" stopColor="#b0bec5" />
          <stop offset="100%" stopColor="#607d8b" />
        </linearGradient>
        <linearGradient id={`${id}-overlay`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={product.color} stopOpacity="0.6" />
          <stop offset="50%" stopColor={product.color} stopOpacity="0.1" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Sky */}
      <rect width="1440" height="900" fill={`url(#${id}-sky)`} />
      {/* Flavor color overlay on left */}
      <rect width="1440" height="900" fill={`url(#${id}-overlay)`} />

      {/* Sun */}
      <circle cx="1200" cy="130" r="75" fill="#fff9c4" opacity="0.6" />
      <circle cx="1200" cy="130" r="50" fill="#ffee58" opacity="0.9" />

      {/* Clouds */}
      <g fill="white" opacity="0.8">
        <ellipse cx="250" cy="120" rx="110" ry="44" />
        <ellipse cx="195" cy="132" rx="74" ry="38" />
        <ellipse cx="315" cy="126" rx="85" ry="34" />
        <ellipse cx="700" cy="95" rx="125" ry="48" />
        <ellipse cx="645" cy="108" rx="88" ry="40" />
        <ellipse cx="770" cy="101" rx="94" ry="36" />
      </g>

      {/* Distant snow mountains */}
      <path
        d="M-50 580 L60 250 L100 285 L185 185 L240 240
           L330 155 L385 200 L480 110 L540 165 L615 95 L680 148
           L770 128 L830 180 L920 112 L978 162
           L1070 180 L1150 135 L1240 192 L1335 152 L1440 210 L1440 580 Z"
        fill={`url(#${id}-mtn)`}
        opacity="0.5"
      />
      {/* Snow caps */}
      <path d="M60 250 L100 285 L84 292 L67 276 Z" fill="white" opacity="0.9" />
      <path d="M185 185 L240 240 L218 248 L194 222 Z" fill="white" opacity="0.9" />
      <path d="M330 155 L385 200 L362 208 L342 178 Z" fill="white" opacity="0.9" />
      <path d="M480 110 L540 165 L518 172 L498 140 Z" fill="white" opacity="0.9" />
      <path d="M615 95 L680 148 L654 156 L628 122 Z" fill="white" opacity="0.9" />
      <path d="M770 128 L830 180 L808 187 L784 155 Z" fill="white" opacity="0.9" />
      <path d="M920 112 L978 162 L956 170 L934 138 Z" fill="white" opacity="0.9" />

      {/* Middle green mountains */}
      <path
        d="M-50 640 L45 380 L112 435 L195 355 L272 400
           L370 312 L440 360 L528 295 L610 348
           L705 278 L785 332 L868 265 L950 308
           L1048 285 L1125 338 L1210 296 L1312 348 L1440 305 L1440 640 Z"
        fill="#2d5a1b"
        opacity="0.9"
      />

      {/* Pine trees left side */}
      <g fill="#1a3a0d">
        {([0, 32, 62, 92, 122, 152, 182] as number[]).map((x, i) => (
          <polygon key={i} points={`${x},640 ${x + 17},552 ${x + 34},640`} />
        ))}
        {([16, 47, 77, 107, 137, 167] as number[]).map((x, i) => (
          <polygon key={i + 7} points={`${x},640 ${x + 14},564 ${x + 28},640`} />
        ))}
      </g>
      {/* Pine trees right */}
      <g fill="#1a3a0d">
        {([1200, 1232, 1262, 1292, 1322, 1352, 1382, 1412] as number[]).map((x, i) => (
          <polygon key={i + 15} points={`${x},640 ${x + 17},552 ${x + 34},640`} />
        ))}
      </g>

      {/* Fjord water */}
      <path
        d="M0 660 Q360 640 720 655 Q1080 670 1440 648 L1440 900 L0 900 Z"
        fill={`url(#${id}-water)`}
      />
      <path
        d="M0 678 Q360 663 720 676 Q1080 689 1440 672 L1440 684 Q1080 701 720 688 Q360 675 0 692 Z"
        fill="rgba(255,255,255,0.18)"
      />
      <path
        d="M0 698 Q360 683 720 696 Q1080 709 1440 692 L1440 704 Q1080 720 720 707 Q360 694 0 710 Z"
        fill="rgba(255,255,255,0.1)"
      />

      {/* Foreground meadow */}
      <path
        d="M-50 740 Q250 718 480 732 Q720 746 960 724 Q1200 702 1490 726
           L1490 900 L-50 900 Z"
        fill="#3d7a1e"
        opacity="0.95"
      />

      {/* Wildflowers */}
      {([80, 180, 280, 400, 560, 700, 820, 940, 1060, 1160, 1280, 1380] as number[]).map(
        (x, i) => (
          <circle
            key={i}
            cx={x}
            cy={750 + ((i * 9) % 22)}
            r="4.5"
            fill={['#ffeb3b', '#ff7043', '#f06292', '#ffffff', '#aed581', '#ce93d8'][i % 6]}
          />
        ),
      )}
    </svg>
  )
}

function LargeBottleSvg({ product }: { product: Product }) {
  const isMix = product.id === 6
  const gradId = `detail-label-${product.id}`
  const mixColors = ['#2e7d32', '#b71c1c', '#e65100', '#ad1457', '#6a1b9a', '#1565c0']

  return (
    <svg
      viewBox="0 0 200 480"
      className="w-full max-w-xs md:max-w-sm mx-auto"
      style={{
        filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.35))',
        animation: 'floatBottle 3s ease-in-out infinite alternate',
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          {isMix ? (
            mixColors.map((c, i) => (
              <stop key={i} offset={`${(i / (mixColors.length - 1)) * 100}%`} stopColor={c} />
            ))
          ) : (
            <>
              <stop offset="0%" stopColor={product.color} />
              <stop offset="100%" stopColor={product.colorAlt} />
            </>
          )}
        </linearGradient>
        <linearGradient id={`dl-plastic-${product.id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
          <stop offset="20%" stopColor="rgba(255,255,255,0.10)" />
          <stop offset="75%" stopColor="rgba(255,255,255,0.04)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.4)" />
        </linearGradient>
        <linearGradient id={`dl-cap-${product.id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.25)" />
        </linearGradient>
      </defs>

      {/* Drop shadow */}
      <ellipse cx="100" cy="463" rx="56" ry="13" fill="rgba(0,0,0,0.25)" />

      {/* Bottle plastic body */}
      <path
        d="M73 96
           C73 108 56 126 44 148 C38 160 35 172 35 185
           L35 365
           C35 390 42 412 58 428 C72 440 100 446 100 446
           C100 446 128 440 142 428 C158 412 165 390 165 365
           L165 185
           C165 172 162 160 156 148 C144 126 127 108 127 96 Z"
        fill="rgba(220,240,255,0.72)"
        stroke="rgba(180,215,248,0.5)"
        strokeWidth="1.2"
      />
      <path
        d="M73 96
           C73 108 56 126 44 148 C38 160 35 172 35 185
           L35 365
           C35 390 42 412 58 428 C72 440 100 446 100 446
           C100 446 128 440 142 428 C158 412 165 390 165 365
           L165 185
           C165 172 162 160 156 148 C144 126 127 108 127 96 Z"
        fill={`url(#dl-plastic-${product.id})`}
      />

      {/* Label */}
      <rect x="36" y="188" width="128" height="170" rx="5" fill={`url(#${gradId})`} />

      {/* Label sheen */}
      <rect x="38" y="190" width="24" height="166" rx="4" fill="rgba(255,255,255,0.2)" />
      <rect x="143" y="190" width="10" height="166" rx="3" fill="rgba(0,0,0,0.1)" />

      {/* Brand name */}
      <text
        x="100"
        y="252"
        textAnchor="middle"
        fill="white"
        fontSize="22"
        fontWeight="900"
        fontFamily="Righteous, sans-serif"
        letterSpacing="5"
      >
        BABLADE
      </text>

      {/* Flavor */}
      <text
        x="100"
        y="278"
        textAnchor="middle"
        fill="rgba(255,255,255,0.9)"
        fontSize="12"
        fontWeight="700"
        fontFamily="Nunito, sans-serif"
        letterSpacing="2"
      >
        {product.flavor.toUpperCase()}
      </text>

      <line x1="52" y1="290" x2="148" y2="290" stroke="rgba(255,255,255,0.35)" strokeWidth="0.8" />

      <text
        x="100"
        y="316"
        textAnchor="middle"
        fill="rgba(255,255,255,0.72)"
        fontSize="9.5"
        fontFamily="Nunito, sans-serif"
        letterSpacing="2.5"
      >
        NORSK SOMMERBRUS
      </text>

      {/* Decorative circles */}
      <circle cx="65" cy="330" r="3" fill="rgba(255,255,255,0.4)" />
      <circle cx="100" cy="330" r="3" fill="rgba(255,255,255,0.4)" />
      <circle cx="135" cy="330" r="3" fill="rgba(255,255,255,0.4)" />

      <text
        x="100"
        y="350"
        textAnchor="middle"
        fill="rgba(255,255,255,0.55)"
        fontSize="10"
        fontFamily="Nunito, sans-serif"
        letterSpacing="1"
      >
        0,5 L
      </text>

      {/* Bottom label area */}
      <path
        d="M36 358 L164 358 C164 358 158 378 142 391 C126 404 100 410 100 410 C100 410 74 404 58 391 C42 378 36 358 36 358 Z"
        fill={`url(#${gradId})`}
        opacity="0.45"
      />

      {/* Neck */}
      <rect x="73" y="58" width="54" height="40" rx="3" fill="rgba(210,235,252,0.72)" />
      <rect x="75" y="60" width="10" height="36" rx="2" fill="rgba(255,255,255,0.35)" />

      {/* Cap */}
      <rect x="69" y="16" width="62" height="44" rx="8" fill={product.capColor} />
      {([78, 87, 96, 105, 114, 122] as number[]).map((x) => (
        <line
          key={x}
          x1={x}
          y1="20"
          x2={x}
          y2="57"
          stroke="rgba(0,0,0,0.15)"
          strokeWidth="2"
        />
      ))}
      <rect
        x="71"
        y="18"
        width="28"
        height="40"
        rx="6"
        fill={`url(#dl-cap-${product.id})`}
      />
      <ellipse cx="90" cy="19" rx="18" ry="4.5" fill="rgba(255,255,255,0.28)" />
    </svg>
  )
}

function RouteComponent() {
  const product = Route.useLoaderData()
  const [isOrderOpen, setIsOrderOpen] = useState(false)

  return (
    <div
      className="min-h-screen"
      style={{ fontFamily: 'Nunito, sans-serif', background: '#f0faf0' }}
    >
      <OrderPanel
        isOpen={isOrderOpen}
        product={product}
        onClose={() => setIsOrderOpen(false)}
      />

      {/* Background */}
      <div className="fixed inset-0 z-0">
        <NorwegianBg product={product} />
        <div className="absolute inset-0 bg-white/35" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Back nav */}
        <div className="p-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 hover:scale-105"
            style={{
              background: 'rgba(255,255,255,0.75)',
              backdropFilter: 'blur(8px)',
              color: product.color,
            }}
          >
            ← Alle smaker
          </Link>
        </div>

        {/* Main content */}
        <div className="flex-1 flex items-center">
          <div className="w-full max-w-6xl mx-auto px-6 py-8 grid md:grid-cols-2 gap-12 items-center">
            {/* Bottle */}
            <div className="flex justify-center">
              <div className="relative">
                {/* Glow behind bottle */}
                <div
                  className="absolute inset-0 rounded-full blur-3xl opacity-30 scale-75"
                  style={{ background: product.color }}
                />
                <LargeBottleSvg product={product} />
              </div>
            </div>

            {/* Info card */}
            <div
              className="rounded-3xl p-8 md:p-10"
              style={{
                background: 'rgba(255,255,255,0.82)',
                backdropFilter: 'blur(16px)',
                border: `2px solid ${product.color}30`,
                boxShadow: `0 20px 60px ${product.color}20`,
              }}
            >
              {/* Flavor badge */}
              <span
                className="inline-block px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase text-white mb-4"
                style={{ background: `linear-gradient(135deg, ${product.color}, ${product.colorAlt})` }}
              >
                {product.flavor}
              </span>

              <h1
                className="text-4xl md:text-5xl font-black leading-tight mb-3"
                style={{
                  fontFamily: 'Righteous, sans-serif',
                  color: product.color,
                }}
              >
                {product.name}
              </h1>

              <p
                className="text-lg font-bold mb-6 opacity-70"
                style={{ color: product.capColor }}
              >
                {product.tagline}
              </p>

              <p className="text-gray-700 leading-relaxed text-base mb-8">
                {product.description}
              </p>

              {/* Details */}
              <div className="flex gap-4 mb-8">
                {[
                  { label: 'Størrelse', value: '0,5 L' },
                  { label: 'Type', value: 'Plastikk' },
                  { label: 'Karbonat', value: 'Ja' },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex-1 rounded-2xl p-3 text-center"
                    style={{ background: `${product.color}12` }}
                  >
                    <div className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-1">
                      {label}
                    </div>
                    <div className="font-black text-sm" style={{ color: product.color }}>
                      {value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Price + CTA */}
              <div className="flex items-center gap-4">
                <div>
                  <div className="text-xs text-gray-400 uppercase tracking-wide font-semibold">Pris</div>
                  <div
                    className="text-4xl font-black"
                    style={{ fontFamily: 'Righteous, sans-serif', color: product.color }}
                  >
                    kr {product.price},–
                  </div>
                </div>
                <button
                  type="button"
                  className="flex-1 py-4 rounded-2xl text-white font-black text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
                  style={{
                    background: `linear-gradient(135deg, ${product.color}, ${product.colorAlt})`,
                    boxShadow: `0 8px 25px ${product.color}45`,
                    fontFamily: 'Righteous, sans-serif',
                    letterSpacing: '1px',
                  }}
                  onClick={() => setIsOrderOpen(true)}
                >
                  Kjøp nå
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Other flavors strip */}
        <div
          className="relative py-8 px-6"
          style={{
            background: 'rgba(255,255,255,0.6)',
            backdropFilter: 'blur(8px)',
            borderTop: '1px solid rgba(255,255,255,0.5)',
          }}
        >
          <p className="text-center text-sm font-bold tracking-widest uppercase text-gray-500 mb-4">
            Andre smaker
          </p>
          <div className="flex justify-center gap-3 flex-wrap max-w-2xl mx-auto">
            {products
              .filter((p) => p.id !== product.id)
              .map((p) => (
                <Link
                  key={p.id}
                  to="/products/$productId"
                  params={{ productId: p.id.toString() }}
                  className="px-4 py-2 rounded-full text-sm font-bold text-white transition-all duration-200 hover:scale-105 hover:shadow-md"
                  style={{ background: `linear-gradient(135deg, ${p.color}, ${p.colorAlt})` }}
                >
                  {p.flavor}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
