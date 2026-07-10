import Image from "next/image"

export function Instructor() {
  return (
    <section id="instrutora" className="border-t border-border">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="relative mx-auto w-full max-w-sm lg:mx-0">
          <div className="absolute -bottom-4 -left-4 -z-10 h-full w-full rounded-[2rem] bg-secondary" aria-hidden="true" />
          <div className="overflow-hidden rounded-[2rem] border border-border">
            <Image
              src="/shirlei-instrutora.jpg"
              alt="Retrato de Shirlei de Vargas Saldanha, psicóloga e neuropsicóloga, em seu consultório"
              width={520}
              height={680}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div>
          <p className="text-sm font-medium uppercase tracking-[0.14em] text-primary">Quem conduz a formação</p>
          <h2 className="mt-3 font-serif text-3xl font-medium leading-tight tracking-tight text-balance sm:text-4xl">
            Foi por isso que nasceu o Olhares que Transformam
          </h2>

          <div className="mt-6 space-y-4 leading-relaxed text-foreground/85">
            <p>
              Sou <span className="font-semibold text-foreground">Shirlei de Vargas Saldanha</span>, psicóloga e
              neuropsicóloga (CRP 07/22467). Especialista em Avaliação Neuropsicológica, em Neuropsicologia Aplicada ao
              Transtorno do Espectro do Autismo e em Terapia Cognitivo-Comportamental.
            </p>
            <p>
              Há mais de 12 anos atuo avaliando crianças, adolescentes e adultos. Grande parte das crianças que chegam
              até mim já passaram anos apresentando sinais que poderiam ter sido investigados muito antes.
            </p>
            <p className="font-medium text-foreground">Quem esteve ao lado delas nesse período? As professoras.</p>
            <p>
              Foi pensando nisso que desenvolvi esta formação. Meu objetivo é oferecer conhecimento prático para que
              você se sinta mais segura ao observar, registrar e compreender o desenvolvimento infantil.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {["+12 anos de atuação", "CRP 07/22467", "Neuropsicologia Infantil"].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border bg-card px-4 py-1.5 text-sm text-foreground/80"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
