"use client"

import type { Investor } from "@/lib/types/database"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import { deleteInvestor } from "@/lib/actions/investors"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export function InvestorList({ investors }: { investors: Investor[] }) {
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const { toast } = useToast()

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`"${name}" 투자사를 삭제하시겠습니까?`)) return

    setIsDeleting(id)
    try {
      await deleteInvestor(id)
      toast({
        title: "삭제되었습니다",
        description: `${name} 투자사가 삭제되었습니다.`,
      })
    } catch (error) {
      toast({
        title: "오류",
        description: "삭제 중 오류가 발생했습니다.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(null)
    }
  }

  if (investors.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">등록된 투자사가 없습니다.</p>
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>투자사명</TableHead>
          <TableHead>투자 분야</TableHead>
          <TableHead>투자 규모</TableHead>
          <TableHead>지역</TableHead>
          <TableHead className="text-right">작업</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {investors.map((investor) => (
          <TableRow key={investor.id}>
            <TableCell className="font-medium">{investor.name}</TableCell>
            <TableCell>{investor.investment_focus || "-"}</TableCell>
            <TableCell>{investor.investment_size || "-"}</TableCell>
            <TableCell>{investor.location || "-"}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Link href={`/admin/investors/${investor.id}`}>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(investor.id, investor.name)}
                  disabled={isDeleting === investor.id}
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
