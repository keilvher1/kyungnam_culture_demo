interface HeroSectionProps {
  title: string
  subtitle: string
  accentColor: string
}

export function HeroSection({ title, subtitle, accentColor }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-primary-investment py-32 md:py-40 lg:py-48">
      <div className="absolute inset-0 -z-10">
        {/* Enhanced holographic ellipses with deeper colors and better blending */}
        <div
          className="absolute left-[10%] top-[15%] h-[350px] w-[700px] rounded-[50%] opacity-50 blur-[100px]"
          style={{
            background: "radial-gradient(ellipse, var(--holographic-peach) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute left-[15%] top-[35%] h-[300px] w-[600px] rounded-[50%] opacity-45 blur-[100px]"
          style={{
            background: "radial-gradient(ellipse, var(--holographic-mint) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute left-[12%] top-[55%] h-[330px] w-[650px] rounded-[50%] opacity-50 blur-[100px]"
          style={{
            background: "radial-gradient(ellipse, var(--holographic-blue) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute left-[10%] top-[75%] h-[270px] w-[550px] rounded-[50%] opacity-45 blur-[100px]"
          style={{
            background: "radial-gradient(ellipse, var(--holographic-yellow) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute left-[8%] bottom-[5%] h-[310px] w-[600px] rounded-[50%] opacity-40 blur-[100px]"
          style={{
            background: "radial-gradient(ellipse, var(--holographic-cyan) 0%, transparent 65%)",
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 flex justify-center md:justify-start">
            <div className="inline-flex items-center gap-3 rounded-full bg-accent-yellow px-7 py-3.5 text-base font-black text-accent-yellow-foreground shadow-2xl md:text-lg">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-yellow-foreground opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-accent-yellow-foreground" />
              </span>
              2025. 12. 6.(토) - 12. 7.(일)
            </div>
          </div>

          <h1 className="mb-6 text-5xl font-black leading-[1.1] tracking-tight text-white text-balance drop-shadow-2xl md:text-6xl lg:text-7xl xl:text-8xl whitespace-nowrap">
            {title}
          </h1>

          <div className="mb-8 border-t-[3px] border-b-[3px] border-white/40 py-5 md:mb-10">
            <p className="font-serif text-3xl font-bold italic text-white drop-shadow-lg md:text-4xl lg:text-5xl">
              NEXT ICON
            </p>
            <p className="text-xl font-bold text-white/95 drop-shadow-md md:text-2xl lg:text-3xl">We Create CONTENT</p>
          </div>

          <p className="mb-12 text-2xl font-bold text-white text-balance drop-shadow-lg md:text-3xl lg:text-4xl">
            {subtitle}
          </p>

          <div className="flex flex-col gap-4 text-lg text-white md:text-xl">
            <div className="flex items-center gap-4">
              <svg
                className="h-7 w-7 flex-shrink-0 drop-shadow-md"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="font-bold drop-shadow-md">창원컨벤션센터(CECO)</span>
            </div>
            <div className="ml-11 text-lg text-white/90 drop-shadow-md md:text-xl">제 1전시장, 301·302 회의실</div>
          </div>
        </div>
      </div>
    </section>
  )
}
