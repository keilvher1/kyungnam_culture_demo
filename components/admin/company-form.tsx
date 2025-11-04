"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Company } from "@/lib/types/database"
import { createCompany, updateCompany } from "@/lib/actions/companies"
import { useRouter } from "next/navigation"

interface CompanyFormProps {
  company?: Company
  mode: "create" | "edit"
}

export function CompanyForm({ company, mode }: CompanyFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: company?.name || "",
    logo_url: company?.logo_url || "",
    website: company?.website || "",
    description: company?.description || "",
    industry: company?.industry || "",
    company_size: company?.company_size || "",
    location: company?.location || "",
    founded_year: company?.founded_year || "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const data = {
        ...formData,
        founded_year: formData.founded_year ? Number.parseInt(formData.founded_year as string) : null,
      }

      if (mode === "create") {
        await createCompany(data as any)
        alert("추가가 완료되었습니다")
      } else if (company) {
        await updateCompany(company.id, data as any)
        alert("수정이 완료되었습니다")
      }

      router.push("/admin/companies")
      router.refresh()
    } catch (error) {
      alert("저장 중 오류가 발생했습니다.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>{mode === "create" ? "새 기업 추가" : "기업 정보 수정"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">기업명 *</Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="industry">산업</Label>
              <Input
                id="industry"
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company_size">기업 규모</Label>
              <Input
                id="company_size"
                placeholder="예: 스타트업, 중소기업, 중견기업"
                value={formData.company_size}
                onChange={(e) => setFormData({ ...formData, company_size: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">지역</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="founded_year">설립연도</Label>
              <Input
                id="founded_year"
                type="number"
                value={formData.founded_year}
                onChange={(e) => setFormData({ ...formData, founded_year: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">웹사이트</Label>
              <Input
                id="website"
                type="url"
                placeholder="https://"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="logo_url">로고 URL</Label>
            <Input
              id="logo_url"
              type="url"
              placeholder="https://"
              value={formData.logo_url}
              onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">기업 소개</Label>
            <Textarea
              id="description"
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "저장 중..." : mode === "create" ? "추가하기" : "수정하기"}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>
              취소
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
