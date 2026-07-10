const audience = [
  "Professoras da Educação Infantil",
  "Auxiliares de sala de aula",
  "Monitores",
  "Coordenadores pedagógicos",
  "Supervisores escolares",
  "Estudantes de Pedagogia",
]

export function Audience() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto w-full max-w-5xl px-5 py-16 text-center sm:px-8 md:py-24">
        <p className="text-sm font-medium uppercase tracking-[0.14em] text-primary">Para quem é</p>
        <h2 className="mt-3 font-serif text-3xl font-medium leading-tight tracking-tight text-balance sm:text-4xl">
          Esta formação é para você
        </h2>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {audience.map((role) => (
            <div
              key={role}
              className="flex items-center gap-3 rounded-xl border border-border bg-card px-5 py-4 text-left"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                <svg
                  aria-hidden="true"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </span>
              <span className="font-medium text-foreground/85">{role}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
