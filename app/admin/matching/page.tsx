import { getMatchingSchedule } from "@/lib/actions/matching"
import { getCompanies } from "@/lib/actions/companies"
import { getInvestors } from "@/lib/actions/investors"
import { getBuyers } from "@/lib/actions/buyers"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Plus } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MatchingScheduleList } from "@/components/admin/matching-schedule-list"

export default async function MatchingAdminPage() {
  const [investmentSchedules, webtoonSchedules, otherSchedules, companies, investors, buyers] = await Promise.all([
    getMatchingSchedule("investment"),
    getMatchingSchedule("buyer_webtoon"),
    getMatchingSchedule("buyer_other"),
    getCompanies(),
    getInvestors(),
    getBuyers(),
  ])

  return (
    <div className="min-h-screen bg-gradient-to-br from-coral via-coral/90 to-coral-dark p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link href="/admin" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4">
              <ArrowLeft className="h-4 w-4" />
              관리자 대시보드로 돌아가기
            </Link>
            <h1 className="text-4xl font-bold text-white mb-2">매칭 일정 관리</h1>
            <p className="text-white/80">10개 테이블별 매칭 타임테이블</p>
          </div>
        </div>

        <Tabs defaultValue="investment" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/10">
            <TabsTrigger value="investment">투자 매칭</TabsTrigger>
            <TabsTrigger value="webtoon">바이어 매칭 (웹툰)</TabsTrigger>
            <TabsTrigger value="other">바이어 매칭 (기타)</TabsTrigger>
          </TabsList>

          <TabsContent value="investment">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>투자 매칭 일정</CardTitle>
                  <Link href="/admin/matching/new?type=investment">
                    <Button className="gap-2">
                      <Plus className="h-4 w-4" />새 일정 추가
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <MatchingScheduleList
                  schedules={investmentSchedules}
                  companies={companies}
                  partners={investors}
                  partnerType="investor"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="webtoon">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>바이어 매칭 (웹툰) 일정</CardTitle>
                  <Link href="/admin/matching/new?type=buyer_webtoon">
                    <Button className="gap-2">
                      <Plus className="h-4 w-4" />새 일정 추가
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <MatchingScheduleList
                  schedules={webtoonSchedules}
                  companies={companies}
                  partners={buyers.filter((b) => b.buyer_type === "webtoon")}
                  partnerType="buyer"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="other">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>바이어 매칭 (기타) 일정</CardTitle>
                  <Link href="/admin/matching/new?type=buyer_other">
                    <Button className="gap-2">
                      <Plus className="h-4 w-4" />새 일정 추가
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <MatchingScheduleList
                  schedules={otherSchedules}
                  companies={companies}
                  partners={buyers.filter((b) => b.buyer_type === "other")}
                  partnerType="buyer"
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
