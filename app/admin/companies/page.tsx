import { getCompanies } from "@/lib/actions/companies"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Plus, ArrowLeft } from "lucide-react"
import { CompanyList } from "@/components/admin/company-list"

export default async function CompaniesAdminPage() {
  const companies = await getCompanies()

  return (
    <div className="min-h-screen bg-gradient-to-br from-coral via-coral/90 to-coral-dark p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link href="/admin" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4">
              <ArrowLeft className="h-4 w-4" />
              관리자 대시보드로 돌아가기
            </Link>
            <h1 className="text-4xl font-bold text-white mb-2">참여기업 관리</h1>
            <p className="text-white/80">총 {companies.length}개 기업</p>
          </div>
          <Link href="/admin/create-company">
            <Button size="lg" className="gap-2">
              <Plus className="h-5 w-5" />새 기업 추가
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>기업 목록</CardTitle>
          </CardHeader>
          <CardContent>
            <CompanyList companies={companies} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
