'use client'
import dynamic from 'next/dynamic'
import { useState, useMemo } from 'react'
import FadeUp from '@/components/FadeUp'
import rawData from '@/data/naerheden.geojson'

const NaerhedenMap = dynamic(() => import('@/components/NaerhedenMap'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-forest-950/60">
      <span className="text-white/40 text-sm">Indlæser kort…</span>
    </div>
  ),
})

export type NaerhedenFeature = {
  type: 'Feature'
  id: string
  geometry: { type: 'Point'; coordinates: [number, number] }
  properties: {
    name: string
    nameShort: string
    category: string
    icon: string
    tagline: string
    description: string
    details: string
    address?: string
    distance: string | null
    duration: string | null
    difficulty: string | null
    bestMonths: number[]
    included: boolean
    images: Array<{ url: string; alt: string; credit?: string; isPrimary?: boolean }>
    links?: Array<{ label: string; url: string }>
  }
}

type GeoJSONMeta = {
  title: string
  subtitle: string
  description: string
  map: { center: [number, number]; zoom: number }
  categories: Array<{ id: string; label: string; color: string; emoji: string }>
}

const data = rawData as unknown as { metadata: GeoJSONMeta; features: NaerhedenFeature[] }

// Computed once at module level — prevents reference churn that triggers ResetView's useEffect
const MAP_CENTER: [number, number] = [data.metadata.map.center[1], data.metadata.map.center[0]]
const MAP_ZOOM = data.metadata.map.zoom

const MONTH_NAMES = ['jan','feb','mar','apr','maj','jun','jul','aug','sep','okt','nov','dec']

const DIFFICULTY_COLORS: Record<string, string> = {
  'let':         '#4caf50',
  'let-moderat': '#8bc34a',
  'moderat':     '#ff9800',
  'kraevende':   '#f44336',
}

const DIFFICULTY_LABELS: Record<string, string> = {
  'let':         'Let',
  'let-moderat': 'Let–Moderat',
  'moderat':     'Moderat',
  'kraevende':   'Krævende',
}

const CAT_COLORS: Record<string, { text: string; bg: string }> = {
  lejr:  { text: '#74C69D', bg: 'rgba(27,67,50,0.6)' },
  vand:  { text: '#64B5F6', bg: 'rgba(21,101,192,0.25)' },
  natur: { text: '#81C784', bg: 'rgba(64,145,108,0.25)' },
  lokal: { text: '#C9A96E', bg: 'rgba(139,94,0,0.25)' },
}

function CategoryBadge({ category, label }: { category: string; label: string }) {
  const c = CAT_COLORS[category] ?? { text: 'white', bg: 'rgba(255,255,255,0.1)' }
  return (
    <span
      className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
      style={{ color: c.text, background: c.bg }}
    >
      {label}
    </span>
  )
}

