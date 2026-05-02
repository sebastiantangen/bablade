import { Link, createFileRoute } from '@tanstack/react-router'
import { useCart } from '@/cart/CartContext'
import products, { type Product } from '@/data/products'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function NorwegianBackground({ id = 'bg' }: { id?: string }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 1440 700"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#29b6f6" />
          <stop offset="55%" stopColor="#b3e5fc" />
          <stop offset="100%" stopColor="#e1f5fe" />
        </linearGradient>
        <linearGradient id={`${id}-water`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0288d1" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#01579b" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id={`${id}-mtn`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#eceff1" />
          <stop offset="35%" stopColor="#b0bec5" />
          <stop offset="100%" stopColor="#78909c" />
        </linearGradient>
        <radialGradient id={`${id}-sun`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff9c4" stopOpacity="1" />
          <stop offset="60%" stopColor="#fff176" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ffee58" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Sky */}
      <rect width="1440" height="700" fill={`url(#${id}-sky)`} />

      {/* Sun glow */}
      <circle cx="1150" cy="110" r="90" fill={`url(#${id}-sun)`} opacity="0.7" />
      <circle cx="1150" cy="110" r="48" fill="#ffee58" opacity="0.95" />
      <circle cx="1150" cy="110" r="36" fill="#fff9c4" />

      {/* Clouds */}
      <g fill="white" opacity="0.88">
        <ellipse cx="190" cy="115" rx="105" ry="42" />
        <ellipse cx="145" cy="128" rx="72" ry="36" />
        <ellipse cx="248" cy="122" rx="80" ry="32" />
        <ellipse cx="590" cy="85" rx="130" ry="48" />
        <ellipse cx="538" cy="98" rx="85" ry="40" />
        <ellipse cx="655" cy="91" rx="95" ry="36" />
        <ellipse cx="880" cy="135" rx="100" ry="42" />
        <ellipse cx="828" cy="147" rx="72" ry="35" />
        <ellipse cx="940" cy="140" rx="78" ry="30" />
      </g>

      {/* Distant snow mountains */}
      <path
        d="M-50 490 L70 215 L115 248 L195 162 L255 218
           L345 138 L398 182 L508 98 L562 148 L635 86 L695 138
           L792 116 L848 170 L942 100 L995 148
           L1095 175 L1172 125 L1255 185 L1348 145 L1440 205 L1440 490 Z"
        fill={`url(#${id}-mtn)`}
        opacity="0.55"
      />
      {/* Snow caps */}
      {[
        'M70 215 L115 248 L100 254 L80 240 Z',
        'M195 162 L255 218 L232 224 L208 206 Z',
        'M345 138 L398 182 L375 188 L355 165 Z',
        'M508 98 L562 148 L542 154 L522 128 Z',
        'M635 86 L695 138 L670 145 L645 115 Z',
        'M792 116 L848 170 L826 176 L805 148 Z',
        'M942 100 L995 148 L972 155 L950 125 Z',
      ].map((d, i) => (
        <path key={i} d={d} fill="white" opacity="0.92" />
      ))}

      {/* Middle mountains - green */}
      <path
        d="M-50 535 L48 348 L118 398 L198 318 L278 368
           L378 288 L448 338 L538 278 L618 328
           L718 258 L798 308 L878 248 L958 292
           L1058 268 L1138 318 L1218 278 L1320 328 L1440 285 L1440 535 Z"
        fill="#2d5a1b"
        opacity="0.88"
      />

      {/* Pine forest left */}
      <g fill="#1a3a0d">
        {([0, 30, 58, 86, 114, 142, 170, 198, 226] as number[]).map((x, i) => (
          <polygon key={i} points={`${x},535 ${x + 16},452 ${x + 32},535`} />
        ))}
        {([15, 44, 72, 100, 128, 156, 184, 212] as number[]).map((x, i) => (
          <polygon key={i + 9} points={`${x},535 ${x + 13},462 ${x + 26},535`} />
        ))}
      </g>

      {/* Pine forest right */}
      <g fill="#1a3a0d">
        {([1180, 1210, 1238, 1266, 1294, 1322, 1350, 1378, 1406] as number[]).map((x, i) => (
          <polygon key={i + 20} points={`${x},535 ${x + 16},452 ${x + 32},535`} />
        ))}
        {([1195, 1224, 1252, 1280, 1308, 1336, 1364, 1392] as number[]).map((x, i) => (
          <polygon key={i + 30} points={`${x},535 ${x + 13},462 ${x + 26},535`} />
        ))}
      </g>

      {/* Fjord water */}
      <path
        d="M0 555 Q180 535 360 548 Q540 562 720 543 Q900 524 1080 540 Q1260 556 1440 538
           L1440 700 L0 700 Z"
        fill={`url(#${id}-water)`}
        opacity="0.78"
      />
      {/* Water shimmer */}
      <path
        d="M0 572 Q360 557 720 570 Q1080 583 1440 566 L1440 576 Q1080 592 720 579 Q360 566 0 582 Z"
        fill="rgba(255,255,255,0.22)"
      />
      <path
        d="M0 590 Q360 576 720 589 Q1080 602 1440 585 L1440 594 Q1080 610 720 597 Q360 584 0 600 Z"
        fill="rgba(255,255,255,0.14)"
      />

      {/* Foreground meadow */}
      <path
        d="M-50 628 Q200 605 420 618 Q640 630 860 612 Q1080 594 1300 614 Q1400 622 1490 608
           L1490 700 L-50 700 Z"
        fill="#3d7a1e"
        opacity="0.95"
      />
      {/* Wildflower dots */}
      <g opacity="0.85">
        {([40, 120, 200, 310, 420, 540, 660, 760, 870, 980, 1090, 1180, 1280, 1370] as number[]).map(
          (x, i) => (
            <circle key={i} cx={x} cy={635 + ((i * 7) % 18)} r="4" fill={['#ffeb3b', '#ff7043', '#f06292', '#ffffff', '#aed581'][i % 5]} />
          ),
        )}
      </g>
    </svg>
  )
}

function BottleSvg({ product, size = 320 }: { product: Product; size?: number }) {
  const isMix = product.id === 6
  const gradId = `bottle-label-${product.id}`
  const mixColors = ['#2e7d32', '#b71c1c', '#e65100', '#ad1457', '#6a1b9a', '#1565c0']

  return (
    <svg
      viewBox="0 0 200 480"
      width={size}
      height={size * 2.4}
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.25))' }}
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
        <linearGradient id={`plastic-${product.id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
          <stop offset="18%" stopColor="rgba(255,255,255,0.12)" />
          <stop offset="75%" stopColor="rgba(255,255,255,0.06)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.38)" />
        </linearGradient>
        <linearGradient id={`cap-shade-${product.id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.2)" />
        </linearGradient>
      </defs>

      {/* Drop shadow */}
      <ellipse cx="100" cy="462" rx="52" ry="12" fill="rgba(0,0,0,0.18)" />

      {/* Bottle body - plastic */}
      <path
        d="M73 96
           C73 108 56 126 44 148 C38 160 35 172 35 185
           L35 365
           C35 390 42 412 58 428 C72 440 100 446 100 446
           C100 446 128 440 142 428 C158 412 165 390 165 365
           L165 185
           C165 172 162 160 156 148 C144 126 127 108 127 96 Z"
        fill="rgba(220,240,255,0.72)"
        stroke="rgba(180,220,250,0.4)"
        strokeWidth="1"
      />

      {/* Plastic highlight overlay */}
      <path
        d="M73 96
           C73 108 56 126 44 148 C38 160 35 172 35 185
           L35 365
           C35 390 42 412 58 428 C72 440 100 446 100 446
           C100 446 128 440 142 428 C158 412 165 390 165 365
           L165 185
           C165 172 162 160 156 148 C144 126 127 108 127 96 Z"
        fill={`url(#plastic-${product.id})`}
      />

      {/* Label */}
      <rect x="36" y="188" width="128" height="170" rx="5" fill={`url(#${gradId})`} />

      {/* Label side sheen */}
      <rect x="38" y="190" width="22" height="166" rx="4" fill="rgba(255,255,255,0.22)" />
      <rect x="142" y="190" width="10" height="166" rx="3" fill="rgba(0,0,0,0.1)" />

      {/* Brand name */}
      <text
        x="100"
        y="252"
        textAnchor="middle"
        fill="white"
        fontSize="20"
        fontWeight="900"
        fontFamily="Righteous, sans-serif"
        letterSpacing="4"
        style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
      >
        BABLADE
      </text>

      {/* Flavor name */}
      <text
        x="100"
        y="276"
        textAnchor="middle"
        fill="rgba(255,255,255,0.9)"
        fontSize="11"
        fontWeight="700"
        fontFamily="Nunito, sans-serif"
        letterSpacing="1.5"
      >
        {product.flavor.toUpperCase()}
      </text>

      {/* Decorative line */}
      <line x1="55" y1="286" x2="145" y2="286" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />

      {/* Sommerbrus label */}
      <text
        x="100"
        y="312"
        textAnchor="middle"
        fill="rgba(255,255,255,0.75)"
        fontSize="9"
        fontFamily="Nunito, sans-serif"
        letterSpacing="2"
      >
        NORSK SOMMERBRUS
      </text>

      {/* Volume */}
      <text
        x="100"
        y="342"
        textAnchor="middle"
        fill="rgba(255,255,255,0.6)"
        fontSize="9"
        fontFamily="Nunito, sans-serif"
        letterSpacing="1"
      >
        0,5 L
      </text>

      {/* Bottom dome label edge */}
      <path
        d="M36 358 L164 358 C164 358 158 375 142 388 C126 400 100 406 100 406 C100 406 74 400 58 388 C42 375 36 358 36 358 Z"
        fill={`url(#${gradId})`}
        opacity="0.4"
      />

      {/* Neck - clear plastic */}
      <rect x="73" y="58" width="54" height="40" rx="3" fill="rgba(210,235,252,0.75)" />
      <rect x="75" y="60" width="9" height="36" rx="2" fill="rgba(255,255,255,0.35)" />
      <rect x="116" y="60" width="5" height="36" rx="2" fill="rgba(0,0,0,0.06)" />

      {/* Cap */}
      <rect x="69" y="16" width="62" height="44" rx="8" fill={product.capColor} />
      {/* Cap texture ridges */}
      {([78, 87, 96, 105, 114, 122] as number[]).map((x) => (
        <line
          key={x}
          x1={x}
          y1="20"
          x2={x}
          y2="57"
          stroke="rgba(0,0,0,0.14)"
          strokeWidth="1.8"
        />
      ))}
      {/* Cap highlight */}
      <rect
        x="71"
        y="18"
        width="26"
        height="40"
        rx="6"
        fill={`url(#cap-shade-${product.id})`}
      />
      {/* Cap top shine */}
      <ellipse cx="90" cy="20" rx="16" ry="4" fill="rgba(255,255,255,0.28)" />
    </svg>
  )
}

function FlavorCard({ product }: { product: Product }) {
  const { addItem, openCart } = useCart()

  return (
    <article
      className="group relative overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl block"
      style={{
        background: `linear-gradient(145deg, ${product.color}18, ${product.colorAlt}30)`,
        border: `2px solid ${product.color}30`,
      }}
    >
      {/* Background accent circle */}
      <div
        className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-15 transition-all duration-500 group-hover:opacity-25 group-hover:scale-110"
        style={{ background: product.colorAlt }}
      />

      <div className="relative p-6 flex flex-col items-center gap-4">
        <Link
          to="/products/$productId"
          params={{ productId: product.id.toString() }}
          className="flex flex-col items-center gap-4 text-center"
        >
          <div className="transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3">
            <BottleSvg product={product} size={110} />
          </div>
          <div>
            <p
              className="text-xs font-bold tracking-widest uppercase mb-1 opacity-70"
              style={{ color: product.color, fontFamily: 'Nunito, sans-serif' }}
            >
              {product.flavor}
            </p>
            <h3
              className="text-lg font-black leading-tight"
              style={{ color: product.color, fontFamily: 'Righteous, sans-serif' }}
            >
              {product.name}
            </h3>
            <p className="text-sm mt-2 opacity-70 leading-snug" style={{ fontFamily: 'Nunito, sans-serif' }}>
              {product.shortDescription}
            </p>
            <div
              className="mt-4 inline-block px-5 py-2 rounded-full text-white text-sm font-bold transition-all duration-300 group-hover:shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${product.color}, ${product.colorAlt})`,
                fontFamily: 'Nunito, sans-serif',
              }}
            >
              kr {product.price},–
            </div>
          </div>
        </Link>

        <button
          type="button"
          className="w-full rounded-2xl px-5 py-3 text-sm font-black text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
          style={{
            background: `linear-gradient(135deg, ${product.color}, ${product.colorAlt})`,
            boxShadow: `0 8px 22px ${product.color}35`,
            fontFamily: 'Righteous, sans-serif',
            letterSpacing: '0.8px',
          }}
          onClick={() => {
            addItem(product.id)
            openCart()
          }}
        >
          Legg i handlekurv
        </button>
      </div>
    </article>
  )
}

