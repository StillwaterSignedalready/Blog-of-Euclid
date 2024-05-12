import axios from 'axios'
import { ICommentParams, IComment } from '@/interfaces/comment'

export async function createComment(params: ICommentParams) {
  const formattedParams = {
    ...params,
    articleId: params.articleId ?? null,
    articleTitleEn: params.articleTitleEn ?? null,
  }
  return await axios.post('/api/comment', formattedParams)
}

export async function getCommentList(articleId: string = '') {
  const result = await axios.get<{ data: (IComment & { createdAt: string })[] }>(`/api/comment/list?articleId=${articleId}`)
  return result.data.data.map(obj => ({ ...obj, createdAt: new Date(obj.createdAt) }))
}