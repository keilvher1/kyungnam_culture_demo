"use client"

import { useState, useMemo } from "react"
import type { Investor } from "@/lib/types/database"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Users, ExternalLink } from "lucide-react"

interface InvestorGridProps {
  investors: Investor[]
  onInvestorClick: (investor: Investor) => void
}

export function InvestorGrid({ investors, onInvestorClick }: InvestorGridProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [focusFilter, setFocusFilter] = useState<string>("all")
  const [stageFilter, setStageFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("name")

  // Get unique focuses and stages for filters
  const focuses = useMemo(() => {
    const unique = new Set(investors.map((i) => i.investment_focus).filter(Boolean))
    return Array.from(unique).sort()
  }, [investors])

  const stages = useMemo(() => {
    const unique = new Set(investors.map((i) => i.investment_stage).filter(Boolean))
    return Array.from(unique).sort()
  }, [investors])

  // Filter and sort investors
  const filteredInvestors = useMemo(() => {
    const filtered = investors.filter((investor) => {
      const matchesSearch =
        searchTerm === "" ||
        investor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        investor.description?.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesFocus = focusFilter === "all" || investor.investment_focus === focusFilter

      const matchesStage = stageFilter === "all" || investor.investment_stage === stageFilter

      return matchesSearch && matchesFocus && matchesStage
    })

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "focus":
          return (a.investment_focus || "").localeCompare(b.investment_focus || "")
        case "newest":
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        default:
          return 0
      }
    })

    return filtered
  }, [investors, searchTerm, focusFilter, stageFilter, sortBy])

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="bg-white/95 backdrop-blur">
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="투자사명 또는 설명 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={focusFilter} onValueChange={setFocusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="투자 분야" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체 분야</SelectItem>
                {focuses.map((focus) => (
                  <SelectItem key={focus} value={focus}>
                    {focus}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={stageFilter} onValueChange={setStageFilter}>
              <SelectTrigger>
                <SelectValue placeholder="투자 단계" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체 단계</SelectItem>
                {stages.map((stage) => (
                  <SelectItem key={stage} value={stage}>
                    {stage}
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
                <SelectItem value="focus">분야순</SelectItem>
                <SelectItem value="newest">최신순</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
            <span>
              총 {filteredInvestors.length}개 투자사{" "}
              {filteredInvestors.length !== investors.length && `(${investors.length}개 중)`}
            </span>
            {(searchTerm || focusFilter !== "all" || stageFilter !== "all") && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchTerm("")
                  setFocusFilter("all")
                  setStageFilter("all")
                }}
              >
                필터 초기화
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Investor Grid */}
      {filteredInvestors.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">검색 결과가 없습니다.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredInvestors.map((investor) => (
            <Card
              key={investor.id}
              className="hover:shadow-xl transition-all cursor-pointer group border-2 hover:border-accent"
              onClick={() => onInvestorClick(investor)}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="group-hover:text-accent transition-colors">{investor.name}</CardTitle>
                    {investor.investment_focus && (
                      <p className="text-sm text-muted-foreground mt-1">{investor.investment_focus}</p>
                    )}
                  </div>
                  {investor.logo_url && (
                    <img
                      src={investor.logo_url || "/placeholder.svg"}
                      alt={investor.name}
                      className="h-12 w-12 object-contain rounded"
                    />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                  {investor.description || "투자사 소개가 없습니다."}
                </p>
                <div className="flex flex-wrap gap-2">
                  {investor.investment_stage && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/10 text-accent">
                      {investor.investment_stage}
                    </span>
                  )}
                  {investor.investment_range && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {investor.investment_range}
                    </span>
                  )}
                </div>
                {investor.website && (
                  <Button variant="ghost" size="sm" className="mt-4 w-full gap-2" asChild>
                    <a
                      href={investor.website}
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
