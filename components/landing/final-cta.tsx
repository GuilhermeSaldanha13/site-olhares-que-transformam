import { Button } from "@/components/ui/button"

export function FinalCta() {
  return (
    <section className="border-t border-border bg-card">
      <div className="mx-auto w-full max-w-3xl px-5 py-20 text-center sm:px-8 md:py-28">
        <h2 className="font-serif text-3xl font-medium leading-tight tracking-tight text-balance sm:text-4xl">
          Um novo olhar pode transformar uma trajetória
        </h2>
        <div className="mx-auto mt-5 max-w-xl space-y-3 text-lg leading-relaxed text-foreground/80 text-pretty">
          <p>A criança passa poucos anos na Educação Infantil.</p>
          <p>O olhar atento de uma professora pode mudar toda a história do seu desenvolvimento.</p>
          <p className="font-medium text-foreground">Esperamos você no Olhares que Transformam.</p>
        </div>

        <Button asChild size="lg" className="mt-9 rounded-full px-8 text-base">
          <a href="#inscricao">Quero garantir minha vaga agora</a>
        </Button>
      </div>
    </section>
  )
}
