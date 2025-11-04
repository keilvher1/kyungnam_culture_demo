"use client"

import type { Investor } from "@/lib/types/database"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, TrendingUp, Target, DollarSign, Briefcase } from "lucide-react"

interface InvestorDetailModalProps {
  investor: Investor | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function InvestorDetailModal({ investor, open, onOpenChange }: InvestorDetailModalProps) {
  if (!investor) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start gap-4">
            {investor.logo_url && (
              <img
                src={investor.logo_url || "/placeholder.svg"}
                alt={investor.name}
                className="h-16 w-16 object-contain rounded"
              />
            )}
            <div className="flex-1">
              <DialogTitle className="text-2xl mb-2">{investor.name}</DialogTitle>
              <div className="flex flex-wrap gap-2">
                {investor.investment_focus && <Badge variant="secondary">{investor.investment_focus}</Badge>}
                {investor.investment_stage && <Badge variant="outline">{investor.investment_stage}</Badge>}
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              투자사 소개
            </h3>
            <p className="text-muted-foreground">{investor.description || "투자사 소개가 없습니다."}</p>
          </div>

          {investor.investment_focus && (
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Target className="h-4 w-4" />
                투자 분야
              </h3>
              <p className="text-muted-foreground">{investor.investment_focus}</p>
            </div>
          )}

          {investor.investment_stage && (
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                투자 단계
              </h3>
              <p className="text-muted-foreground">{investor.investment_stage}</p>
            </div>
          )}

          {investor.investment_range && (
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                투자 규모
              </h3>
              <p className="text-muted-foreground">{investor.investment_range}</p>
            </div>
          )}

          {investor.portfolio_companies && (
            <div>
              <h3 className="font-semibold mb-2">포트폴리오</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">{investor.portfolio_companies}</p>
            </div>
          )}

          {investor.website && (
            <Button className="w-full gap-2" asChild>
              <a href={investor.website} target="_blank" rel="noopener noreferrer">
                웹사이트 방문
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
