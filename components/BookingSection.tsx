'use client'
import { useState } from 'react'
import rawDates from '@/data/bootcamp-dates.json'

type BC = { start: Date; end: Date; label: string; spots: number }

const DATES: BC[] = rawDates.map(d => ({
  start: new Date(d.start),
  end:   new Date(d.end),
  label: d.label,
  spots: d.spots,
}))

const MONTHS = ['Januar','Februar','Marts','April','Maj','Juni','Juli','August','September','Oktober','November','December']
const DAYS   = ['Ma','Ti','On','To','Fr','Lø','Sø']

function isSame(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
}

function Calendar({
  year, month, onPrev, onNext, selectedIdx, onSelect,
}: {
  year: number; month: number
  onPrev: () => void; onNext: () => void
  selectedIdx: number | null
  onSelect: (i: number) => void
}) {
  const today = new Date(); today.setHours(0,0,0,0)
  const firstDay = new Date(year, month, 1)
  let offset = firstDay.getDay() - 1
  if (offset < 0) offset = 6
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells: React.ReactNode[] = []

  DAYS.forEach(d => (
    cells.push(
      <div key={`h-${d}`} className="text-center text-[.65rem] font-bold uppercase tracking-widest text-gray-400 py-1">
        {d}
      </div>
    )
  ))

  for (let i = 0; i < offset; i++) {
    cells.push(<div key={`e-${i}`} />)
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d)
    date.setHours(0,0,0,0)
    const isPast = date < today

    let cls = 'flex items-center justify-center aspect-square text-[.82rem] rounded-lg transition-all duration-150 relative select-none'
    let handler: (() => void) | undefined

    let inBC = false
    DATES.forEach((bc, idx) => {
      const s = new Date(bc.start); s.setHours(0,0,0,0)
      const e = new Date(bc.end);   e.setHours(0,0,0,0)
      if (isSame(date, s)) {
        cls += ' bg-forest-800 text-white font-bold cursor-pointer rounded-l-lg rounded-r-none'
        handler = () => onSelect(idx)
        inBC = true
      } else if (date > s && date < e) {
        cls += ' bg-sage-100 text-forest-900 cursor-pointer rounded-none'
        handler = () => onSelect(idx)
        inBC = true
      } else if (isSame(date, e)) {
        cls += ' bg-sage-100 text-forest-900 cursor-pointer rounded-r-lg rounded-l-none'
        handler = () => onSelect(idx)
        inBC = true
      }
      if (selectedIdx === idx && (isSame(date, s) || isSame(date, e) || (date > s && date < e))) {
        cls += ' ring-2 ring-forest-800 ring-offset-1'
      }
    })

    if (!inBC) {
      cls += isPast ? ' text-gray-300' : ' text-gray-700 hover:bg-gray-50'
    }

    cells.push(
      <div key={d} className={cls} onClick={handler} role={handler ? 'button' : undefined} tabIndex={handler ? 0 : undefined}>
        {d}
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-[0_8px_32px_rgba(27,67,50,.10)] p-6">
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={onPrev}
          className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-forest-800 hover:text-white hover:border-forest-800 transition-colors text-gray-700"
          aria-label="Forrige måned"
        >
          ←
        </button>
        <span className="font-serif font-semibold text-forest-900 text-base">
          {MONTHS[month]} {year}
        </span>
        <button
          onClick={onNext}
          className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-forest-800 hover:text-white hover:border-forest-800 transition-colors text-gray-700"
          aria-label="Næste måned"
        >
          →
        </button>
      </div>
      <div className="grid grid-cols-7 gap-[3px]">{cells}</div>
      <div className="flex gap-4 mt-4 flex-wrap">
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <span className="w-3.5 h-3.5 rounded-[3px] bg-forest-800 block" />
          Startdato
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <span className="w-3.5 h-3.5 rounded-[3px] bg-sage-100 block" />
          Bootcamp-dage
        </div>
      </div>
    </div>
  )
}

