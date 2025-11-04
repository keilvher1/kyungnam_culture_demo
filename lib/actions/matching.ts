"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import type { MatchingSchedule, MatchingScheduleWithDetails } from "@/lib/types/database"

export async function getMatchingSchedules(matchingType: string, date?: string) {
  const supabase = await createClient()

  let query = supabase
    .from("matching_schedule")
    .select("*")
    .eq("matching_type", matchingType)
    .order("table_number")
    .order("time_slot")

  if (date) {
    query = query.eq("date", date)
  }

  const { data, error } = await query

  if (error) throw error

  // Fetch related company, investor, and buyer data
  const scheduleWithDetails = await Promise.all(
    (data as MatchingSchedule[]).map(async (schedule) => {
      const result: MatchingScheduleWithDetails = { ...schedule }

      if (schedule.company_id) {
        const { data: company } = await supabase.from("companies").select("*").eq("id", schedule.company_id).single()
        if (company) result.company = company
      }

      if (schedule.partner_id && schedule.partner_type === "investor") {
        const { data: investor } = await supabase.from("investors").select("*").eq("id", schedule.partner_id).single()
        if (investor) result.investor = investor
      }

      if (schedule.partner_id && schedule.partner_type === "buyer") {
        const { data: buyer } = await supabase.from("buyers").select("*").eq("id", schedule.partner_id).single()
        if (buyer) result.buyer = buyer
      }

      return result
    }),
  )

  return scheduleWithDetails
}

export const getMatchingSchedule = getMatchingSchedules

export async function createMatchingSchedule(
  schedule: Omit<MatchingSchedule, "id" | "created_at" | "updated_at" | "status">,
) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("matching_schedule")
    .insert({ ...schedule, status: "scheduled" })
    .select()
    .single()

  if (error) throw error
  revalidatePath("/")
  return data
}

export async function updateMatchingSchedule(id: string, schedule: Partial<MatchingSchedule>) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("matching_schedule")
    .update({ ...schedule, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single()

  if (error) throw error
  revalidatePath("/")
  return data
}

export async function deleteMatchingSchedule(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from("matching_schedule").delete().eq("id", id)

  if (error) throw error
  revalidatePath("/")
}
