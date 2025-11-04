"use client"

import { useState } from "react"
import type { MatchingScheduleWithDetails, CompanyWithDetails, Investor, Buyer } from "@/lib/types/database"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin } from "lucide-react"
import { CompanyDetailModal } from "./company-detail-modal"
import { InvestorDetailModal } from "./investor-detail-modal"
import { BuyerDetailModal } from "./buyer-detail-modal"

interface MatchingTimetableProps {
  schedules: MatchingScheduleWithDetails[]
  matchingType: string
}

export function MatchingTimetable({ schedules, matchingType }: MatchingTimetableProps) {
  const [selectedCompany, setSelectedCompany] = useState<CompanyWithDetails | null>(null)
  const [selectedInvestor, setSelectedInvestor] = useState<Investor | null>(null)
  const [selectedBuyer, setSelectedBuyer] = useState<Buyer | null>(null)

  // Group schedules by table number
  const tableGroups = schedules.reduce(
    (acc, schedule) => {
      if (!acc[schedule.table_number]) {
        acc[schedule.table_number] = []
      }
      acc[schedule.table_number].push(schedule)
      return acc
    },
    {} as Record<number, MatchingScheduleWithDetails[]>,
  )

  const handleCompanyClick = (company: any) => {
    setSelectedCompany(company)
  }

  const handlePartnerClick = (schedule: MatchingScheduleWithDetails) => {
    if (schedule.partner_type === "investor" && schedule.investor) {
      setSelectedInvestor(schedule.investor)
    } else if (schedule.partner_type === "buyer" && schedule.buyer) {
      setSelectedBuyer(schedule.buyer)
    }
  }

  if (schedules.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">아직 매칭 일정이 등록되지 않았습니다.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <div className="space-y-6">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((tableNumber) => {
          const tableSchedules = tableGroups[tableNumber] || []

          return (
            <Card key={tableNumber} className="overflow-hidden">
              <CardHeader className="bg-accent/10">
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  테이블 {tableNumber}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {tableSchedules.length === 0 ? (
                  <div className="p-6 text-center text-muted-foreground">매칭 일정이 없습니다.</div>
                ) : (
                  <div className="divide-y">
                    {tableSchedules.map((schedule) => (
                      <div key={schedule.id} className="p-4 hover:bg-accent/5 transition-colors">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              <span>{schedule.time_slot}</span>
                              <Badge variant="outline" className="ml-2">
                                {schedule.date}
                              </Badge>
                              <Badge
                                variant={
                                  schedule.status === "completed"
                                    ? "default"
                                    : schedule.status === "cancelled"
                                      ? "destructive"
                                      : "secondary"
                                }
                              >
                                {schedule.status === "scheduled"
                                  ? "예정"
                                  : schedule.status === "completed"
                                    ? "완료"
                                    : "취소"}
                              </Badge>
                            </div>

                            <div className="grid gap-3 md:grid-cols-2">
                              {schedule.company && (
                                <button
                                  onClick={() => handleCompanyClick(schedule.company)}
                                  className="text-left p-3 border rounded-lg hover:border-accent hover:bg-accent/5 transition-colors"
                                >
                                  <div className="font-medium text-sm mb-1">참여기업</div>
                                  <div className="font-semibold">{schedule.company.name}</div>
                                  {schedule.company.industry && (
                                    <div className="text-xs text-muted-foreground mt-1">
                                      {schedule.company.industry}
                                    </div>
                                  )}
                                </button>
                              )}

                              {(schedule.investor || schedule.buyer) && (
                                <button
                                  onClick={() => handlePartnerClick(schedule)}
                                  className="text-left p-3 border rounded-lg hover:border-accent hover:bg-accent/5 transition-colors"
                                >
                                  <div className="font-medium text-sm mb-1">
                                    {schedule.partner_type === "investor" ? "투자사" : "바이어"}
                                  </div>
                                  <div className="font-semibold">{schedule.investor?.name || schedule.buyer?.name}</div>
                                  {schedule.investor?.investment_focus && (
                                    <div className="text-xs text-muted-foreground mt-1">
                                      {schedule.investor.investment_focus}
                                    </div>
                                  )}
                                  {schedule.buyer?.interest_areas && (
                                    <div className="text-xs text-muted-foreground mt-1">
                                      {schedule.buyer.interest_areas}
                                    </div>
                                  )}
                                </button>
                              )}
                            </div>

                            {schedule.notes && (
                              <div className="text-sm text-muted-foreground mt-2 p-2 bg-muted/50 rounded">
                                {schedule.notes}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      <CompanyDetailModal
        company={selectedCompany}
        open={!!selectedCompany}
        onOpenChange={(open) => !open && setSelectedCompany(null)}
      />

      <InvestorDetailModal
        investor={selectedInvestor}
        open={!!selectedInvestor}
        onOpenChange={(open) => !open && setSelectedInvestor(null)}
      />

      <BuyerDetailModal
        buyer={selectedBuyer}
        open={!!selectedBuyer}
        onOpenChange={(open) => !open && setSelectedBuyer(null)}
      />
    </>
  )
}
