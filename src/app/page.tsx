import Container from "@/app/_components/container";
import { HeroPost } from "@/app/_components/hero-post";
import { Intro } from "@/app/_components/intro";
import { MoreStories } from "@/app/_components/more-stories";
import Provider from './provider'
import { unstable_noStore as noStore } from 'next/cache'
import { fetchArticleList } from '@/lib/database'
import { ISearchParams } from '@/interfaces/common'
import { CommentsDistrict } from '@/app/_components/comments'
import { Divider } from '@nextui-org/react'
import { GravitySpace } from '@/app/_components/gravity-space'

export default async function Page({ searchParams }: {
  searchParams: ISearchParams
}) {
  noStore();
  const posts = await fetchArticleList(searchParams.lan);
  const heroPost = posts[0];

  const morePosts = posts.slice(1);
  const formattedSearchParams: ISearchParams = JSON.parse(JSON.stringify(searchParams))
  formattedSearchParams.lan = formattedSearchParams.lan || ''
  return (
    <Provider>
      <GravitySpace />      
      <main>
        <Container>
          <Intro searchParams={formattedSearchParams} />
          <HeroPost
            searchParams={formattedSearchParams}
            title={heroPost.title}
            coverImage={heroPost.coverImage}
            date={heroPost.date}
            slug={heroPost.id}
            excerpt={heroPost.excerpt}
          />
          {morePosts.length > 0 && <MoreStories searchParams={formattedSearchParams} posts={morePosts} />}
          <Divider className="mb-4" />
          <CommentsDistrict />
        </Container>
      </main>
    </Provider>
  );
}
