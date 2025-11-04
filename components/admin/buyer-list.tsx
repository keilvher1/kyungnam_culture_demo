"use client"

import type { Buyer } from "@/lib/types/database"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import { deleteBuyer } from "@/lib/actions/buyers"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export function BuyerList({ buyers }: { buyers: Buyer[] }) {
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const { toast } = useToast()

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`"${name}" 바이어를 삭제하시겠습니까?`)) return

    setIsDeleting(id)
    try {
      await deleteBuyer(id)
      toast({
        title: "삭제되었습니다",
        description: `${name} 바이어가 삭제되었습니다.`,
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

  if (buyers.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">등록된 바이어가 없습니다.</p>
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>바이어명</TableHead>
          <TableHead>유형</TableHead>
          <TableHead>관심 분야</TableHead>
          <TableHead>지역</TableHead>
          <TableHead className="text-right">작업</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {buyers.map((buyer) => (
          <TableRow key={buyer.id}>
            <TableCell className="font-medium">{buyer.name}</TableCell>
            <TableCell>
              <Badge variant={buyer.buyer_type === "webtoon" ? "default" : "secondary"}>
                {buyer.buyer_type === "webtoon" ? "웹툰" : "기타"}
              </Badge>
            </TableCell>
            <TableCell>{buyer.interest_area || "-"}</TableCell>
            <TableCell>{buyer.location || "-"}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Link href={`/admin/buyers/${buyer.id}`}>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(buyer.id, buyer.name)}
                  disabled={isDeleting === buyer.id}
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
