export function EventInfo() {
  const schedule = [
    {
      day: "Day 1.",
      date: "12.6.",
      items: ["개막식", "키노트 스피치", "컨퍼런스", "콘텐츠 팝업 세미나"],
    },
    {
      day: "All Day.",
      date: "상시",
      items: ["콘텐츠 전시 및 체험부스", "이터널리턴 수퍼컵", "드론체험", "비즈매칭", "IR 경연대회"],
    },
    {
      day: "Day 2.",
      date: "12.7.",
      items: ["콘텐츠 팝업 세미나", "투자협약식", "폐막공연"],
    },
  ]

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-investment via-primary-investment to-primary-investment/90 py-24 md:py-32">
      <div className="absolute inset-0 -z-10 opacity-10">
        <div
          className="absolute right-[5%] top-[10%] h-[300px] w-[500px] rounded-full blur-3xl"
          style={{ background: "var(--holographic-yellow)" }}
        />
        <div
          className="absolute left-[10%] bottom-[15%] h-[350px] w-[550px] rounded-full blur-3xl"
          style={{ background: "var(--holographic-cyan)" }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-black text-white md:text-5xl">행사 일정</h2>
            <p className="text-xl font-medium text-white/90">경남 콘텐츠, 미래의 아이콘이 되다</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {schedule.map((day, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-xl transition-all hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="absolute left-0 top-0 h-2 w-full bg-accent-yellow" />

                <div className="mb-6">
                  <div className="mb-2 text-2xl font-black text-accent-yellow">{day.day}</div>
                  <div className="text-3xl font-black text-foreground">{day.date}</div>
                </div>

                <ul className="space-y-3">
                  {day.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3 text-base">
                      <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-primary-investment" />
                      <span className="font-medium leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
