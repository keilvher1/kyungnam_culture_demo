"use client"

import { useState, useEffect } from "react"
import { HeroSection } from "@/components/hero-section"
import { EventInfo } from "@/components/event-info"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function OpenInnovationPage() {
  const [challenges, setChallenges] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        // For now using static data - will be replaced with database calls
        const staticChallenges = [
          {
            id: "1",
            company: "대기업 A",
            theme: "메타버스 콘텐츠",
            prize: "최대 5천만원",
            description: "메타버스 플랫폼을 위한 창의적인 콘텐츠 아이디어",
            category: "metaverse",
          },
          {
            id: "2",
            company: "대기업 B",
            theme: "AI 기반 콘텐츠",
            prize: "최대 3천만원",
            description: "생성형 AI를 활용한 혁신적인 콘텐츠 솔루션",
            category: "ai",
          },
          {
            id: "3",
            company: "대기업 C",
            theme: "지역 문화 콘텐츠",
            prize: "최대 2천만원",
            description: "경남 지역 문화를 활용한 콘텐츠 기획",
            category: "local",
          },
        ]
        setChallenges(staticChallenges)
      } catch (error) {
        console.error("Failed to load data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const benefits = [
    {
      title: "사업화 지원",
      description: "선정 과제에 대한 사업화 자금 및 멘토링 지원",
    },
    {
      title: "협업 기회",
      description: "대기업과의 직접적인 협업 및 파트너십 기회",
    },
    {
      title: "네트워킹",
      description: "산업 전문가 및 투자자와의 네트워킹 기회",
    },
    {
      title: "후속 투자",
      description: "우수 과제에 대한 후속 투자 연계",
    },
  ]

  const process = [
    { step: "1", title: "과제 공고", description: "오픈 이노베이션 과제 발표" },
    { step: "2", title: "아이디어 제출", description: "참가 신청 및 아이디어 제출" },
    { step: "3", title: "1차 심사", description: "서류 심사 및 발표 기업 선정" },
    { step: "4", title: "최종 발표", description: "피칭 데모데이 및 최종 심사" },
    { step: "5", title: "시상 및 협약", description: "수상 기업 발표 및 협약 체결" },
  ]

  return (
    <main>
      <HeroSection
        title="오픈 이노베이션"
        subtitle="대기업과 스타트업이 함께 만드는 혁신적인 콘텐츠"
        accentColor="oklch(0.55 0.20 280)"
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-4">과제 안내</h2>
              <p className="text-muted-foreground">대기업이 제시하는 혁신 과제에 도전하세요</p>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">데이터를 불러오는 중입니다...</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {challenges.map((challenge) => (
                  <Card key={challenge.id} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="mb-4">
                      <div className="inline-block rounded-full bg-primary-innovation/10 px-3 py-1 text-xs font-medium text-primary-innovation mb-3">
                        {challenge.company}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{challenge.theme}</h3>
                      <div className="text-sm font-bold text-primary-innovation mb-3">{challenge.prize}</div>
                    </div>
                    <p className="text-sm leading-relaxed">{challenge.description}</p>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-4">지원 혜택</h2>
              <p className="text-muted-foreground">선정 기업에게 제공되는 다양한 혜택</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {benefits.map((benefit, index) => (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="mb-4">
                    <div className="mx-auto w-12 h-12 rounded-full bg-primary-innovation/10 flex items-center justify-center mb-4">
                      <span className="text-xl font-bold text-primary-innovation">{index + 1}</span>
                    </div>
                    <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{benefit.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold mb-4">진행 프로세스</h2>
              <p className="text-muted-foreground">오픈 이노베이션 참가 절차</p>
            </div>

            <div className="relative">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2 hidden lg:block" />

              <div className="grid gap-8 md:grid-cols-5 relative">
                {process.map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="relative mb-4">
                      <div className="mx-auto w-16 h-16 rounded-full bg-primary-innovation text-white flex items-center justify-center text-xl font-bold mb-4 relative z-10">
                        {item.step}
                      </div>
                    </div>
                    <h3 className="font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 text-center">
              <Button size="lg" className="bg-primary-innovation hover:bg-primary-innovation/90">
                참가 신청하기
              </Button>
            </div>
          </div>
        </div>
      </section>

      <EventInfo />
    </main>
  )
}
