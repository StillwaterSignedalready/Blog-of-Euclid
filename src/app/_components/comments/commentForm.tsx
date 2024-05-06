import {
  Button,
  Avatar,
  Textarea,
} from "@nextui-org/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { GithubIcon } from '@/app/_components/icons'
import { createComment } from '@/lib/ajax'
import { useState } from "react";
import { Post } from '@/interfaces/post'
import toast, { Toaster } from 'react-hot-toast'

interface IProps {
  post?: Pick<Post, 'id'|'title'>;
  onCommentSuccess?: () => void;
  postTotal: number;
}

// Session format
// {
//   "user": {
//     "name": "Wayne",
//     "email": "doublecross@yeah.net",
//     "image": "https://avatars.githubusercontent.com/u/20716276?v=4"
//   },
//   "expires": "2024-05-27T09:03:27.551Z"
// }
export function CommentForm({ post, onCommentSuccess, postTotal }: IProps) {
  const { data: session } = useSession()
  const { user } = session ?? {}
  const [comment, setComment] = useState('')

  const onCommentBtnClick = async () => {
    if (!comment) {
      toast.custom('Can\'t comment with empty content')
      return
    }
    try {
      await createComment({
        articleId: post?.id ?? null,
        articleTitleEn: post?.title,
        userName: user?.name ?? '',
        userEmail: user?.email ?? '',
        userImage: user?.image ?? '',
        content: comment
      })
      setComment('')
      toast.success('comment success')
      onCommentSuccess && onCommentSuccess()
    } catch (error) {
      toast.error(`create comments failed: ${error}`)
    }

  }

  const canCreateComment = !!session && comment.length
  return (
    <div className="mb-4">
      <div className="flex flex-row mb-2">
        <div className="basis-1/2">
          {postTotal} Comments
        </div>
        <div className="basis-1/2 text-right">
          {!!session ?
            <Button size="sm" onClick={() => signOut({ redirect: false })}>Log out</Button> :
            <span>
              Login with
              <Button isIconOnly onClick={() => signIn('github', { redirect: false })} variant="light" className="relative top-1">
                <GithubIcon />
              </Button>
            </span>
          }
        </div>
      </div>
      <div className="flex flex-row mb-2">
        {session && <div className="w-14">
          <Avatar radius="sm" src={session?.user?.image || session?.user?.name || ''} />
        </div>}
        <Textarea
          className="basis-1/1"
          disabled={!session}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={session ? "Share your thoughts..." : 'To share your thoughts, please login ↗️'}
          height="150px"
          minRows={4}
        />
      </div>
      <div className="text-right">
        <Button onClick={onCommentBtnClick} size="sm" color={canCreateComment ? 'primary' : 'default'} disabled={!canCreateComment}>
          Comment
        </Button>
      </div>
      <Toaster/>
    </div>
  )
}
