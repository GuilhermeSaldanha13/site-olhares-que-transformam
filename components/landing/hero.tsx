import Image from "next/image"
import { Button } from "@/components/ui/button"

const highlights = [
  { icon: "calendar", label: "Dias 03 e 04 de agosto" },
  { icon: "clock", label: "19h às 22h" },
  { icon: "monitor", label: "Ao vivo e online" },
  { icon: "video", label: "Aulas gravadas por 30 dias" },
  { icon: "award", label: "Certificado de participação" },
]

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col items-start">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
            Formação online para a Educação Infantil
          </span>

          <h1 className="font-serif text-4xl font-medium leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Olhares que transformam
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-foreground/80 text-pretty">
            Um novo olhar sobre o desenvolvimento infantil começa na sua sala de aula. Aprenda a identificar os primeiros
            sinais de alerta e descubra quando e como agir com segurança, antes que pequenas dificuldades se tornem
            grandes obstáculos.
          </p>

          <ul className="mt-8 flex flex-col gap-3">
            {highlights.map((item) => (
              <li key={item.label} className="flex items-center gap-3 text-[15px] text-foreground/85">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                  <HighlightIcon name={item.icon} />
                </span>
                {item.label}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild size="lg" className="rounded-full px-8 text-base">
              <a href="#inscricao">Quero garantir minha vaga</a>
            </Button>
            <span className="text-sm text-muted-foreground">Carga horária de 6 horas · Vagas limitadas</span>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -right-4 -top-4 -z-10 h-full w-full rounded-[2rem] bg-accent/15" aria-hidden="true" />
          <div className="overflow-hidden rounded-[2rem] border border-border shadow-sm">
            <Image
              src="/shirlei-hero.jpg"
              alt="Shirlei de Vargas Saldanha, psicóloga e neuropsicóloga, sentada com livros de neuropsicologia"
              width={720}
              height={900}
              priority
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function HighlightIcon({ name }: { name: string }) {
  const common = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  }
  switch (name) {
    case "calendar":
      return (
        <svg {...common}>
          <path d="M8 2v4M16 2v4M3 10h18" />
          <rect width="18" height="18" x="3" y="4" rx="2" />
        </svg>
      )
    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      )
    case "monitor":
      return (
        <svg {...common}>
          <rect width="20" height="14" x="2" y="3" rx="2" />
          <path d="M8 21h8M12 17v4" />
        </svg>
      )
    case "video":
      return (
        <svg {...common}>
          <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.934a.5.5 0 0 0-.777-.416L16 11" />
          <rect x="2" y="6" width="14" height="12" rx="2" />
        </svg>
      )
    case "award":
      return (
        <svg {...common}>
          <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" />
          <circle cx="12" cy="8" r="6" />
        </svg>
      )
    default:
      return null
  }
}
