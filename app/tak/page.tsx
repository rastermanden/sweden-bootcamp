import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tak for din tilmelding | Natur Bootcamp Sverige',
  description: 'Vi har modtaget din tilmelding og vender tilbage inden for 24 timer.',
}

export default function TakPage() {
  return (
    <main
      className="min-h-screen flex items-center justify-center text-white text-center px-6"
      style={{
        backgroundImage:
          'linear-gradient(to bottom, rgba(15,40,25,.6) 0%, rgba(27,67,50,.5) 100%), url("https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1900&q=85")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-xl mx-auto">
        {/* Icon */}
        <div className="w-20 h-20 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full flex items-center justify-center text-4xl mx-auto mb-8">
          🌿
        </div>

        {/* Heading */}
        <h1 className="font-serif text-[clamp(2rem,5vw,3.2rem)] font-bold text-white mb-4 leading-tight">
          Tak for din tilmelding!
        </h1>

        <p className="text-white/80 text-[1.05rem] leading-relaxed mb-4">
          Vi har modtaget din forespørgsel og vender tilbage inden for
          <strong className="text-white"> 24 timer</strong> med bekræftelse
          og betalingsoplysninger.
        </p>

        <p className="text-white/60 text-sm leading-relaxed mb-10">
          Tjek din indbakke — og evt. din spam-mappe. Har du ikke hørt fra os
          inden for 24 timer, er du velkommen til at skrive direkte til{' '}
          <a
            href="mailto:info@naturbootcamp.dk"
            className="text-sage-300 hover:underline"
          >
            info@naturbootcamp.dk
          </a>
        </p>

        {/* What happens next */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 mb-10 text-left">
          <h2 className="font-serif text-lg font-semibold text-white mb-4">Hvad sker der nu?</h2>
          <ol className="space-y-3">
            {[
              ['1', 'Vi gennemgår din tilmelding og bekræfter din plads'],
              ['2', 'Du modtager en mail med betalingsoplysninger'],
              ['3', 'Betaling modtaget = plads reserveret'],
              ['4', 'Ca. 2 uger før sender vi praktisk info og detaljeret program'],
            ].map(([num, text]) => (
              <li key={num} className="flex items-start gap-3">
                <span className="w-6 h-6 bg-forest-700 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {num}
                </span>
                <span className="text-white/75 text-sm leading-relaxed">{text}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Back button */}
        <a
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-forest-800 hover:bg-forest-900 text-white font-semibold rounded-full transition-all hover:-translate-y-0.5 hover:shadow-xl text-sm"
        >
          ← Tilbage til forsiden
        </a>
      </div>
    </main>
  )
}
