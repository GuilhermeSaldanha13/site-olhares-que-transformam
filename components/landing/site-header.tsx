import Image from "next/image"


export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <a href="#inicio" className="flex items-center justify-center py-4" aria-label="Shirlei Saldanha - início">
          <Image
            src="/Logo.png"
            alt="Logo"
            width={520}
            height={186}
            priority
            className="h-28 w-auto mix-blend-multiply md:h-32"
          />
        </a>

        <nav className="flex flex-col items-center gap-1 pb-2 text-sm text-muted-foreground md:flex-row md:items-center md:justify-center md:gap-2" aria-label="Navegação principal">
          <a href="#formacao" className="transition-colors hover:text-foreground">
            A formação
          </a>
          <a href="#conteudo" className="transition-colors hover:text-foreground">
            Conteúdo
          </a>
          <a href="#instrutora" className="transition-colors hover:text-foreground">
            Especialista
          </a>
          <a href="#duvidas" className="transition-colors hover:text-foreground">
            Dúvidas
          </a>
        </nav>
      </div>
    </header>
  )
}
