import Image from "next/image"
import "./site-header-mobile-menu.css"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <a
          href="#inicio"
          className="flex items-center justify-center py-4"
          aria-label="Shirlei Saldanha - início"
        >
          <Image
            src="/Logo.png"
            alt="Logo"
            width={520}
            height={186}
            priority
            className="h-28 w-auto mix-blend-multiply md:h-32"
          />
        </a>

        <nav
          className="menu-mobile md:flex md:gap-2 md:p-0 md:flex-row md:items-center md:justify-center"
          aria-label="Navegação principal"
        >
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

