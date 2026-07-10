const faqs = [
  {
    q: "Nunca fiz um curso sobre desenvolvimento infantil. Posso participar?",
    a: "Sim. A formação foi pensada para profissionais da Educação Infantil, independentemente do nível de conhecimento prévio.",
  },
  {
    q: "E se eu não puder assistir ao vivo?",
    a: "Sem problemas. A gravação ficará disponível por 30 dias para você assistir no seu tempo.",
  },
  {
    q: "Receberei certificado?",
    a: "Sim, você recebe um certificado de participação com carga horária de 6 horas.",
  },
  {
    q: "Vou aprender sobre diagnósticos?",
    a: "Não. O foco da formação é ensinar a observar sinais de alerta e compreender quando um encaminhamento especializado pode ser necessário.",
  },
]

export function Faq() {
  return (
    <section id="duvidas" className="border-t border-border">
      <div className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8 md:py-24">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-[0.14em] text-primary">Dúvidas frequentes</p>
          <h2 className="mt-3 font-serif text-3xl font-medium leading-tight tracking-tight text-balance sm:text-4xl">
            Perguntas frequentes
          </h2>
        </div>

        <div className="mt-12 space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group rounded-2xl border border-border bg-card p-1 transition-colors open:border-primary/40"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-medium text-foreground">
                {faq.q}
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-secondary text-primary transition-transform group-open:rotate-45">
                  <svg
                    aria-hidden="true"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5v14" />
                  </svg>
                </span>
              </summary>
              <p className="px-5 pb-5 leading-relaxed text-muted-foreground">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
