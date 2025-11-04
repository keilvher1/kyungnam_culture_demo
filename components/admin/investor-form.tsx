"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Investor } from "@/lib/types/database"
import { createInvestor, updateInvestor } from "@/lib/actions/investors"

export function InvestorForm({ investor }: { investor?: Investor }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      investment_focus: formData.get("investment_focus") as string,
      investment_range: formData.get("investment_range") as string,
      location: formData.get("location") as string,
      website: formData.get("website") as string,
      contact_email: formData.get("contact_email") as string,
      contact_phone: formData.get("contact_phone") as string,
    }

    try {
      if (investor) {
        await updateInvestor(investor.id, data)
        alert("수정이 완료되었습니다")
      } else {
        await createInvestor(data)
        alert("추가가 완료되었습니다")
      }
      router.push("/admin/investors")
      router.refresh()
    } catch (error) {
      alert("저장 중 오류가 발생했습니다.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">투자사명 *</Label>
        <Input id="name" name="name" defaultValue={investor?.name} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">소개</Label>
        <Textarea id="description" name="description" defaultValue={investor?.description || ""} rows={4} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="investment_focus">투자 분야</Label>
          <Input id="investment_focus" name="investment_focus" defaultValue={investor?.investment_focus || ""} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="investment_range">투자 규모</Label>
          <Input id="investment_range" name="investment_range" defaultValue={investor?.investment_range || ""} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">지역</Label>
        <Input id="location" name="location" defaultValue={investor?.location || ""} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="website">웹사이트</Label>
        <Input id="website" name="website" type="url" defaultValue={investor?.website || ""} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contact_email">이메일</Label>
          <Input id="contact_email" name="contact_email" type="email" defaultValue={investor?.contact_email || ""} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact_phone">전화번호</Label>
          <Input id="contact_phone" name="contact_phone" type="tel" defaultValue={investor?.contact_phone || ""} />
        </div>
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={isSubmitting} className="flex-1">
          {isSubmitting ? "저장 중..." : investor ? "수정하기" : "추가하기"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()} className="flex-1">
          취소
        </Button>
      </div>
    </form>
  )
}
