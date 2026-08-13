export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#06111f] text-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_38%),radial-gradient(circle_at_bottom_right,_rgba(34,197,94,0.12),_transparent_28%),linear-gradient(180deg,_#08111d_0%,_#050b14_100%)]" />
      <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(148,163,184,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.18)_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-cyan-400/10 to-transparent blur-3xl" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl items-center px-6 py-10 sm:px-10 lg:px-16">
        <section className="grid w-full gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.35em] text-cyan-100/80 shadow-[0_0_30px_rgba(34,211,238,0.08)] backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(52,211,153,0.8)]" />
              Available for freelance
            </div>

            <div className="space-y-5">
              <p className="text-sm font-medium uppercase tracking-[0.5em] text-sky-200/70">
                Computer screen portfolio
              </p>
              <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
                Rakib builds interfaces that feel like a high-end desktop setup.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                A landing page styled like a glowing monitor, with sharp contrast,
                clean panels, and a command-center feel for projects, skills, and
                contact.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="#projects"
                className="rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-200"
              >
                View projects
              </a>
              <a
                href="#contact"
                className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-cyan-200/40 hover:bg-white/10"
              >
                Contact me
              </a>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ["05+", "Years of learning"],
                ["12+", "Projects crafted"],
                ["100%", "Responsive focus"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur"
                >
                  <div className="text-3xl font-semibold text-white">{value}</div>
                  <div className="mt-2 text-sm text-slate-300">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-8 top-10 h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl" />
            <div className="absolute -right-6 bottom-6 h-48 w-48 rounded-full bg-emerald-400/10 blur-3xl" />

            <div className="relative rounded-[2rem] border border-white/10 bg-[#0b1320]/90 p-4 shadow-[0_30px_120px_rgba(0,0,0,0.55)] backdrop-blur-xl">
              <div className="flex items-center justify-between rounded-[1.35rem] border border-white/10 bg-[#09101a] px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-rose-400" />
                  <span className="h-3 w-3 rounded-full bg-amber-300" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400" />
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.35em] text-slate-300">
                  Live Preview
                </div>
              </div>

              <div className="mt-4 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="relative overflow-hidden rounded-[1.5rem] border border-cyan-300/20 bg-[linear-gradient(180deg,rgba(15,23,42,0.95),rgba(8,15,25,0.95))] p-6">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:100%_3rem] opacity-30" />
                  <div className="relative space-y-5">
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.4em] text-cyan-100/60">
                      <span>Desktop mode</span>
                      <span>01 / 03</span>
                    </div>

                    <div className="space-y-3">
                      <p className="text-sm uppercase tracking-[0.45em] text-emerald-300/70">
                        Frontend / UI Engineering
                      </p>
                      <h2 className="text-3xl font-semibold text-white">
                        Built like a workspace, not a template.
                      </h2>
                      <p className="max-w-md text-sm leading-7 text-slate-300">
                        A clean monitor frame, strong glow, and modular content blocks
                        that make the portfolio feel like an active screen.
                      </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      {[
                        ["Interface", "Dark glass panels"],
                        ["Motion", "Soft reveal accents"],
                        ["Style", "Bold tech aesthetic"],
                        ["Focus", "Projects and contact"],
                      ].map(([label, value]) => (
                        <div
                          key={label}
                          className="rounded-2xl border border-white/10 bg-white/5 p-4"
                        >
                          <div className="text-xs uppercase tracking-[0.4em] text-slate-400">
                            {label}
                          </div>
                          <div className="mt-2 text-sm font-medium text-white">
                            {value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4 rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                  <div className="rounded-2xl border border-white/10 bg-[#08111b] p-4">
                    <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-slate-400">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      Terminal
                    </div>
                    <div className="space-y-2 font-mono text-sm text-emerald-200/90">
                      <p>$ npm run dev</p>
                      <p>✓ screen mode loaded</p>
                      <p>✓ glow layers active</p>
                      <p>✓ portfolio ready</p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-[#08111b] p-4">
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                      Highlights
                    </p>
                    <div className="mt-4 space-y-3">
                      {[
                        "Responsive layouts that scale from phone to ultrawide",
                        "Neon accents and glass panels for a sharp computer-screen feel",
                        "Project sections ready for case studies and contact links",
                      ].map((item) => (
                        <div
                          key={item}
                          className="rounded-xl border border-white/8 bg-white/5 px-4 py-3 text-sm leading-6 text-slate-300"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section
        id="projects"
        className="relative border-t border-white/10 bg-[#050b14]/70 px-6 py-12 backdrop-blur sm:px-10 lg:px-16"
      >
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-3">
          {[
            ["01", "Portfolio shell", "A strong landing page framed like a desktop app window."],
            ["02", "Project cards", "Blocks that can later expand into real case studies."],
            ["03", "Contact strip", "A dedicated area for links, email, and social profiles."],
          ].map(([number, title, description]) => (
            <article
              key={title}
              className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
            >
              <div className="text-xs uppercase tracking-[0.4em] text-cyan-100/60">
                {number}
              </div>
              <h3 className="mt-3 text-xl font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-300">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <div id="contact" className="sr-only" />
    </main>
  );
}