function HomePage() {
  return (
    <div style={{ fontFamily: 'Nunito, sans-serif', background: '#f8fffe' }}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <NorwegianBackground id="hero" />

        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />

        {/* Floating bottles in background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {products.slice(0, 3).map((p, i) => (
            <div
              key={p.id}
              className="absolute opacity-25"
              style={{
                left: `${8 + i * 30}%`,
                top: `${20 + (i % 2) * 30}%`,
                transform: `rotate(${-15 + i * 15}deg)`,
                animation: `floatBottle ${3 + i * 0.5}s ease-in-out infinite alternate`,
              }}
            >
              <BottleSvg product={p} size={80} />
            </div>
          ))}
          {products.slice(3).map((p, i) => (
            <div
              key={p.id}
              className="absolute opacity-25"
              style={{
                right: `${5 + i * 28}%`,
                top: `${15 + (i % 2) * 35}%`,
                transform: `rotate(${10 - i * 12}deg)`,
                animation: `floatBottle ${3.5 + i * 0.4}s ease-in-out infinite alternate`,
              }}
            >
              <BottleSvg product={p} size={70} />
            </div>
          ))}
        </div>

        {/* Hero content */}
        <div className="relative z-10 text-center px-6">
          <div
            className="inline-block px-4 py-2 rounded-full text-white/90 text-sm font-bold tracking-widest uppercase mb-6"
            style={{
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.3)',
            }}
          >
            Norsk Sommerbrus
          </div>

          <h1
            className="text-8xl md:text-[10rem] font-black text-white leading-none mb-4"
            style={{
              fontFamily: 'Righteous, sans-serif',
              textShadow: '0 4px 30px rgba(0,0,0,0.3)',
              letterSpacing: '-2px',
            }}
          >
            BABLADE
          </h1>

          <p
            className="text-xl md:text-2xl text-white/90 font-semibold mb-3 max-w-lg mx-auto"
            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.2)' }}
          >
            Norsk natur i hver boble
          </p>
          <p className="text-base text-white/75 mb-10 max-w-md mx-auto">
            6 unike smaker inspirert av norsk sommer. Brygget med kjærlighet og norsk fjellvann.
          </p>

          <a
            href="#smaker"
            className="inline-block px-10 py-4 rounded-full text-lg font-black text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #2e7d32, #6ab04c)',
              boxShadow: '0 8px 30px rgba(46,125,50,0.5)',
              fontFamily: 'Righteous, sans-serif',
              letterSpacing: '1px',
            }}
          >
            Velg din smak →
          </a>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-70">
          <div className="w-6 h-10 rounded-full border-2 border-white/60 flex items-start justify-center p-1">
            <div
              className="w-1 h-2 bg-white/80 rounded-full"
              style={{ animation: 'scrollDot 1.5s ease-in-out infinite' }}
            />
          </div>
        </div>
      </section>

      {/* Flavors Grid */}
      <section id="smaker" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span
            className="text-sm font-bold tracking-widest uppercase text-green-700 block mb-3"
          >
            6 unike smaker
          </span>
          <h2
            className="text-5xl md:text-6xl font-black text-gray-900 leading-none"
            style={{ fontFamily: 'Righteous, sans-serif' }}
          >
            Finn favorittsmaken din
          </h2>
          <p className="text-gray-500 text-lg mt-4 max-w-xl mx-auto">
            Hver smak forteller sin egen historie om norsk sommer. Hvilken er din?
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {products.map((product) => (
            <FlavorCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* About section */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0">
          <NorwegianBackground id="about" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <h2
            className="text-5xl font-black text-white mb-6"
            style={{ fontFamily: 'Righteous, sans-serif' }}
          >
            Ekte norsk sommer
          </h2>
          <p className="text-white/85 text-xl leading-relaxed mb-4">
            Bablade er skapt av sommer, for sommer. Hvert slurk bringer deg til
            norske fjorder, grønne skoger og sol som aldri vil gå ned.
          </p>
          <p className="text-white/70 text-lg leading-relaxed">
            0,5 liter med ren sommerglede – i seks unike smaker. Finn din i butikken nå.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {products.map((p) => (
              <span
                key={p.id}
                className="px-4 py-2 rounded-full text-sm font-bold text-white"
                style={{ background: `${p.color}cc` }}
              >
                {p.flavor}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-white/60 text-center py-10 px-6">
        <p
          className="text-2xl font-black text-white mb-2"
          style={{ fontFamily: 'Righteous, sans-serif' }}
        >
          BABLADE
        </p>
        <p className="text-sm">Norsk Sommerbrus · 0,5 L · 6 smaker</p>
        <p className="text-xs mt-4 text-white/30">© 2024 Bablade AS · Oslo, Norge</p>
      </footer>
    </div>
  )
}
