import { getBuyer } from "@/lib/actions/buyers"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { BuyerForm } from "@/components/admin/buyer-form"
import { notFound } from "next/navigation"

export default async function EditBuyerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  try {
    const buyer = await getBuyer(id)

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
              <CardTitle>바이어 수정</CardTitle>
            </CardHeader>
            <CardContent>
              <BuyerForm buyer={buyer} />
            </CardContent>
          </Card>
        </div>
      </div>
    )
  } catch (error) {
    notFound()
  }
}
