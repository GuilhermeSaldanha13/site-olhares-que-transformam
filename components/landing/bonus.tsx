const bonuses = [
  { title: "Checklist completo", desc: "Guia prático com os principais sinais de alerta para consultar sempre." },
  { title: "Material em PDF", desc: "Todo o conteúdo organizado para você revisar quando quiser." },
  { title: "Certificado", desc: "Certificado de participação de 6 horas de carga horária." },
  { title: "Acesso à gravação", desc: "Assista às aulas gravadas por 30 dias, no seu tempo." },
]

export function Bonus() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 md:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.14em] text-primary">Além das aulas</p>
          <h2 className="mt-3 font-serif text-3xl font-medium leading-tight tracking-tight text-balance sm:text-4xl">
            Você também vai receber
          </h2>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {bonuses.map((bonus) => (
            <div key={bonus.title} className="rounded-2xl border border-border bg-card p-6">
              <span className="flex size-11 items-center justify-center rounded-xl bg-secondary text-primary">
                <GiftIcon />
              </span>
              <h3 className="mt-5 font-serif text-lg font-medium tracking-tight">{bonus.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{bonus.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function GiftIcon() {
  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="8" width="18" height="4" rx="1" />
      <path d="M12 8v13M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
      <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
    </svg>
  )
}
