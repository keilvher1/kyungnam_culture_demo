"use client"

import { useState, useMemo } from "react"
import type { CompanyWithDetails } from "@/lib/types/database"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Building2, ExternalLink } from "lucide-react"

interface CompanyGridProps {
  companies: CompanyWithDetails[]
  onCompanyClick: (company: CompanyWithDetails) => void
}

export function CompanyGrid({ companies, onCompanyClick }: CompanyGridProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [industryFilter, setIndustryFilter] = useState<string>("all")
  const [sizeFilter, setSizeFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("name")

  // Get unique industries and sizes for filters
  const industries = useMemo(() => {
    const unique = new Set(companies.map((c) => c.industry).filter(Boolean))
    return Array.from(unique).sort()
  }, [companies])

  const sizes = useMemo(() => {
    const unique = new Set(companies.map((c) => c.company_size).filter(Boolean))
    return Array.from(unique).sort()
  }, [companies])

  // Filter and sort companies
  const filteredCompanies = useMemo(() => {
    const filtered = companies.filter((company) => {
      const matchesSearch =
        searchTerm === "" ||
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.description?.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesIndustry = industryFilter === "all" || company.industry === industryFilter

      const matchesSize = sizeFilter === "all" || company.company_size === sizeFilter

      return matchesSearch && matchesIndustry && matchesSize
    })

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "industry":
          return (a.industry || "").localeCompare(b.industry || "")
        case "newest":
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        default:
          return 0
      }
    })

    return filtered
  }, [companies, searchTerm, industryFilter, sizeFilter, sortBy])

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="bg-white/95 backdrop-blur">
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="기업명 또는 설명 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={industryFilter} onValueChange={setIndustryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="산업 분야" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체 산업</SelectItem>
                {industries.map((industry) => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sizeFilter} onValueChange={setSizeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="기업 규모" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체 규모</SelectItem>
                {sizes.map((size) => (
                  <SelectItem key={size} value={size}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="정렬" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">이름순</SelectItem>
                <SelectItem value="industry">산업순</SelectItem>
                <SelectItem value="newest">최신순</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
            <span>
              총 {filteredCompanies.length}개 기업{" "}
              {filteredCompanies.length !== companies.length && `(${companies.length}개 중)`}
            </span>
            {(searchTerm || industryFilter !== "all" || sizeFilter !== "all") && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchTerm("")
                  setIndustryFilter("all")
                  setSizeFilter("all")
                }}
              >
                필터 초기화
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Company Grid */}
      {filteredCompanies.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Building2 className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">검색 결과가 없습니다.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCompanies.map((company) => (
            <Card
              key={company.id}
              className="hover:shadow-xl transition-all cursor-pointer group border-2 hover:border-accent"
              onClick={() => onCompanyClick(company)}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="group-hover:text-accent transition-colors">{company.name}</CardTitle>
                    {company.industry && <p className="text-sm text-muted-foreground mt-1">{company.industry}</p>}
                  </div>
                  {company.logo_url && (
                    <img
                      src={company.logo_url || "/placeholder.svg"}
                      alt={company.name}
                      className="h-12 w-12 object-contain rounded"
                    />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                  {company.description || "기업 소개가 없습니다."}
                </p>
                <div className="flex flex-wrap gap-2">
                  {company.company_size && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/10 text-accent">
                      {company.company_size}
                    </span>
                  )}
                  {company.location && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {company.location}
                    </span>
                  )}
                </div>
                {company.website && (
                  <Button variant="ghost" size="sm" className="mt-4 w-full gap-2" asChild>
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      웹사이트 방문
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
