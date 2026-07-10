const situations = [
  "Você percebe que uma criança é diferente das demais, mas não consegue explicar exatamente por quê.",
  "Um aluno evita olhar nos olhos, prefere brincar sozinho e parece viver em seu próprio mundo.",
  "Uma criança que fala muito pouco enquanto os colegas já conversam naturalmente.",
  "Um aluno que parece não escutar quando é chamado, mas responde imediatamente quando o assunto é do seu interesse.",
  "A criança entende a atividade, mas nunca consegue concluí-la.",
  "Um aluno que se irrita intensamente diante de pequenas mudanças na rotina.",
  'Aquele aluno que parece "não parar um segundo", mas também demonstra enorme curiosidade e potencial.',
  "Uma criança que chora ou entra em crise por causa de um barulho, da textura da tinta ou da etiqueta da roupa.",
  'Você já ouviu dos pais: "Em casa ele é completamente diferente."',
  "Há crianças que acompanham as atividades, mas apresentam dificuldades importantes nas brincadeiras com outras crianças.",
  'Você já ficou em dúvida se deveria conversar com a família ou esperar "mais um pouco".',
  "Você percebe sinais que chamam sua atenção, mas sente insegurança para registrar ou comunicar suas observações.",
  'Você já pensou: "Será que estou exagerando ou realmente existe um sinal de alerta aqui?"',
  "Você gostaria de compreender melhor o desenvolvimento infantil para ter mais segurança nas suas decisões em sala de aula.",
]

export function Situations() {
  return (
    <section id="formacao" className="border-t border-border bg-card">
      <div className="mx-auto w-full max-w-5xl px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.14em] text-primary">Talvez você reconheça</p>
          <h2 className="mt-3 font-serif text-3xl font-medium leading-tight tracking-tight text-balance sm:text-4xl">
            Você já viveu alguma destas situações?
          </h2>
        </div>

        <ul className="mt-12 grid gap-x-8 gap-y-5 sm:grid-cols-2">
          {situations.map((text) => (
            <li key={text} className="flex items-start gap-3 leading-relaxed">
              <CheckIcon />
              <span className="text-foreground/85">{text}</span>
            </li>
          ))}
        </ul>

        <div className="mx-auto mt-14 max-w-2xl rounded-2xl border border-border bg-background p-8 text-center">
          <p className="text-lg leading-relaxed text-foreground/90">
            Se você respondeu <span className="font-semibold text-primary">&ldquo;sim&rdquo;</span> para alguma dessas
            situações...
          </p>
          <p className="mt-2 font-serif text-2xl font-medium tracking-tight">Essa formação foi feita para você.</p>
        </div>
      </div>
    </section>
  )
}

function CheckIcon() {
  return (
    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
      <svg
        aria-hidden="true"
        width="13"
        height="13"
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
  )
}
