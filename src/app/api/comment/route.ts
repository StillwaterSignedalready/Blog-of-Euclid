import { auth } from "@/auth"
import { HttpStatusCode } from "axios"
import { NextResponse } from "next/server"
import { createComment } from '@/lib/database'
import { ICommentParams } from '@/interfaces/comment'

export const POST = auth(async function POST(req) {
  if (!req.auth) return NextResponse.json({ message: "Not authenticated" }, { status: HttpStatusCode.Unauthorized })
  const body = await req.json()
  try {
    // TODO: validation
    const { articleId, articleTitleEn, userName, userEmail, userImage, content } = body as ICommentParams
    if (!content) return NextResponse.json({ data: { message: 'Comment content is empty' } }, { status: HttpStatusCode.BadRequest })

    const result = await createComment({
      articleId,
      articleTitleEn,
      userName,
      userEmail,
      userImage,
      content,
    })
    return NextResponse.json({ data: result.rows }, { status: HttpStatusCode.Ok })
  } catch (error) {
    // TODO: log
    console.log('[ERROR]: create comment')
  }
})
