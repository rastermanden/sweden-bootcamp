'use client'
import { useState } from 'react'

const IMAGES = [
  { src: 'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=900&q=80', alt: 'Morgenøvelser i naturen', span: 'col-span-2 row-span-2' },
  { src: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=600&q=80', alt: 'Yoga i skoven', span: '' },
  { src: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80', alt: 'Gruppe-træning', span: '' },
  { src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80', alt: 'Smuk skov og natur', span: '' },
  { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80', alt: 'Sunde og farverige måltider', span: 'col-span-2' },
  { src: 'https://images.unsplash.com/photo-1573384666979-f7b82f36a75e?w=600&q=80', alt: 'Mindfulness i naturen', span: '' },
]

export default function GallerySection() {
  const [lightbox, setLightbox] = useState<string | null>(null)

  return (
    <section id="galleri" className="py-20 bg-forest-900">
      <div className="max-w-6xl mx-auto px-6 text-center mb-12">
        <span className="inline-block uppercase tracking-[.12em] text-[.75rem] font-bold text-sage-400 mb-2">
          Galleri
        </span>
        <h2 className="font-serif text-4xl font-bold text-white mb-4">Oplev stemningen</h2>
        <p className="text-white/60 max-w-lg mx-auto">Fra tidligere bootcamps i Sveriges skove og søer.</p>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-4 grid-rows-2 gap-2 md:gap-3" style={{ gridAutoRows: '200px' }}>
          {IMAGES.map((img, i) => (
            <div
              key={i}
              className={`overflow-hidden rounded-xl cursor-pointer relative group ${img.span}`}
              onClick={() => setLightbox(img.src.replace(/w=\d+/, 'w=1400'))}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-forest-900/0 group-hover:bg-forest-900/20 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile fallback grid */}
      <div className="max-w-6xl mx-auto px-6 mt-3 md:hidden">
        <div className="grid grid-cols-2 gap-2">
          {IMAGES.slice(1).map((img, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl cursor-pointer relative group aspect-square"
              onClick={() => setLightbox(img.src.replace(/w=\d+/, 'w=1400'))}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.src} alt={img.alt} loading="lazy" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={() => setLightbox(null)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lightbox}
            alt="Galleri"
            className="max-w-[92vw] max-h-[88vh] rounded-xl shadow-2xl"
            onClick={e => e.stopPropagation()}
          />
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-colors text-lg"
            aria-label="Luk"
          >
            ✕
          </button>
        </div>
      )}
    </section>
  )
}
