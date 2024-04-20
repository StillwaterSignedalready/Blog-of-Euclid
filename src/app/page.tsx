import Container from "@/app/_components/container";
import { HeroPost } from "@/app/_components/hero-post";
import { Intro } from "@/app/_components/intro";
import { MoreStories } from "@/app/_components/more-stories";
import Provider from './provider'
import { unstable_noStore as noStore } from 'next/cache'
import { fetchEnArticles } from '@/lib/database'

export default async function Index() {
  noStore();
  const posts = await fetchEnArticles();

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
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
          />
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </main>
    </Provider>
  );
}
