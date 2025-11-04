import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function CreateOpenInnovationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-coral via-coral/90 to-coral-dark p-8">
      <div className="mx-auto max-w-4xl">
        <Link href="/admin/open-innovation">
          <Button variant="ghost" className="mb-4 text-white hover:text-white/80">
            <ArrowLeft className="mr-2 h-4 w-4" />
            목록으로 돌아가기
          </Button>
        </Link>

        <Card>
          <CardHeader>
            <CardTitle>오픈이노베이션 과제 추가</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">오픈이노베이션 폼 구현 예정</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
