import { type NextRequest, NextResponse } from 'next/server'
import { HttpStatusCode } from "axios"
import { fetchCommentList } from '@/lib/database'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const articleId = searchParams.get('articleId')

  if (!articleId) return NextResponse.json({ data: { message: 'Comment articleId is empty' } }, { status: HttpStatusCode.BadRequest })
  const rows = await fetchCommentList(articleId)
  return Response.json({ data: rows })
}