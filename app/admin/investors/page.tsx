import { getInvestors } from "@/lib/actions/investors"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Plus, ArrowLeft } from "lucide-react"
import { InvestorList } from "@/components/admin/investor-list"

export default async function InvestorsPage() {
  const investors = await getInvestors()

  return (
    <div className="min-h-screen bg-gradient-to-br from-coral via-coral/90 to-coral-dark p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link href="/admin">
              <Button variant="ghost" className="mb-4 text-white hover:text-white/80">
                <ArrowLeft className="mr-2 h-4 w-4" />
                대시보드로 돌아가기
              </Button>
            </Link>
            <h1 className="text-4xl font-bold text-white mb-2">투자사 관리</h1>
            <p className="text-white/80">투자매칭에 참여하는 투자사 정보를 관리합니다</p>
          </div>
          <Link href="/admin/create-investor">
            <Button size="lg" className="bg-accent hover:bg-accent/90">
              <Plus className="mr-2 h-5 w-5" />
              투자사 추가
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>투자사 목록 ({investors.length}개)</CardTitle>
          </CardHeader>
          <CardContent>
            <InvestorList investors={investors} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
