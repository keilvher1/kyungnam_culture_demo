"use client"

import type { Buyer } from "@/lib/types/database"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, ShoppingCart, Target, Building2 } from "lucide-react"

interface BuyerDetailModalProps {
  buyer: Buyer | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function BuyerDetailModal({ buyer, open, onOpenChange }: BuyerDetailModalProps) {
  if (!buyer) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start gap-4">
            {buyer.logo_url && (
              <img
                src={buyer.logo_url || "/placeholder.svg"}
                alt={buyer.name}
                className="h-16 w-16 object-contain rounded"
              />
            )}
            <div className="flex-1">
              <DialogTitle className="text-2xl mb-2">{buyer.name}</DialogTitle>
              <div className="flex flex-wrap gap-2">
                {buyer.buyer_type && (
                  <Badge variant="secondary">{buyer.buyer_type === "webtoon" ? "웹툰" : "기타 분야"}</Badge>
                )}
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              바이어 소개
            </h3>
            <p className="text-muted-foreground">{buyer.description || "바이어 소개가 없습니다."}</p>
          </div>

          {buyer.interest_areas && (
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Target className="h-4 w-4" />
                관심 분야
              </h3>
              <p className="text-muted-foreground">{buyer.interest_areas}</p>
            </div>
          )}

          {buyer.company_info && (
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                회사 정보
              </h3>
              <p className="text-muted-foreground whitespace-pre-wrap">{buyer.company_info}</p>
            </div>
          )}

          {buyer.website && (
            <Button className="w-full gap-2" asChild>
              <a href={buyer.website} target="_blank" rel="noopener noreferrer">
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
