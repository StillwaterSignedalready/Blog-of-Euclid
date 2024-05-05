import axios from 'axios'
import { ICommentParams, IComment } from '@/interfaces/comment'

export async function createComment(params: ICommentParams) {
  try {
    const result = await axios.post('/api/comment', params)
  } catch (error) {
    console.log('comment failed: ', error)
  }
}

export async function getCommentList(articleId: string) {
  try {
    const result = await axios.get<{ data: (IComment & { createdAt: string })[] }>(`/api/comment/list?articleId=${articleId}`)
    return result.data.data.map(obj => ({ ...obj, createdAt: new Date(obj.createdAt) }))
  } catch (error) {
    console.log('comment failed: ', error)
    return []
  }
}