import Image from "next/image"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-6 px-5 py-10 text-center sm:px-8 md:flex-row md:text-left">
        <div className="flex flex-col items-center gap-3 md:items-start">
          <Image
            src="/logo-shirlei.png"
            alt="Shirlei Saldanha - Neuropsicologia e Psicologia Clínica"
            width={200}
            height={72}
            className="h-11 w-auto mix-blend-multiply"
          />
          <p className="text-sm text-muted-foreground">
            Formação <span className="font-medium text-foreground">Olhares que Transformam</span> · CRP 07/22467
          </p>
        </div>
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Olhares que Transformam. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
