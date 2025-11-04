"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import type { Investor } from "@/lib/types/database"

export async function getInvestors() {
  const supabase = await createClient()
  const { data, error } = await supabase.from("investors").select("*").order("name")

  if (error) throw error
  return data as Investor[]
}

export async function getInvestor(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase.from("investors").select("*").eq("id", id).single()

  if (error) throw error
  return data as Investor
}

export async function createInvestor(investor: Omit<Investor, "id" | "created_at" | "updated_at">) {
  const supabase = await createClient()
  const { data, error } = await supabase.from("investors").insert(investor).select().single()

  if (error) throw error
  revalidatePath("/")
  return data
}

export async function updateInvestor(id: string, investor: Partial<Investor>) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("investors")
    .update({ ...investor, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single()

  if (error) throw error
  revalidatePath("/")
  return data
}

export async function deleteInvestor(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from("investors").delete().eq("id", id)

  if (error) throw error
  revalidatePath("/")
}
