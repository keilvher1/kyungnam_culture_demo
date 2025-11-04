export interface Company {
  id: string
  name: string
  logo_url: string | null
  website: string | null
  description: string | null
  industry: string | null
  company_size: string | null
  location: string | null
  founded_year: number | null
  created_at: string
  updated_at: string
}

export interface CompanyDetails {
  id: string
  company_id: string
  matching_type: "investment" | "buyer_webtoon" | "buyer_other"
  pitch: string | null
  highlights: string[] | null
  team_info: string | null
  financials: string | null
  media_urls: string[] | null
  documents: { name: string; url: string }[] | null
  additional_info: Record<string, any> | null
  created_at: string
  updated_at: string
}

export interface Investor {
  id: string
  name: string
  logo_url: string | null
  website: string | null
  description: string | null
  investment_focus: string | null
  investment_stage: string | null
  investment_range: string | null
  portfolio_companies: string | null
  contact_email: string | null
  contact_phone: string | null
  location: string | null
  created_at: string
  updated_at: string
}

export interface Buyer {
  id: string
  name: string
  logo_url: string | null
  website: string | null
  description: string | null
  buyer_type: "webtoon" | "other"
  interest_areas: string | null
  company_info: string | null
  created_at: string
  updated_at: string
}

export interface MatchingSchedule {
  id: string
  table_number: number
  matching_type: "investment" | "buyer_webtoon" | "buyer_other"
  time_slot: string
  date: string
  company_id: string | null
  partner_id: string | null
  partner_type: "investor" | "buyer" | null
  status: "scheduled" | "completed" | "cancelled"
  notes: string | null
  created_at: string
  updated_at: string
}

export interface OpenInnovation {
  id: string
  company_name: string
  logo_url: string | null
  website: string | null
  company_description: string | null
  challenge_title: string
  challenge_description: string | null
  challenge_category: string | null
  requirements: string | null
  benefits: string | null
  deadline: string | null
  contact_info: string | null
  created_at: string
  updated_at: string
}

// Combined types for display
export interface CompanyWithDetails extends Company {
  details?: CompanyDetails
}

export interface MatchingScheduleWithDetails extends MatchingSchedule {
  company?: Company
  investor?: Investor
  buyer?: Buyer
}