export default function BookingSection() {
  const [calYear,  setCalYear]  = useState(2026)
  const [calMonth, setCalMonth] = useState(7)
  const [selected, setSelected] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  function prevMonth() {
    if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1) }
    else setCalMonth(m => m - 1)
  }
  function nextMonth() {
    if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1) }
    else setCalMonth(m => m + 1)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const form = e.currentTarget
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })
      if (res.ok) setSubmitted(true)
      else throw new Error()
    } catch {
      alert('Noget gik galt. Prøv igen eller kontakt os direkte.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="booking" className="py-20 bg-cream">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="inline-block uppercase tracking-[.12em] text-[.75rem] font-bold text-forest-700 mb-2">
            Tilmeld dig
          </span>
          <h2 className="font-serif text-4xl font-bold text-forest-900 mb-4">Book din plads</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Vælg en dato og udfyld formularen — vi vender tilbage inden for 24 timer med bekræftelse.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* LEFT — calendar + date pills */}
          <div className="space-y-5">
            <Calendar
              year={calYear} month={calMonth}
              onPrev={prevMonth} onNext={nextMonth}
              selectedIdx={selected} onSelect={setSelected}
            />
            <div>
              <p className="text-[.72rem] uppercase tracking-widest font-bold text-gray-400 mb-3">
                Kommende arrangementer 2026
              </p>
              {DATES.map((bc, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelected(idx)}
                  className={`w-full flex items-center justify-between rounded-xl px-4 py-3 mb-2 border transition-all text-left ${
                    selected === idx
                      ? 'border-forest-800 bg-sage-100'
                      : 'border-gray-200 bg-white hover:border-forest-800 hover:shadow-md'
                  }`}
                >
                  <span className="text-sm font-medium text-gray-800">{bc.label}</span>
                  <span className={`text-[.7rem] font-bold px-2.5 py-0.5 rounded-full ml-3 shrink-0 ${
                    bc.spots <= 2
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-sage-100 text-forest-900'
                  }`}>
                    {bc.spots <= 2 ? `⚡ Kun ${bc.spots} pladser` : `${bc.spots} pladser`}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT — form */}
          <div className="bg-white rounded-2xl shadow-[0_8px_32px_rgba(27,67,50,.10)] p-7">
            {submitted ? (
              <div className="text-center py-10">
                <span className="text-5xl block mb-4">🌿</span>
                <h3 className="font-serif text-2xl font-bold text-forest-900 mb-2">Tak for din tilmelding!</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Vi har modtaget din forespørgsel og vender tilbage inden for 24 timer
                  med bekræftelse og betalingsoplysninger.
                </p>
              </div>
            ) : (
              <>
                <h3 className="font-serif text-2xl font-bold text-forest-900 mb-5">Tilmelding</h3>

                {selected !== null && (
                  <div className="bg-sage-100 rounded-xl px-4 py-3 text-sm font-medium text-forest-900 mb-5">
                    Valgt dato: {DATES[selected].label}
                  </div>
                )}

                <form
                  action="https://formspree.io/f/xqeoplwv"
                  method="POST"
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <input type="hidden" name="_subject" value="Ny booking – Natur Bootcamp Sverige" />
                  <input type="hidden" name="valgt_dato" value={selected !== null ? DATES[selected].label : ''} />

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1.5" htmlFor="b-fornavn">Fornavn *</label>
                      <input id="b-fornavn" name="fornavn" required type="text" placeholder="Dit fornavn"
                        className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-forest-700 focus:ring-2 focus:ring-forest-700/10 transition" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1.5" htmlFor="b-efternavn">Efternavn *</label>
                      <input id="b-efternavn" name="efternavn" required type="text" placeholder="Dit efternavn"
                        className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-forest-700 focus:ring-2 focus:ring-forest-700/10 transition" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5" htmlFor="b-email">E-mail *</label>
                    <input id="b-email" name="email" required type="email" placeholder="din@email.dk"
                      className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-forest-700 focus:ring-2 focus:ring-forest-700/10 transition" />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5" htmlFor="b-telefon">Telefon</label>
                    <input id="b-telefon" name="telefon" type="tel" placeholder="+45 00 00 00 00"
                      className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-forest-700 focus:ring-2 focus:ring-forest-700/10 transition" />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5" htmlFor="b-vaerelse">Værelsetyp *</label>
                    <select id="b-vaerelse" name="vaerelse" required
                      className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm bg-white outline-none focus:border-forest-700 focus:ring-2 focus:ring-forest-700/10 transition">
                      <option value="">Vælg…</option>
                      <option>Dobbeltværelse – 2.995 kr. pr. person</option>
                      <option>Enkeltværelse – 3.795 kr. pr. person</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5" htmlFor="b-allergier">Allergier / særlige ønsker</label>
                    <textarea id="b-allergier" name="allergier" rows={3} placeholder="Vegetar, vegan, glutenfri, nøddeallergi osv."
                      className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-forest-700 focus:ring-2 focus:ring-forest-700/10 transition resize-none" />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 bg-forest-800 hover:bg-forest-900 disabled:opacity-60 text-white font-semibold rounded-full transition-all hover:-translate-y-0.5 hover:shadow-lg text-sm"
                  >
                    {loading ? 'Sender…' : 'Send tilmelding →'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
