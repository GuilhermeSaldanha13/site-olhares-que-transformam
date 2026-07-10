import Image from "next/image"

const outcomes = [
  "Observar o desenvolvimento infantil com muito mais segurança.",
  "Identificar sinais de alerta precocemente.",
  "Diferenciar comportamentos esperados daqueles que merecem atenção.",
  "Registrar observações de forma mais objetiva.",
  "Conversar com as famílias com mais confiança.",
  "Compreender quando um encaminhamento realmente faz sentido.",
]

export function Outcomes() {
  return (
    <section className="border-t border-border bg-card">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-2">
        <div className="relative order-2 lg:order-1">
          <div className="overflow-hidden rounded-[2rem] border border-border">
            <Image
              src="/shirlei-retrato.jpg"
              alt="Shirlei de Vargas Saldanha, psicóloga e neuropsicóloga"
              width={640}
              height={760}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <p className="text-sm font-medium uppercase tracking-[0.14em] text-primary">O que muda depois</p>
          <h2 className="mt-3 font-serif text-3xl font-medium leading-tight tracking-tight text-balance sm:text-4xl">
            Ao final da formação, você será capaz de...
          </h2>

          <ul className="mt-8 space-y-4">
            {outcomes.map((outcome) => (
              <li key={outcome} className="flex items-start gap-3">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <svg
                    aria-hidden="true"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                <span className="text-[17px] leading-relaxed text-foreground/85">{outcome}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
