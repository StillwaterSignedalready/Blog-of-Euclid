'use client'
import { useState, useEffect, useCallback } from 'react'
import { Comment } from './comment'
import { getCommentList } from '@/lib/ajax'
import { CommentForm } from './commentForm'
import { Post } from '@/interfaces/post'
import { IComment } from '@/interfaces/comment'

interface IProps { post: Pick<Post, 'id' | 'title'> }

export function CommentsDistrict({ post }: IProps) {
  const [commentList, setCommentList] = useState<IComment[]>([])
  const reloadList = useCallback(async () => {
    const listResult = await getCommentList(post.id)
    setCommentList(listResult)
  }, [])

  useEffect(() => {
    reloadList()
  }, [])

  return (
    <div className="max-w-2xl mx-auto">
      <CommentForm post={post} postTotal={commentList.length} onCommentSuccess={reloadList} />
      {commentList.map(obj => <Comment key={obj.id} commentInfo={obj} />)}
    </div>
  );
}
