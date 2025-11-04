"use client"

import type { CompanyWithDetails } from "@/lib/types/database"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Building2, MapPin, Calendar, Users } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface CompanyDetailModalProps {
  company: CompanyWithDetails | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CompanyDetailModal({ company, open, onOpenChange }: CompanyDetailModalProps) {
  if (!company) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start gap-4">
            {company.logo_url && (
              <img
                src={company.logo_url || "/placeholder.svg"}
                alt={company.name}
                className="h-16 w-16 object-contain rounded"
              />
            )}
            <div className="flex-1">
              <DialogTitle className="text-2xl mb-2">{company.name}</DialogTitle>
              <div className="flex flex-wrap gap-2">
                {company.industry && <Badge variant="secondary">{company.industry}</Badge>}
                {company.company_size && <Badge variant="outline">{company.company_size}</Badge>}
                {company.location && (
                  <Badge variant="outline" className="gap-1">
                    <MapPin className="h-3 w-3" />
                    {company.location}
                  </Badge>
                )}
                {company.founded_year && (
                  <Badge variant="outline" className="gap-1">
                    <Calendar className="h-3 w-3" />
                    {company.founded_year}년 설립
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">개요</TabsTrigger>
            <TabsTrigger value="details">상세정보</TabsTrigger>
            <TabsTrigger value="media">미디어</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                기업 소개
              </h3>
              <p className="text-muted-foreground">{company.description || "기업 소개가 없습니다."}</p>
            </div>

            {company.details?.pitch && (
              <div>
                <h3 className="font-semibold mb-2">피칭 포인트</h3>
                <p className="text-muted-foreground">{company.details.pitch}</p>
              </div>
            )}

            {company.details?.highlights && company.details.highlights.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">주요 하이라이트</h3>
                <ul className="list-disc list-inside space-y-1">
                  {company.details.highlights.map((highlight, index) => (
                    <li key={index} className="text-muted-foreground">
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {company.website && (
              <Button className="w-full gap-2" asChild>
                <a href={company.website} target="_blank" rel="noopener noreferrer">
                  웹사이트 방문
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            )}
          </TabsContent>

          <TabsContent value="details" className="space-y-4">
            {company.details?.team_info && (
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Users className="h-4 w-4" />팀 정보
                </h3>
                <p className="text-muted-foreground whitespace-pre-wrap">{company.details.team_info}</p>
              </div>
            )}

            {company.details?.financials && (
              <div>
                <h3 className="font-semibold mb-2">재무 정보</h3>
                <p className="text-muted-foreground whitespace-pre-wrap">{company.details.financials}</p>
              </div>
            )}

            {company.details?.documents && company.details.documents.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">첨부 문서</h3>
                <div className="space-y-2">
                  {company.details.documents.map((doc, index) => (
                    <a
                      key={index}
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-3 border rounded-lg hover:bg-accent/10 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span className="text-sm">{doc.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="media" className="space-y-4">
            {company.details?.media_urls && company.details.media_urls.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {company.details.media_urls.map((url, index) => {
                  const isVideo = url.includes("youtube") || url.includes("vimeo") || url.endsWith(".mp4")
                  return (
                    <div key={index} className="border rounded-lg overflow-hidden">
                      {isVideo ? (
                        <video src={url} controls className="w-full aspect-video" />
                      ) : (
                        <img
                          src={url || "/placeholder.svg"}
                          alt={`Media ${index + 1}`}
                          className="w-full aspect-video object-cover"
                        />
                      )}
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">등록된 미디어가 없습니다.</div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
