'use client'
import { useState } from 'react'

export default function ContactForm() {
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(e.currentTarget.action, {
        method: 'POST',
        body: new FormData(e.currentTarget),
        headers: { Accept: 'application/json' },
      })
      if (res.ok) setDone(true)
      else throw new Error()
    } catch {
      alert('Noget gik galt. Skriv direkte til info@naturbootcamp.dk')
    } finally {
      setLoading(false)
    }
  }

  const inputCls = 'w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-forest-700 focus:ring-2 focus:ring-forest-700/10 transition bg-white'

  return (
    <div className="bg-white rounded-2xl shadow-[0_8px_32px_rgba(27,67,50,.10)] p-7">
      <h3 className="font-serif text-2xl font-bold text-forest-900 mb-5">Send en besked</h3>
      {done ? (
        <div className="text-center py-8">
          <span className="text-4xl block mb-3">✉️</span>
          <p className="text-forest-800 font-semibold">Tak! Vi svarer inden for én hverdag.</p>
        </div>
      ) : (
        <form
          action="https://formspree.io/f/YOUR_FORM_ID"
          method="POST"
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input type="hidden" name="_subject" value="Spørgsmål – Natur Bootcamp Sverige" />
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5" htmlFor="c-navn">Navn *</label>
              <input id="c-navn" name="navn" required type="text" placeholder="Dit navn" className={inputCls} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5" htmlFor="c-email">E-mail *</label>
              <input id="c-email" name="email" required type="email" placeholder="din@email.dk" className={inputCls} />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5" htmlFor="c-emne">Emne</label>
            <select id="c-emne" name="emne" className={inputCls}>
              <option>Spørgsmål om programmet</option>
              <option>Overnatning og værelse</option>
              <option>Priser og betaling</option>
              <option>Aflysning / ombooking</option>
              <option>Andet</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5" htmlFor="c-besked">Besked *</label>
            <textarea id="c-besked" name="besked" required rows={4} placeholder="Hvad vil du gerne vide?" className={`${inputCls} resize-none`} />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-forest-800 hover:bg-forest-900 disabled:opacity-60 text-white font-semibold rounded-full transition-all hover:-translate-y-0.5 hover:shadow-lg text-sm"
          >
            {loading ? 'Sender…' : 'Send besked →'}
          </button>
        </form>
      )}
    </div>
  )
}
