import { Post } from "@/interfaces/post";
import { PostPreview } from "./post-preview";
import { ISearchParams, LanEnum } from '@/interfaces/common'

type Props = {
  posts: Post[];
  searchParams: ISearchParams;
};

export function MoreStories({ posts, searchParams }: Props) {
  return (
    <section>
      <h2 className="mb-8 text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
        {searchParams.lan === LanEnum.CN ? '更多博文' : 'More Stories'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {posts.map((post) => (
          <PostPreview
            searchParams={searchParams}
            key={post.id}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            id={post.id}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </section>
  );
}