export default function NaerhedenSection() {
  const { metadata, features } = data
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filtered = useMemo(
    () => activeCategory ? features.filter(f => f.properties.category === activeCategory) : features,
    [features, activeCategory]
  )

  const selected = features.find(f => f.id === selectedId) ?? null

  function handleSelect(id: string) {
    setSelectedId(prev => prev === id ? null : id)
  }

  return (
    <section id="naerheden" className="py-20 bg-forest-900">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-bold uppercase tracking-[.18em] text-sage-400 mb-3">
            Nærheden
          </span>
          <h2 className="font-serif text-4xl font-bold text-white mb-4">
            Et stemningsfyldt område<br className="hidden sm:block" /> med masser at opleve
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-sm leading-relaxed">
            {metadata.description}
          </p>
        </div>

        {/* Map + Sidebar */}
        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-6 items-start">

          {/* Map */}
          <FadeUp>
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10" style={{ height: 540 }}>
              <NaerhedenMap
                features={filtered}
                selectedId={selectedId}
                onSelect={handleSelect}
                center={MAP_CENTER}
                zoom={MAP_ZOOM}
              />
            </div>

            {/* Map footer */}
            <div className="mt-3 flex flex-wrap gap-3">
              {metadata.categories.map(cat => (
                <span key={cat.id} className="flex items-center gap-1.5 text-white/50 text-xs">
                  <span
                    className="w-2.5 h-2.5 rounded-full inline-block border border-white/30"
                    style={{ background: cat.color }}
                  />
                  {cat.label}
                </span>
              ))}
            </div>
          </FadeUp>

          {/* Sidebar */}
          <FadeUp delay={2}>
            <div className="flex flex-col gap-4 lg:h-[540px]">

              {/* Category filter */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => { setActiveCategory(null); setSelectedId(null) }}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    !activeCategory
                      ? 'bg-white text-forest-900'
                      : 'bg-white/10 text-white/70 hover:bg-white/15'
                  }`}
                >
                  Alle
                </button>
                {metadata.categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(prev => prev === cat.id ? null : cat.id)
                      setSelectedId(null)
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      activeCategory === cat.id
                        ? 'bg-white text-forest-900'
                        : 'bg-white/10 text-white/70 hover:bg-white/15'
                    }`}
                  >
                    {cat.emoji} {cat.label}
                  </button>
                ))}
              </div>

              {/* Place list */}
              <div className="flex flex-col gap-2.5 flex-1 min-h-0 overflow-y-auto pr-1">
                {filtered.map(feature => {
                  const p = feature.properties
                  const isSelected = feature.id === selectedId
                  const catMeta = metadata.categories.find(c => c.id === p.category)
                  const img = p.images[0]

                  return (
                    <button
                      key={feature.id}
                      onClick={() => handleSelect(feature.id)}
                      className={`text-left w-full rounded-xl border transition-all duration-200 overflow-hidden ${
                        isSelected
                          ? 'border-sage-400/60 bg-white/10 shadow-lg shadow-black/20'
                          : 'border-white/10 bg-white/5 hover:bg-white/8 hover:border-white/20'
                      }`}
                    >
                      {isSelected ? (
                        // — Expanded detail view —
                        <div>
                          <div className="relative h-40 overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={img.url}
                              alt={img.alt}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                            <div className="absolute bottom-3 left-4 right-4">
                              <div className="flex items-end justify-between">
                                <div>
                                  <span className="text-2xl">{p.icon}</span>
                                  <h3 className="font-serif font-bold text-white text-lg leading-tight">
                                    {p.name}
                                  </h3>
                                </div>
                                {catMeta && (
                                  <CategoryBadge category={p.category} label={catMeta.label} />
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="p-4">
                            <p className="text-sage-300 text-xs italic mb-2">{p.tagline}</p>
                            <p className="text-white/65 text-xs leading-relaxed mb-3">{p.details}</p>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/45 mb-3">
                              {p.distance && <span>📍 {p.distance}</span>}
                              {p.duration && <span>⏱ {p.duration}</span>}
                              {p.difficulty && (
                                <span className="flex items-center gap-1">
                                  <span
                                    className="w-1.5 h-1.5 rounded-full"
                                    style={{ background: DIFFICULTY_COLORS[p.difficulty] ?? '#4caf50' }}
                                  />
                                  {DIFFICULTY_LABELS[p.difficulty] ?? p.difficulty}
                                </span>
                              )}
                            </div>
                            {p.bestMonths.length > 0 && (
                              <div className="flex flex-wrap gap-1 mb-3">
                                {p.bestMonths.map(m => (
                                  <span
                                    key={m}
                                    className="text-[10px] px-1.5 py-0.5 rounded bg-white/8 text-white/40"
                                  >
                                    {MONTH_NAMES[m - 1]}
                                  </span>
                                ))}
                              </div>
                            )}
                            {p.links && p.links.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {p.links.map(link => (
                                  <a
                                    key={link.url}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sage-300 text-xs hover:underline"
                                    onClick={e => e.stopPropagation()}
                                  >
                                    {link.label} ↗
                                  </a>
                                ))}
                              </div>
                            )}
                            {!p.included && (
                              <p className="text-white/25 text-[10px] mt-3">
                                Ikke inkluderet i bootcamp-prisen
                              </p>
                            )}
                          </div>
                        </div>
                      ) : (
                        // — Compact card —
                        <div className="flex items-center gap-3 p-3">
                          {img && (
                            <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={img.url}
                                alt={img.alt}
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <span className="text-sm shrink-0">{p.icon}</span>
                              <span className="font-serif font-semibold text-white text-sm truncate">
                                {p.name}
                              </span>
                            </div>
                            <p className="text-white/45 text-xs truncate leading-snug">
                              {p.tagline}
                            </p>
                            {(p.distance || p.duration) && (
                              <div className="flex gap-2 mt-1 text-white/30 text-[10px]">
                                {p.distance && <span>{p.distance}</span>}
                                {p.duration && <span>· {p.duration}</span>}
                              </div>
                            )}
                          </div>
                          {catMeta && (
                            <div className="shrink-0">
                              <CategoryBadge category={p.category} label={catMeta.label} />
                            </div>
                          )}
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>

              <p className="text-white/30 text-xs leading-relaxed">
                * Aktiviteter i nærområdet arrangeres selvstændigt og er ikke inkluderet i bootcamp-prisen.
                Vi hjælper gerne med anbefalinger og booking.
              </p>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
