"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import type { Buyer } from "@/lib/types/database"

export async function getBuyers(buyerType?: "webtoon" | "other") {
  const supabase = await createClient()
  let query = supabase.from("buyers").select("*").order("name")

  if (buyerType) {
    query = query.eq("buyer_type", buyerType)
  }

  const { data, error } = await query

  if (error) throw error
  return data as Buyer[]
}

export async function getBuyer(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase.from("buyers").select("*").eq("id", id).single()

  if (error) throw error
  return data as Buyer
}

export async function createBuyer(buyer: Omit<Buyer, "id" | "created_at" | "updated_at">) {
  const supabase = await createClient()
  const { data, error } = await supabase.from("buyers").insert(buyer).select().single()

  if (error) throw error
  revalidatePath("/")
  return data
}

export async function updateBuyer(id: string, buyer: Partial<Buyer>) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("buyers")
    .update({ ...buyer, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single()

  if (error) throw error
  revalidatePath("/")
  return data
}

export async function deleteBuyer(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from("buyers").delete().eq("id", id)

  if (error) throw error
  revalidatePath("/")
}
