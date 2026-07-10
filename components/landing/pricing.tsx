import { Button } from "@/components/ui/button"

const info = [
  { label: "Data", value: "03 e 04 de agosto" },
  { label: "Horário", value: "19h às 22h" },
  { label: "Formato", value: "Online ao vivo" },
  { label: "Gravação", value: "Disponível por 30 dias" },
  { label: "Carga horária", value: "6 horas" },
]

const included = [
  "Acesso às aulas ao vivo",
  "Gravação por 30 dias",
  "Checklist dos sinais de alerta",
  "Material completo em PDF",
  "Certificado de participação",
]

export function Pricing() {
  return (
    <section id="preco" className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.14em] text-primary-foreground/70">Investimento</p>
          <h2 className="mt-3 font-serif text-3xl font-medium leading-tight tracking-tight text-balance sm:text-4xl">
            Garanta sua vaga no Olhares que Transformam
          </h2>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-6 lg:grid-cols-[1fr_1.1fr]">
          <div className="rounded-2xl border border-primary-foreground/20 bg-primary-foreground/5 p-8">
            <h3 className="font-serif text-xl font-medium">Informações do encontro</h3>
            <dl className="mt-6 divide-y divide-primary-foreground/15">
              {info.map((item) => (
                <div key={item.label} className="flex items-center justify-between py-3">
                  <dt className="text-primary-foreground/70">{item.label}</dt>
                  <dd className="font-medium">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-2xl bg-background p-8 text-foreground shadow-sm">
            <span className="inline-flex rounded-full bg-accent/15 px-3 py-1 text-xs font-medium uppercase tracking-[0.12em] text-accent">
              Vagas limitadas
            </span>
            <div className="mt-5 flex items-end gap-2">
              <span className="font-serif text-5xl font-medium tracking-tight text-primary">R$ 397</span>
              <span className="pb-1.5 text-muted-foreground">à vista</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">ou em até 4x no cartão de crédito</p>

            <ul className="mt-6 space-y-2.5 border-t border-border pt-6">
              {included.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-[15px] text-foreground/85">
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <svg
                      aria-hidden="true"
                      width="12"
                      height="12"
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
                  {item}
                </li>
              ))}
            </ul>

            <Button asChild size="lg" className="mt-7 w-full rounded-full text-base">
              <a href="#inscricao">Quero garantir minha vaga agora</a>
            </Button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Pagamento seguro · Você receberá o acesso por e-mail
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
