import { type NextRequest, NextResponse } from 'next/server'
import { HttpStatusCode } from "axios"
import { fetchCommentList } from '@/lib/database'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const articleId = searchParams.get('articleId')

  const rows = await fetchCommentList(articleId || null)
  return Response.json({ data: rows })
}