import Container from "@/app/_components/container";
import { HeroPost } from "@/app/_components/hero-post";
import { Intro } from "@/app/_components/intro";
import { MoreStories } from "@/app/_components/more-stories";
import Provider from './provider'
import { unstable_noStore as noStore } from 'next/cache'
import { fetchArticleList } from '@/lib/database'
import { LanEnum } from '@/interfaces/post'

export default async function Page({ searchParams }: {
  searchParams: { lan?: LanEnum }
}) {
  noStore();
  const posts = await fetchArticleList(searchParams.lan);
  const heroPost = posts[0];

  const morePosts = posts.slice(1);
  return (
    <Provider>
      <main>
        <Container>
          <Intro />
          <HeroPost
            title={heroPost.title}
            coverImage={heroPost.coverImage}
            date={heroPost.date}
            slug={heroPost.id}
            excerpt={heroPost.excerpt}
          />
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </main>
    </Provider>
  );
}
