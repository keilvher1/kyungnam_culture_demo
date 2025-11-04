import { getBuyers } from "@/lib/actions/buyers"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Plus, ArrowLeft } from "lucide-react"
import { BuyerList } from "@/components/admin/buyer-list"

export default async function BuyersPage() {
  const buyers = await getBuyers()

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
            <h1 className="text-4xl font-bold text-white mb-2">바이어 관리</h1>
            <p className="text-white/80">바이어매칭에 참여하는 바이어 정보를 관리합니다</p>
          </div>
          <Link href="/admin/create-buyer">
            <Button size="lg" className="bg-accent hover:bg-accent/90">
              <Plus className="mr-2 h-5 w-5" />
              바이어 추가
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>바이어 목록 ({buyers.length}개)</CardTitle>
          </CardHeader>
          <CardContent>
            <BuyerList buyers={buyers} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
