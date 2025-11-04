import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { InvestorForm } from "@/components/admin/investor-form"

export default function CreateInvestorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-coral via-coral/90 to-coral-dark p-8">
      <div className="mx-auto max-w-4xl">
        <Link href="/admin/investors">
          <Button variant="ghost" className="mb-4 text-white hover:text-white/80">
            <ArrowLeft className="mr-2 h-4 w-4" />
            목록으로 돌아가기
          </Button>
        </Link>

        <Card>
          <CardHeader>
            <CardTitle>투자사 추가</CardTitle>
          </CardHeader>
          <CardContent>
            <InvestorForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
