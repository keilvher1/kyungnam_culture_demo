"use client"

import { useState, useEffect } from "react"
import { HeroSection } from "@/components/hero-section"
import { EventInfo } from "@/components/event-info"
import { CompanyDetailModal } from "@/components/company-detail-modal"
import { BuyerDetailModal } from "@/components/buyer-detail-modal"
import { CompanyGrid } from "@/components/company-grid"
import { MatchingTimetable } from "@/components/matching-timetable"
import type { CompanyWithDetails, Buyer } from "@/lib/types/database"
import { getCompanies } from "@/lib/actions/companies"
import { getBuyers } from "@/lib/actions/buyers"
import { getMatchingSchedules } from "@/lib/actions/matching"
import { Card } from "@/components/ui/card"

export default function BuyerMatchingWebtoonPage() {
  const [companies, setCompanies] = useState<CompanyWithDetails[]>([])
  const [buyers, setBuyers] = useState<Buyer[]>([])
  const [selectedCompany, setSelectedCompany] = useState<CompanyWithDetails | null>(null)
  const [selectedBuyer, setSelectedBuyer] = useState<Buyer | null>(null)
  const [matchingSchedules, setMatchingSchedules] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        // 웹툰 카테고리만 필터링
        const [allCompanies, allBuyers] = await Promise.all([getCompanies(), getBuyers()])

        const webtoonCompanies = allCompanies.filter((c) => c.category === "webtoon" || c.industry?.includes("웹툰"))
        const webtoonBuyers = allBuyers.filter((b) => b.category === "webtoon" || b.focus?.includes("웹툰"))

        setCompanies(webtoonCompanies)
        setBuyers(webtoonBuyers)

        const schedules = await getMatchingSchedules("buyer_webtoon")
        setMatchingSchedules(schedules)
      } catch (error) {
        console.error("Failed to load data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  return (
    <main>
      <HeroSection
        title="바이어 매칭 - 웹툰"
        subtitle="웹툰 작가와 플랫폼을 연결하는 비즈니스 매칭 프로그램"
        accentColor="var(--primary-webtoon)"
      />

      {/* 바이어 섹션 */}
      <section className="relative py-20 md:py-24">
        <div className="absolute inset-0 -z-10 opacity-5">
          <div
            className="absolute right-[10%] top-[20%] h-[400px] w-[400px] rounded-full blur-3xl"
            style={{ background: "var(--holographic-blue)" }}
          />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16">
              <h2 className="mb-4 text-4xl font-black md:text-5xl">참여 바이어</h2>
              <p className="text-xl text-muted-foreground">웹툰 플랫폼 및 제작사가 여러분의 작품을 기다립니다</p>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">데이터를 불러오는 중입니다...</p>
              </div>
            ) : buyers.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">등록된 바이어가 없습니다.</p>
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {buyers.map((buyer) => (
                  <Card
                    key={buyer.id}
                    className="p-8 transition-all hover:-translate-y-1 hover:shadow-xl cursor-pointer"
                    onClick={() => setSelectedBuyer(buyer)}
                  >
                    <div className="mb-6">
                      <div className="mb-4 inline-block rounded-full bg-primary-webtoon/15 px-4 py-2 text-sm font-bold text-primary-webtoon">
                        {buyer.category}
                      </div>
                      <h3 className="mb-3 text-2xl font-black">{buyer.name}</h3>
                      <div className="text-base font-medium text-muted-foreground">관심 장르: {buyer.focus}</div>
                    </div>
                    <p className="text-base leading-relaxed">{buyer.description}</p>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 참여 작가 섹션 - Using CompanyGrid with filtering */}
      <section className="relative bg-muted/30 py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16">
              <h2 className="mb-4 text-4xl font-black md:text-5xl">참여 작가 및 스튜디오</h2>
              <p className="text-xl text-muted-foreground">경남의 재능있는 웹툰 작가들을 만나보세요</p>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">데이터를 불러오는 중입니다...</p>
              </div>
            ) : companies.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">등록된 작가가 없습니다.</p>
              </div>
            ) : (
              <CompanyGrid companies={companies} onCompanyClick={setSelectedCompany} />
            )}
          </div>
        </div>
      </section>

      {/* 매칭 타임테이블 섹션 - Added MatchingTimetable */}
      {matchingSchedules.length > 0 && (
        <section className="relative py-20 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-6xl">
              <div className="mb-16">
                <h2 className="mb-4 text-4xl font-black md:text-5xl">매칭 타임테이블</h2>
                <p className="text-xl text-muted-foreground">확정된 매칭 일정</p>
              </div>

              <MatchingTimetable schedules={matchingSchedules} matchingType="buyer_webtoon" />
            </div>
          </div>
        </section>
      )}

      <EventInfo />

      {/* 모달 */}
      {selectedCompany && (
        <CompanyDetailModal
          company={selectedCompany}
          open={!!selectedCompany}
          onOpenChange={(open) => !open && setSelectedCompany(null)}
        />
      )}
      {selectedBuyer && (
        <BuyerDetailModal
          buyer={selectedBuyer}
          open={!!selectedBuyer}
          onOpenChange={(open) => !open && setSelectedBuyer(null)}
        />
      )}
    </main>
  )
}
