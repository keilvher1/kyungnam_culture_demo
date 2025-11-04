"use client"

import type { MatchingScheduleWithDetails, Company, Investor, Buyer } from "@/lib/types/database"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import { deleteMatchingSchedule } from "@/lib/actions/matching"
import { useState } from "react"

interface MatchingScheduleListProps {
  schedules: MatchingScheduleWithDetails[]
  companies: Company[]
  partners: (Investor | Buyer)[]
  partnerType: "investor" | "buyer"
}

export function MatchingScheduleList({ schedules, companies, partners, partnerType }: MatchingScheduleListProps) {
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (!confirm("이 매칭 일정을 삭제하시겠습니까?")) return

    setIsDeleting(id)
    try {
      await deleteMatchingSchedule(id)
    } catch (error) {
      alert("삭제 중 오류가 발생했습니다.")
    } finally {
      setIsDeleting(null)
    }
  }

  if (schedules.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">등록된 매칭 일정이 없습니다.</p>
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>테이블</TableHead>
          <TableHead>날짜</TableHead>
          <TableHead>시간</TableHead>
          <TableHead>기업</TableHead>
          <TableHead>{partnerType === "investor" ? "투자사" : "바이어"}</TableHead>
          <TableHead>상태</TableHead>
          <TableHead className="text-right">작업</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {schedules.map((schedule) => (
          <TableRow key={schedule.id}>
            <TableCell className="font-medium">테이블 {schedule.table_number}</TableCell>
            <TableCell>{schedule.date}</TableCell>
            <TableCell>{schedule.time_slot}</TableCell>
            <TableCell>{schedule.company?.name || "-"}</TableCell>
            <TableCell>{schedule.investor?.name || schedule.buyer?.name || "-"}</TableCell>
            <TableCell>
              <Badge
                variant={
                  schedule.status === "completed"
                    ? "default"
                    : schedule.status === "cancelled"
                      ? "destructive"
                      : "secondary"
                }
              >
                {schedule.status === "scheduled" ? "예정" : schedule.status === "completed" ? "완료" : "취소"}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Link href={`/admin/matching/${schedule.id}`}>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(schedule.id)}
                  disabled={isDeleting === schedule.id}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
