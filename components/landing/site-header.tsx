import Image from "next/image"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-32 w-full max-w-6xl items-center justify-between px-5 sm:px-8 md:h-36">
        <a href="#inicio" className="flex items-center" aria-label="Shirlei Saldanha - início">
          <Image
            src="/logo-shirlei.png"
            alt="Shirlei Saldanha - Neuropsicologia e Psicologia Clínica"
            width={520}
            height={186}
            priority
            className="h-28 w-auto mix-blend-multiply md:h-32"
          />
        </a>

        <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          <a href="#formacao" className="transition-colors hover:text-foreground">
            A formação
          </a>
          <a href="#conteudo" className="transition-colors hover:text-foreground">
            Conteúdo
          </a>
          <a href="#instrutora" className="transition-colors hover:text-foreground">
            Instrutora
          </a>
          <a href="#duvidas" className="transition-colors hover:text-foreground">
            Dúvidas
          </a>
        </nav>

        <Button asChild className="rounded-full px-5">
          <a href="#inscricao">Garantir vaga</a>
        </Button>
      </div>
    </header>
  )
}
