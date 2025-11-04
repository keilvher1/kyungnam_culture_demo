"use client"

import { useState, useEffect } from "react"
import { HeroSection } from "@/components/hero-section"
import { EventInfo } from "@/components/event-info"
import { Card } from "@/components/ui/card"
import { CompanyDetailModal } from "@/components/company-detail-modal"
import { InvestorDetailModal } from "@/components/investor-detail-modal"
import type { CompanyWithDetails, Investor } from "@/lib/types/database"
import { getCompanies } from "@/lib/actions/companies"
import { getInvestors } from "@/lib/actions/investors"
import { getMatchingSchedules } from "@/lib/actions/matching"
import { CompanyGrid } from "@/components/company-grid"
import { MatchingTimetable } from "@/components/matching-timetable"

export default function InvestmentMatchingPage() {
  const [companies, setCompanies] = useState<CompanyWithDetails[]>([])
  const [investors, setInvestors] = useState<Investor[]>([])
  const [selectedCompany, setSelectedCompany] = useState<CompanyWithDetails | null>(null)
  const [selectedInvestor, setSelectedInvestor] = useState<Investor | null>(null)
  const [matchingSchedules, setMatchingSchedules] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [companiesData, investorsData] = await Promise.all([getCompanies(), getInvestors()])
        setCompanies(companiesData)
        setInvestors(investorsData)
        const schedules = await getMatchingSchedules("investment")
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
        title="투자 매칭"
        subtitle="경남 콘텐츠 기업과 투자사를 연결하는 비즈니스 매칭 프로그램"
        accentColor="var(--primary-investment)"
      />

      {/* 투자사 섹션 */}
      <section className="relative py-20 md:py-24">
        <div className="absolute inset-0 -z-10 opacity-5">
          <div
            className="absolute right-[10%] top-[20%] h-[400px] w-[400px] rounded-full blur-3xl"
            style={{ background: "var(--holographic-peach)" }}
          />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16">
              <h2 className="mb-4 text-4xl font-black md:text-5xl">참여 투자사</h2>
              <p className="text-xl text-muted-foreground">
                콘텐츠 산업 전문 투자사들이 여러분의 비즈니스를 기다립니다
              </p>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">데이터를 불러오는 중입니다...</p>
              </div>
            ) : investors.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">등록된 투자사가 없습니다.</p>
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {investors.map((investor) => (
                  <Card
                    key={investor.id}
                    className="group p-8 transition-all hover:-translate-y-1 hover:shadow-xl cursor-pointer"
                    onClick={() => setSelectedInvestor(investor)}
                  >
                    <div className="mb-6">
                      <div className="mb-4 inline-block rounded-full bg-primary-investment/15 px-4 py-2 text-sm font-bold text-primary-investment">
                        {investor.category}
                      </div>
                      <h3 className="mb-3 text-2xl font-black">{investor.name}</h3>
                      <div className="text-base font-medium text-muted-foreground">
                        투자 분야: {investor.investment_range}
                      </div>
                    </div>
                    <p className="text-base leading-relaxed">{investor.description}</p>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 참여 기업 섹션 */}
      <section className="relative bg-muted/30 py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16">
              <h2 className="mb-4 text-4xl font-black md:text-5xl">참여 기업</h2>
              <p className="text-xl text-muted-foreground">투자 유치를 희망하는 경남 콘텐츠 기업들을 만나보세요</p>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">데이터를 불러오는 중입니다...</p>
              </div>
            ) : companies.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">등록된 기업이 없습니다.</p>
              </div>
            ) : (
              <CompanyGrid companies={companies} onCompanyClick={setSelectedCompany} />
            )}
          </div>
        </div>
      </section>

      {/* 매칭 타임테이블 섹션 */}
      {matchingSchedules.length > 0 && (
        <section className="relative py-20 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-6xl">
              <div className="mb-16">
                <h2 className="mb-4 text-4xl font-black md:text-5xl">매칭 타임테이블</h2>
                <p className="text-xl text-muted-foreground">확정된 매칭 일정</p>
              </div>

              <MatchingTimetable schedules={matchingSchedules} matchingType="investment" />
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
      {selectedInvestor && (
        <InvestorDetailModal
          investor={selectedInvestor}
          open={!!selectedInvestor}
          onOpenChange={(open) => !open && setSelectedInvestor(null)}
        />
      )}
    </main>
  )
}
