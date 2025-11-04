import { CompanyForm } from "@/components/admin/company-form"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NewCompanyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-coral via-coral/90 to-coral-dark p-8">
      <div className="mx-auto max-w-4xl">
        <Link href="/admin/companies" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8">
          <ArrowLeft className="h-4 w-4" />
          기업 목록으로 돌아가기
        </Link>

        <CompanyForm mode="create" />
      </div>
    </div>
  )
}
