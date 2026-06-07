import Navbar from '@/components/Navbar'
import BookingSection from '@/components/BookingSection'
import GallerySection from '@/components/GallerySection'
import ContactForm from '@/components/ContactForm'
import FadeUp from '@/components/FadeUp'
import NaerhedenSection from '@/components/NaerhedenSection'

/* ─── Shared helpers ─── */
const Label = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block uppercase tracking-[.12em] text-[.75rem] font-bold text-forest-700 mb-2">
    {children}
  </span>
)
const LabelLight = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block uppercase tracking-[.12em] text-[.75rem] font-bold text-sage-400 mb-2">
    {children}
  </span>
)

/* ─── Program card ─── */
function ProgramCard({ icon, title, desc, tag, img, alt, delay }: {
  icon: string; title: string; desc: string; tag: string; img: string; alt: string; delay: number
}) {
  return (
    <FadeUp delay={delay} className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(27,67,50,.10)] hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(27,67,50,.16)] transition-all duration-300">
      <div className="relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img} alt={alt} loading="lazy" className="w-full aspect-[4/3] object-cover transition-transform duration-500 hover:scale-105" />
        <div className="absolute bottom-0 left-5 translate-y-1/2 w-12 h-12 bg-forest-800 rounded-full flex items-center justify-center text-2xl shadow-lg">
          {icon}
        </div>
      </div>
      <div className="p-6 pt-8 flex flex-col flex-1">
        <h3 className="font-serif text-xl font-semibold text-forest-900 mb-2">{title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed flex-1">{desc}</p>
        <span className="mt-4 inline-block bg-sage-100 text-forest-900 text-[.72rem] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
          {tag}
        </span>
      </div>
    </FadeUp>
  )
}

