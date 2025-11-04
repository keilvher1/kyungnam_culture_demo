import { HeroSection } from "@/components/hero-section"
import { EventInfo } from "@/components/event-info"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HomePage() {
  const programs = [
    {
      title: "투자 매칭",
      date: "12월 6일",
      description: "경남 콘텐츠 기업과 투자사를 연결하는 비즈니스 매칭",
      color: "var(--primary-investment)",
      href: "/investment-matching",
    },
    {
      title: "바이어 매칭 - 웹툰",
      date: "12월 6-7일",
      description: "웹툰 작가와 플랫폼을 연결하는 비즈니스 매칭",
      color: "var(--primary-webtoon)",
      href: "/buyer-matching-webtoon",
    },
    {
      title: "바이어 매칭 - 기타",
      date: "12월 6-7일",
      description: "방송, 게임, 캐릭터 등 다양한 분야의 비즈니스 매칭",
      color: "var(--primary-other)",
      href: "/buyer-matching-other",
    },
    {
      title: "오픈 이노베이션",
      date: "12월 6-7일",
      description: "대기업과 스타트업이 함께 만드는 혁신 과제",
      color: "var(--primary-innovation)",
      href: "/open-innovation",
    },
  ]

  return (
    <main>
      <HeroSection
        title="2025 경남 콘텐츠페어"
        subtitle="경남 콘텐츠, 미래의 아이콘이 되다"
        accentColor="var(--primary-investment)"
      />

      <section className="relative py-28 md:py-36">
        <div className="absolute inset-0 -z-10 opacity-8">
          <div
            className="absolute right-[10%] top-[20%] h-[450px] w-[450px] rounded-full blur-[120px]"
            style={{ background: "var(--holographic-mint)" }}
          />
          <div
            className="absolute left-[15%] bottom-[20%] h-[400px] w-[400px] rounded-full blur-[120px]"
            style={{ background: "var(--holographic-peach)" }}
          />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="mb-24 text-center">
              <h2 className="mb-8 text-5xl font-black leading-tight md:text-6xl lg:text-7xl">주요 프로그램</h2>
              <p className="text-2xl font-bold text-muted-foreground md:text-3xl">
                다양한 비즈니스 매칭 프로그램에 참여하세요
              </p>
            </div>

            <div className="grid gap-10 md:grid-cols-2">
              {programs.map((program, index) => (
                <Link key={index} href={program.href}>
                  <Card className="group relative h-full overflow-hidden border-2 p-10 transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl">
                    <div
                      className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-10"
                      style={{ background: program.color }}
                    />

                    <div className="relative z-10">
                      <div className="mb-8">
                        <div
                          className="mb-6 inline-block rounded-full px-6 py-3 text-base font-black shadow-lg"
                          style={{
                            backgroundColor: `color-mix(in oklch, ${program.color} 20%, transparent)`,
                            color: program.color,
                          }}
                        >
                          {program.date}
                        </div>
                        <h3 className="mb-5 text-4xl font-black leading-tight">{program.title}</h3>
                      </div>
                      <p className="mb-10 text-xl font-medium leading-relaxed text-muted-foreground">
                        {program.description}
                      </p>
                      <Button
                        className="w-full text-lg font-black transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl"
                        size="lg"
                        style={{
                          backgroundColor: program.color,
                          color: "white",
                        }}
                      >
                        자세히 보기 →
                      </Button>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <EventInfo />
    </main>
  )
}
