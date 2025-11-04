import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Plus, ArrowLeft } from "lucide-react"

export default async function OpenInnovationPage() {
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
            <h1 className="text-4xl font-bold text-white mb-2">오픈이노베이션 관리</h1>
            <p className="text-white/80">중견/대기업의 오픈이노베이션 과제를 관리합니다</p>
          </div>
          <Link href="/admin/create-open-innovation">
            <Button size="lg" className="bg-accent hover:bg-accent/90">
              <Plus className="mr-2 h-5 w-5" />
              과제 추가
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>오픈이노베이션 과제 목록</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <p className="text-muted-foreground">등록된 과제가 없습니다.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
