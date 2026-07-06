import { NextResponse } from "next/server"
import { getFinanceMonths, getAllFinanceTags } from "@/lib/finance-data"

export const dynamic = "force-dynamic"

export async function GET() {
  return NextResponse.json({
    months: getFinanceMonths(),
    tags: getAllFinanceTags(),
  })
}
