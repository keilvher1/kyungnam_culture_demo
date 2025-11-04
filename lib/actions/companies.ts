"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import type { Company, CompanyDetails } from "@/lib/types/database"

export async function getCompanies() {
  const supabase = await createClient()
  const { data, error } = await supabase.from("companies").select("*").order("name")

  if (error) throw error
  return data as Company[]
}

export async function getCompanyWithDetails(companyId: string, matchingType: string) {
  const supabase = await createClient()

  const { data: company, error: companyError } = await supabase
    .from("companies")
    .select("*")
    .eq("id", companyId)
    .single()

  if (companyError) throw companyError

  const { data: details, error: detailsError } = await supabase
    .from("company_details")
    .select("*")
    .eq("company_id", companyId)
    .eq("matching_type", matchingType)
    .single()

  return {
    ...company,
    details: details || null,
  }
}

export async function getCompaniesByMatchingType(matchingType: string) {
  const supabase = await createClient()

  const { data: companies, error: companiesError } = await supabase.from("companies").select("*").order("name")

  if (companiesError) throw companiesError

  // Get details for each company
  const companiesWithDetails = await Promise.all(
    companies.map(async (company) => {
      const { data: details } = await supabase
        .from("company_details")
        .select("*")
        .eq("company_id", company.id)
        .eq("matching_type", matchingType)
        .single()

      return {
        ...company,
        details: details || null,
      }
    }),
  )

  return companiesWithDetails
}

export async function createCompany(company: Omit<Company, "id" | "created_at" | "updated_at">) {
  const supabase = await createClient()
  const { data, error } = await supabase.from("companies").insert(company).select().single()

  if (error) throw error
  revalidatePath("/")
  return data
}

export async function updateCompany(id: string, company: Partial<Company>) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("companies")
    .update({ ...company, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single()

  if (error) throw error
  revalidatePath("/")
  return data
}

export async function deleteCompany(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from("companies").delete().eq("id", id)

  if (error) throw error
  revalidatePath("/")
}

export async function upsertCompanyDetails(details: Omit<CompanyDetails, "id" | "created_at" | "updated_at">) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("company_details")
    .upsert({
      ...details,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single()

  if (error) throw error
  revalidatePath("/")
  return data
}
