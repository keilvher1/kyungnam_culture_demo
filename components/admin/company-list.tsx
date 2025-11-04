"use client"

import type { Company } from "@/lib/types/database"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import { deleteCompany } from "@/lib/actions/companies"
import { useState } from "react"

export function CompanyList({ companies }: { companies: Company[] }) {
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`"${name}" 기업을 삭제하시겠습니까?`)) return

    setIsDeleting(id)
    try {
      await deleteCompany(id)
    } catch (error) {
      alert("삭제 중 오류가 발생했습니다.")
    } finally {
      setIsDeleting(null)
    }
  }

  if (companies.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">등록된 기업이 없습니다.</p>
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>기업명</TableHead>
          <TableHead>산업</TableHead>
          <TableHead>규모</TableHead>
          <TableHead>지역</TableHead>
          <TableHead className="text-right">작업</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {companies.map((company) => (
          <TableRow key={company.id}>
            <TableCell className="font-medium">{company.name}</TableCell>
            <TableCell>{company.industry || "-"}</TableCell>
            <TableCell>{company.company_size || "-"}</TableCell>
            <TableCell>{company.location || "-"}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Link href={`/admin/companies/${company.id}`}>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(company.id, company.name)}
                  disabled={isDeleting === company.id}
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
