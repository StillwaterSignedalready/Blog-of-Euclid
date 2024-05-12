import { Avatar } from "@nextui-org/react";
import { IComment } from '@/interfaces/comment'
interface IProps {
  commentInfo: Pick<IComment, 'userName' | 'createdAt' | 'content' | 'userImage'>
}

export function Comment({ commentInfo: comment }: IProps) {
  return (
    <div className="flex flex-row mb-2 border-t-red border-t-1 border-dashed mb-2 p-2">
      <div className="w-14">
        <Avatar radius="sm" src={comment.userImage} />
      </div>
      <div className="basis-1/1">
        <div className="font-bold">
          {comment.userName}
        </div>
        <div className="text-xs text-silver">
          {comment.createdAt.toLocaleDateString()}
        </div>
        <div>
          {comment.content}
        </div>
      </div>
    </div>
  )
}