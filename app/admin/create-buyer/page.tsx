import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { BuyerForm } from "@/components/admin/buyer-form"

export default function CreateBuyerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-coral via-coral/90 to-coral-dark p-8">
      <div className="mx-auto max-w-4xl">
        <Link href="/admin/buyers">
          <Button variant="ghost" className="mb-4 text-white hover:text-white/80">
            <ArrowLeft className="mr-2 h-4 w-4" />
            목록으로 돌아가기
          </Button>
        </Link>

        <Card>
          <CardHeader>
            <CardTitle>바이어 추가</CardTitle>
          </CardHeader>
          <CardContent>
            <BuyerForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
