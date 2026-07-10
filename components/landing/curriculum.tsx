const modules = [
  {
    number: "01",
    title: "Desenvolvimento infantil na perspectiva neuropsicológica",
    topics: [
      "Principais marcos do desenvolvimento na primeira infância",
      "Desenvolvimento cognitivo (o que é inteligência)",
      "Desenvolvimento da linguagem",
      "Desenvolvimento socioemocional",
      "O brincar",
      "O impacto do ambiente escolar no desenvolvimento",
    ],
  },
  {
    number: "02",
    title: "Atenção e Funções Executivas na Educação Infantil",
    topics: [
      "O que é atenção e como ela se desenvolve",
      "Tipos de atenção relevantes para a aprendizagem",
      "Impacto das dificuldades atencionais no contexto escolar",
      "Introdução às funções executivas",
      "Controle inibitório, memória de trabalho e flexibilidade cognitiva",
      "Relação entre funções executivas, comportamento e aprendizagem",
    ],
  },
  {
    number: "03",
    title: "Sinais de Alerta no Desenvolvimento Infantil",
    topics: [
      "Diferença entre variação do desenvolvimento e possível atraso",
      "Principais sinais de alerta observados na Educação Infantil",
      "Linguagem, atenção e comportamento",
      "Interação social",
      "Organização emocional",
      "Quando a escola deve se preocupar",
    ],
  },
  {
    number: "04",
    title: "Estratégias Práticas para o Contexto Escolar",
    topics: [
      "Organização do ambiente como fator regulador",
      "Estratégias para favorecer atenção e participação",
      "Como registrar observações do desenvolvimento",
      "Comunicação ética e acolhedora com as famílias",
      "Quando sugerir avaliação especializada",
    ],
  },
]

export function Curriculum() {
  return (
    <section id="conteudo" className="border-t border-border bg-card">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 md:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.14em] text-primary">O que você vai aprender</p>
          <h2 className="mt-3 font-serif text-3xl font-medium leading-tight tracking-tight text-balance sm:text-4xl">
            Quatro módulos, do conceito à prática em sala de aula
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {modules.map((module) => (
            <article
              key={module.number}
              className="flex flex-col rounded-2xl border border-border bg-background p-7"
            >
              <div className="flex items-center gap-4">
                <span className="font-serif text-3xl font-medium text-primary/40">{module.number}</span>
                <h3 className="font-serif text-xl font-medium leading-snug tracking-tight text-pretty">
                  {module.title}
                </h3>
              </div>
              <ul className="mt-5 space-y-2.5 border-t border-border pt-5">
                {module.topics.map((topic) => (
                  <li key={topic} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-foreground/80">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    {topic}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