/* ─── Price card ─── */
function PriceCard({ title, price, note, includes, featured, ribbon, cta }: {
  title: string; price: string; note: string; includes: string[]; featured?: boolean; ribbon?: string; cta: string
}) {
  return (
    <div className={`relative rounded-2xl p-10 flex flex-col border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
      featured
        ? 'bg-forest-900 border-forest-900 text-white'
        : 'bg-white border-gray-200 text-gray-800'
    }`}>
      {ribbon && (
        <span className="absolute -top-px left-1/2 -translate-x-1/2 bg-tan text-forest-900 text-[.68rem] font-extrabold uppercase tracking-widest px-4 py-1 rounded-b-xl">
          {ribbon}
        </span>
      )}
      <h3 className={`font-serif text-2xl font-bold mb-4 ${featured ? 'text-white' : 'text-forest-900'}`}>{title}</h3>
      <div className="mb-1">
        <span className={`font-serif text-5xl font-bold leading-none ${featured ? 'text-white' : 'text-forest-900'}`}>{price}</span>
        <span className={`text-sm ml-1 ${featured ? 'text-white/55' : 'text-gray-400'}`}> kr. / person</span>
      </div>
      <p className={`text-xs mb-6 ${featured ? 'text-white/45' : 'text-gray-400'}`}>{note}</p>
      <ul className="space-y-2.5 flex-1 mb-8">
        {includes.map(item => (
          <li key={item} className={`flex items-start gap-2 text-sm ${featured ? 'text-white/80' : 'text-gray-600'}`}>
            <span className={`font-bold mt-0.5 shrink-0 ${featured ? 'text-sage-300' : 'text-forest-700'}`}>✓</span>
            {item}
          </li>
        ))}
      </ul>
      <a
        href="#booking"
        className={`text-center py-3.5 rounded-full font-semibold text-sm transition-all hover:-translate-y-0.5 hover:shadow-lg ${
          featured
            ? 'bg-forest-700 hover:bg-forest-600 text-white'
            : 'border-2 border-forest-800 text-forest-800 hover:bg-forest-800 hover:text-white'
        }`}
      >
        {cta}
      </a>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <>
      <Navbar />

      {/* ── HERO ── */}
      <section
        id="hjem"
        className="relative min-h-screen flex items-center justify-center text-white text-center"
        style={{
          backgroundImage:
            'linear-gradient(to bottom, rgba(15,40,25,.52) 0%, rgba(27,67,50,.35) 55%, rgba(10,30,18,.72) 100%), url("https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1900&q=85")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="relative z-10 max-w-3xl mx-auto px-6 pt-24 pb-36">
          <span className="inline-flex items-center gap-2 bg-white/14 backdrop-blur-sm border border-white/25 rounded-full px-4 py-1.5 text-[.78rem] font-bold tracking-widest uppercase mb-7 text-white/90">
            🌲 Intensivt · Stemningsfyldt · Mærkbart resultat
          </span>
          <h1 className="font-serif text-[clamp(2.4rem,6vw,4rem)] font-bold leading-tight mb-5 text-white drop-shadow-lg">
            Mærk forskellen —<br />
            <em>allerede fra dag&nbsp;1</em>
          </h1>
          <p className="text-[clamp(1rem,2.2vw,1.2rem)] text-white/85 max-w-lg mx-auto mb-10 leading-relaxed">
            3 intensive dage i et af Sveriges smukkeste naturområder. Et stemningsfyldt
            program der giver dig et mærkbart resultat i kroppen — og ro i sindet.
            For dig der er 50+ og klar til at mærke noget.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="#booking" className="px-8 py-3.5 bg-forest-800 hover:bg-forest-900 text-white font-semibold rounded-full transition-all hover:-translate-y-0.5 hover:shadow-xl text-[.95rem]">
              Se ledige datoer
            </a>
            <a href="#program" className="px-8 py-3.5 bg-transparent border-2 border-white/65 hover:bg-white/12 hover:border-white text-white font-semibold rounded-full transition-all text-[.95rem]">
              Se programmet
            </a>
          </div>
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden sm:flex gap-12">
          {[['3', 'Dage'], ['50+', 'Målgruppe'], ['12', 'Deltagere max'], ['4', 'Arrange. 2026']].map(([num, lbl]) => (
            <div key={lbl} className="text-center">
              <strong className="block text-[1.9rem] font-bold leading-none">{num}</strong>
              <span className="text-[.68rem] uppercase tracking-widest opacity-70">{lbl}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── OM BOOTCAMPEN ── */}
      <section id="om" className="py-20 bg-cream">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/5]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80"
                  alt="Gruppe der strækker sig i naturen"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-5 left-5 bg-forest-800 text-white text-sm font-semibold px-4 py-3 rounded-xl leading-snug shadow-lg">
                  Uddannet instruktør<br />med 20 års erfaring
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={2}>
              <Label>Om bootcampen</Label>
              <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] font-bold text-forest-900 mb-5 leading-tight">
                Intensivt. Stemningsfyldt.<br />Du <em>mærker</em> det.
              </h2>
              <p className="text-gray-500 mb-4 leading-relaxed">
                Dette er ikke et hygge-arrangement hvor ingenting sker. Det er 3 intensive dage
                hvor du presser dine grænser — skånsomt og guidet — og kommer hjem med et mærkbart
                resultat i kroppen. Mere energi, mere fleksibilitet og en ro du husker.
              </p>
              <p className="text-gray-500 mb-8 leading-relaxed">
                Vi holder til i Lidhult i Småland — et af Sveriges mest stemningsfyldte
                naturområder med tæt skov, Bolmen-søen og frisk luft i alle retninger.
                Rammen er designet specifikt til 50+ — alle køn — uanset dit udgangspunkt.
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  ['🧘', 'Pilates & yoga'],
                  ['⚡', 'Tabata-træning'],
                  ['🌿', 'Mindfulness i natur'],
                  ['🥗', 'Sunde måltider'],
                  ['🛏️', 'Enkelt & dobbelt'],
                  ['👥', 'Max 12 deltagere'],
                ].map(([ic, lbl]) => (
                  <div key={lbl} className="flex items-center gap-2.5 bg-white border border-gray-100 rounded-full px-4 py-2 text-sm text-gray-600 shadow-sm">
                    <span className="w-7 h-7 bg-sage-100 rounded-full flex items-center justify-center text-base shrink-0">{ic}</span>
                    {lbl}
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── PROGRAM ── */}
      <section id="program" className="py-20 bg-warm-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <Label>Aktiviteter</Label>
            <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] font-bold text-forest-900 mb-4">Hvad indeholder bootcampen?</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Et varieret og skånsomt program designet til at styrke krop og sind —
              uanset om du er nybegynder eller erfaren.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ProgramCard delay={1} icon="⚡" title="Tabata" tag="Styrke & kondition"
              img="https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=600&q=80" alt="Tabata træning"
              desc="Effektiv intervaltræning i korte, intense sekvenser. Tilpasset alle niveauer — kom i form på en skånsom måde." />
            <ProgramCard delay={2} icon="🧘" title="Pilates & Yoga" tag="Fleksibilitet & balance"
              img="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80" alt="Pilates og yoga"
              desc="Kernestyrke, fleksibilitet og balance. Passer perfekt til 50+ og hjælper med at forebygge smerter og stivhed." />
            <ProgramCard delay={3} icon="🌿" title="Mindfulness i natur" tag="Ro & nærvær"
              img="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80" alt="Mindfulness i natur"
              desc="Guidede vandringer, åndedrætsøvelser og stille stunder i skoven. Oplev naturens helende kraft." />
            <ProgramCard delay={4} icon="🥗" title="Sunde måltider" tag="Ernæring & energi"
              img="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80" alt="Sunde måltider"
              desc="Lette, antiinflammatoriske retter der giver energi til dagens aktiviteter — tilberedt med friske råvarer." />
          </div>
        </div>
      </section>

      {/* ── DAGSPROGRAM ── */}
      <section className="py-20 bg-forest-900">
        <div className="max-w-6xl mx-auto px-6 text-center mb-12">
          <LabelLight>Dagsprogram</LabelLight>
          <h2 className="font-serif text-4xl font-bold text-white mb-4">Tre dage i naturen</h2>
          <p className="text-white/60 max-w-lg mx-auto">En typisk dag balancerer aktivitet, hvile og fællesskab — uden stress og tidspres.</p>
        </div>
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-5">
          {[
            {
              day: 1, name: 'Ankomst & Intro', sub: 'Fredag',
              items: [['15:00','Ankomst og indlogering'],['16:00','Velkomst, kaffe & frisk luft'],['17:30','Let intro-yoga (45 min)'],['19:00','Fælles aftensmad'],['20:30','Aftenvandring ved bålet']],
            },
            {
              day: 2, name: 'Aktiviteternes dag', sub: 'Lørdag',
              items: [['07:30','Morgenmeditation & let yoga'],['08:30','Næringsrig morgenmad'],['10:00','Tabata-session (45 min)'],['12:30','Frokost & hvile'],['14:30','Mindfulness-vandring'],['17:00','Pilates (60 min)'],['19:00','Fælles middag']],
            },
            {
              day: 3, name: 'Afrunding & Hjem', sub: 'Søndag',
              items: [['08:00','Morgenyoga & vejrtrækning'],['09:00','Brunch med alle'],['10:30','Tabata & stretching'],['12:00','Afslutningscirkel'],['13:00','Let frokost & afrejse']],
            },
          ].map(({ day, name, sub, items }) => (
            <FadeUp key={day} delay={day as 1|2|3}>
              <div className="bg-white/7 border border-white/12 rounded-2xl p-7 h-full">
                <div className="flex items-center gap-3 mb-6 pb-5 border-b border-white/10">
                  <span className="w-11 h-11 bg-forest-700 rounded-full flex items-center justify-center text-white font-bold text-base shrink-0">{day}</span>
                  <div>
                    <h3 className="font-serif text-[1.05rem] font-semibold text-white leading-tight">{name}</h3>
                    <p className="text-white/50 text-xs mt-0.5">{sub}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {items.map(([time, act]) => (
                    <div key={time} className="flex gap-3">
                      <span className="text-[.68rem] font-bold text-sage-300 uppercase tracking-wide pt-0.5 w-12 shrink-0">{time}</span>
                      <span className="text-white/80 text-sm">{act}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── INSTRUKTØR ── */}
      <section id="instruktør" className="py-20 bg-cream">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-[320px_1fr] gap-14 items-start">
            <FadeUp>
              <div className="rounded-2xl overflow-hidden shadow-xl max-w-xs lg:max-w-none">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1594381898411-846e7d193883?w=600&q=80"
                  alt="Certificeret fitnessinstruktør"
                  loading="lazy"
                  className="w-full aspect-[3/4] object-cover"
                />
              </div>
            </FadeUp>
            <FadeUp delay={2}>
              <Label>Din instruktør</Label>
              <h2 className="font-serif text-[clamp(1.8rem,4vw,2.6rem)] font-bold text-forest-900 mb-2 leading-tight">
                Professionel vejledning<br />hele vejen
              </h2>
              <p className="text-forest-700 font-semibold mb-5 text-sm">Certificeret fitness- & mindfulness-instruktør</p>
              <p className="text-gray-500 mb-4 leading-relaxed">
                Med over 20 års erfaring inden for yoga, pilates og funktionel træning specialiserer
                vores instruktør sig i at skabe trygge rammer for voksne der vil bevæge sig mere —
                uden at det skal være kompliceret eller smertefuldt.
              </p>
              <p className="text-gray-500 mb-8 leading-relaxed">
                Undervisningen er altid tilpasset til den enkeltes udgangspunkt. Det handler ikke om
                præstation, men om at lytte til kroppen og finde glæde i bevægelsen.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Certificeret yoga-instruktør','Pilates-uddannet','NASM certificeret','Mindfulness-træner','20+ års erfaring','Specialiseret i 50+'].map(c => (
                  <span key={c} className="inline-flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-3.5 py-1.5 text-[.8rem] text-gray-600 shadow-sm">
                    <span className="w-1.5 h-1.5 bg-forest-700 rounded-full" />{c}
                  </span>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── OVERNATNING ── */}
      <section id="ophold" className="py-20 bg-warm-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <Label>Overnatning</Label>
            <h2 className="font-serif text-4xl font-bold text-forest-900 mb-4">Bliv i de smukkeste omgivelser</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Vi bor tæt på naturen i hyggelige faciliteter. Vælg det der passer dig bedst.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-7">
            {[
              {
                title: 'Enkeltværelse', popular: false,
                img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
                desc: 'Dit eget private rum med udsigt til naturen. Perfekt til dig der ønsker ro og privatliv.',
                features: ['Eget rum til dig alene','Eget badeværelse','Seng med natursenge linned','Udsigt til skov eller sø','Alle måltider inkluderet','Alle aktiviteter inkluderet'],
                cta: 'Se pris på enkelt', ctaStyle: 'outline',
              },
              {
                title: 'Dobbeltværelse', popular: true,
                img: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800&q=80',
                desc: 'Del med en ven, partner eller nyt bekendtskab. Mange deltagere møder her livslange venskaber.',
                features: ['Deles med én anden deltager','Fælles badeværelse','2 komfortable senge','Hyggelig stemning','Alle måltider inkluderet','Alle aktiviteter inkluderet'],
                cta: 'Se pris på dobbelt', ctaStyle: 'filled',
              },
            ].map(rm => (
              <FadeUp key={rm.title} delay={rm.popular ? 2 : 1}>
                <div className={`rounded-2xl overflow-hidden shadow-lg border-2 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl h-full flex flex-col ${
                  rm.popular ? 'border-forest-800' : 'border-gray-200'
                }`}>
                  <div className="relative overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={rm.img} alt={rm.title} loading="lazy" className="w-full aspect-video object-cover transition-transform duration-500 hover:scale-105" />
                    {rm.popular && (
                      <span className="absolute top-3 right-3 bg-forest-800 text-white text-[.68rem] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full">Mest valgt</span>
                    )}
                  </div>
                  <div className="p-7 flex flex-col flex-1">
                    <h3 className="font-serif text-2xl font-bold text-forest-900 mb-2">{rm.title}</h3>
                    <p className="text-gray-500 text-sm mb-5 leading-relaxed">{rm.desc}</p>
                    <ul className="space-y-2 flex-1 mb-6">
                      {rm.features.map(f => (
                        <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="text-forest-700 font-bold shrink-0">✓</span>{f}
                        </li>
                      ))}
                    </ul>
                    <a href="#priser" className={`text-center py-3 rounded-full font-semibold text-sm transition-all hover:-translate-y-0.5 ${
                      rm.ctaStyle === 'filled'
                        ? 'bg-forest-800 hover:bg-forest-900 text-white hover:shadow-lg'
                        : 'border-2 border-forest-800 text-forest-800 hover:bg-forest-800 hover:text-white'
                    }`}>
                      {rm.cta}
                    </a>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAD ── */}
      <section id="mad" className="py-20 bg-cream">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <FadeUp>
              <Label>Kost & ernæring</Label>
              <h2 className="font-serif text-[clamp(1.8rem,4vw,2.6rem)] font-bold text-forest-900 mb-5 leading-tight">
                Mad der nærer kroppen<br />og glæder smagen
              </h2>
              <p className="text-gray-500 mb-4 leading-relaxed">
                Alle måltider er inkluderet og tilberedt med fokus på friske, antiinflammatoriske
                råvarer der giver dig energi til dagens aktiviteter — uden at tælle kalorier.
              </p>
              <p className="text-gray-500 mb-7 leading-relaxed">
                Vi tager hensyn til allergier og præferencer. Skriv gerne ved booking hvad vi skal
                være opmærksomme på.
              </p>
              <ul className="space-y-3">
                {[
                  ['🌅','Morgenmad med smoothies, grød og frugt'],
                  ['🥗','Let, farverig frokost'],
                  ['🍽️','Varm, sund aftensmad'],
                  ['🍵','Kaffe, te og frugt hele dagen'],
                  ['🌱','Vegetarisk og vegansk option'],
                  ['⚠️','Allergi & præferencer tilgodeses'],
                ].map(([ic, txt]) => (
                  <li key={txt} className="flex items-center gap-3 text-gray-600 text-sm">
                    <span className="text-xl">{ic}</span>{txt}
                  </li>
                ))}
              </ul>
            </FadeUp>
            <FadeUp delay={2}>
              <div className="rounded-2xl overflow-hidden shadow-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80"
                  alt="Sunde, farverige måltider"
                  loading="lazy"
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── PRISER ── */}
      <section id="priser" className="py-20 bg-warm-white">
        <div className="max-w-6xl mx-auto px-6 text-center mb-14">
          <Label>Priser</Label>
          <h2 className="font-serif text-4xl font-bold text-forest-900 mb-4">Alt inkluderet fra første dag</h2>
          <p className="text-gray-500 max-w-xl mx-auto">Én pris der dækker alt — overnatning, alle måltider og hele programmet. Ingen skjulte omkostninger.</p>
        </div>
        <div className="max-w-2xl mx-auto px-6 grid sm:grid-cols-2 gap-6">
          <FadeUp delay={1}>
            <PriceCard
              title="Dobbeltværelse"
              price="2.995"
              note="Del med én anden deltager"
              includes={['2 nætters overnatning (dobbelt)','Alle måltider (fre. aften – søn. frokost)','Tabata, pilates & yoga','Mindfulness i natur','Guidede vandringer','Kaffe, te & snacks']}
              cta="Vælg dobbelt"
            />
          </FadeUp>
          <FadeUp delay={2}>
            <PriceCard
              title="Enkeltværelse"
              price="3.795"
              note="Dit eget private værelse"
              featured
              ribbon="Privatliv & ro"
              includes={['2 nætters overnatning (enkelt)','Alle måltider (fre. aften – søn. frokost)','Tabata, pilates & yoga','Mindfulness i natur','Guidede vandringer','Kaffe, te & snacks']}
              cta="Vælg enkelt"
            />
          </FadeUp>
        </div>
        <p className="text-center text-gray-400 text-xs mt-6">
          Priser inkl. moms. Betaling ved bekræftelse. Aflysning op til 30 dage inden refunderes fuldt ud.
        </p>
      </section>

      {/* ── NÆRHEDEN ── */}
      <NaerhedenSection />

      {/* ── BOOKING ── */}
      <BookingSection />

      {/* ── GALLERI ── */}
      <GallerySection />

      {/* ── KONTAKT ── */}
      <section id="kontakt" className="py-20 bg-cream">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-14 items-start">
            <FadeUp>
              <Label>Kontakt os</Label>
              <h2 className="font-serif text-[clamp(1.8rem,4vw,2.6rem)] font-bold text-forest-900 mb-4 leading-tight">
                Spørgsmål?<br />Vi hjælper gerne.
              </h2>
              <p className="text-gray-500 mb-8 leading-relaxed">
                Har du spørgsmål om programmet, overnatning, priser eller andet? Skriv til os —
                vi svarer inden for én hverdag.
              </p>
              <div className="space-y-5">
                {[
                  ['📧','E-mail','info@naturbootcamp.dk'],
                  ['📱','Telefon','+45 00 00 00 00'],
                  ['📍','Lokation','Lidhult, Småland, Sverige'],
                  ['🕐','Svartid','Inden for 1 hverdag'],
                ].map(([ic, lbl, val]) => (
                  <div key={lbl} className="flex items-start gap-4">
                    <span className="w-11 h-11 bg-sage-100 rounded-xl flex items-center justify-center text-xl shrink-0">{ic}</span>
                    <div>
                      <strong className="block text-[.78rem] text-forest-700 uppercase tracking-wider font-bold mb-0.5">{lbl}</strong>
                      <span className="text-gray-500 text-sm">{val}</span>
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>
            <FadeUp delay={2}>
              <ContactForm />
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-forest-900 text-white/65 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-10 pb-8 border-b border-white/10 mb-6">
            <div>
              <a href="#hjem" className="font-serif text-xl font-bold text-white mb-3 block">
                Natur <span className="text-sage-300">Bootcamp</span>
              </a>
              <p className="text-sm leading-relaxed max-w-xs">
                3 dages velvære-bootcamp i Sveriges smukke natur. For dig der vil mærke kroppen,
                finde ro og skabe gode vaner.
              </p>
            </div>
            <div>
              <h5 className="text-white text-[.75rem] font-bold uppercase tracking-widest mb-4">Navigation</h5>
              <ul className="space-y-2 text-sm">
                {[['Om bootcampen','#om'],['Program','#program'],['Instruktør','#instruktør'],['Overnatning','#ophold'],['Priser','#priser'],['Booking','#booking'],['Kontakt','#kontakt']].map(([l,h])=>(
                  <li key={h}><a href={h} className="hover:text-sage-300 transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="text-white text-[.75rem] font-bold uppercase tracking-widest mb-4">Information</h5>
              <ul className="space-y-2 text-sm">
                {[['Ledige datoer 2026','#booking'],['Kost & måltider','#mad'],['Galleri','#galleri'],['info@naturbootcamp.dk','mailto:info@naturbootcamp.dk']].map(([l,h])=>(
                  <li key={h}><a href={h} className="hover:text-sage-300 transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-xs">
            <span>&copy; 2026 Natur Bootcamp Sverige. Alle rettigheder forbeholdes.</span>
            <span>Lavet med ❤️ og frisk svensk luft</span>
          </div>
        </div>
      </footer>
    </>
  )
}
