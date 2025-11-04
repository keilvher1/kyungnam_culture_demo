import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Building2, Users, ShoppingCart, Lightbulb, Calendar } from "lucide-react"

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-coral via-coral/90 to-coral-dark p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">관리자 대시보드</h1>
          <p className="text-white/80">2025 경남 콘텐츠페어 콘텐츠 관리</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Link href="/admin/companies">
            <Card className="hover:shadow-xl transition-shadow cursor-pointer border-2 hover:border-accent">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <Building2 className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <CardTitle>참여기업 관리</CardTitle>
                    <CardDescription>기업 정보 추가/수정/삭제</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  투자매칭 및 바이어매칭에 참여하는 기업들의 정보를 관리합니다.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/investors">
            <Card className="hover:shadow-xl transition-shadow cursor-pointer border-2 hover:border-accent">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <Users className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <CardTitle>투자사 관리</CardTitle>
                    <CardDescription>투자사 정보 추가/수정/삭제</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">투자매칭에 참여하는 투자사들의 정보를 관리합니다.</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/buyers">
            <Card className="hover:shadow-xl transition-shadow cursor-pointer border-2 hover:border-accent">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <ShoppingCart className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <CardTitle>바이어 관리</CardTitle>
                    <CardDescription>바이어 정보 추가/수정/삭제</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">바이어매칭에 참여하는 바이어들의 정보를 관리합니다.</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/matching">
            <Card className="hover:shadow-xl transition-shadow cursor-pointer border-2 hover:border-accent">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <Calendar className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <CardTitle>매칭 일정 관리</CardTitle>
                    <CardDescription>매칭 타임테이블 관리</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">10개 테이블별 매칭 일정을 관리합니다.</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/open-innovation">
            <Card className="hover:shadow-xl transition-shadow cursor-pointer border-2 hover:border-accent">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <Lightbulb className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <CardTitle>오픈이노베이션 관리</CardTitle>
                    <CardDescription>과제 정보 추가/수정/삭제</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">중견/대기업의 오픈이노베이션 과제를 관리합니다.</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/">
            <Card className="hover:shadow-xl transition-shadow cursor-pointer border-2 hover:border-primary">
              <CardHeader>
                <CardTitle>홈페이지로 돌아가기</CardTitle>
                <CardDescription>공개 페이지 보기</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full bg-transparent">
                  홈페이지 보기
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
