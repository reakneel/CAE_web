import { NextRequest, NextResponse } from "next/server"
import { queryFinance } from "@/lib/finance-data"

export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
  const url = req.nextUrl
  const page = parseInt(url.searchParams.get("page") || "1", 10)
  const limit = parseInt(url.searchParams.get("limit") || "30", 10)
  const month = url.searchParams.get("month") || undefined
  const tag = url.searchParams.get("tag") || undefined
  const q = url.searchParams.get("q") || undefined

  const result = queryFinance({ page, limit, month, tag, q })
  return NextResponse.json(result)
}
