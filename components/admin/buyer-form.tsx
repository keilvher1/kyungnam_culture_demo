"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Buyer } from "@/lib/types/database"
import { createBuyer, updateBuyer } from "@/lib/actions/buyers"

export function BuyerForm({ buyer }: { buyer?: Buyer }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [buyerType, setBuyerType] = useState<"webtoon" | "other">(buyer?.buyer_type || "webtoon")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name") as string,
      buyer_type: buyerType,
      description: formData.get("description") as string,
      interest_area: formData.get("interest_area") as string,
      location: formData.get("location") as string,
      website: formData.get("website") as string,
      contact_email: formData.get("contact_email") as string,
      contact_phone: formData.get("contact_phone") as string,
    }

    try {
      if (buyer) {
        await updateBuyer(buyer.id, data)
        alert("수정이 완료되었습니다")
      } else {
        await createBuyer(data)
        alert("추가가 완료되었습니다")
      }
      router.push("/admin/buyers")
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
        <Label htmlFor="name">바이어명 *</Label>
        <Input id="name" name="name" defaultValue={buyer?.name} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="buyer_type">바이어 유형 *</Label>
        <Select value={buyerType} onValueChange={(value) => setBuyerType(value as "webtoon" | "other")}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="webtoon">웹툰</SelectItem>
            <SelectItem value="other">기타</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">소개</Label>
        <Textarea id="description" name="description" defaultValue={buyer?.description || ""} rows={4} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="interest_area">관심 분야</Label>
        <Input id="interest_area" name="interest_area" defaultValue={buyer?.interest_area || ""} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">지역</Label>
        <Input id="location" name="location" defaultValue={buyer?.location || ""} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="website">웹사이트</Label>
        <Input id="website" name="website" type="url" defaultValue={buyer?.website || ""} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contact_email">이메일</Label>
          <Input id="contact_email" name="contact_email" type="email" defaultValue={buyer?.contact_email || ""} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact_phone">전화번호</Label>
          <Input id="contact_phone" name="contact_phone" type="tel" defaultValue={buyer?.contact_phone || ""} />
        </div>
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={isSubmitting} className="flex-1">
          {isSubmitting ? "저장 중..." : buyer ? "수정하기" : "추가하기"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()} className="flex-1">
          취소
        </Button>
      </div>
    </form>
  )
}
