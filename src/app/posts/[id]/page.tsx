import { notFound } from "next/navigation";
import markdownToHtml from "@/lib/markdownToHtml";
import Alert from "@/app/_components/alert";
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import { PostBody } from "@/app/_components/post-body";
import { PostHeader } from "@/app/_components/post-header";
import { fetchArticle } from '@/lib/database'
import { ISearchParams } from '@/interfaces/common'

export default async function Post({ params, searchParams }: IProps ) {
  const post = await fetchArticle(Number(params.id), searchParams.lan || '');

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");
  const formattedSearchParams: ISearchParams = JSON.parse(JSON.stringify(searchParams))
  formattedSearchParams.lan = formattedSearchParams.lan || ''
  return (
    <main>
      <Alert preview={post.preview} />
      <Container>
        <Header searchParams={formattedSearchParams} />
        <article className="mb-32">
          <PostHeader
            searchParams={formattedSearchParams}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
          />
          <PostBody content={content} />
        </article>
      </Container>
    </main>
  );
}

type IProps = {
  params: {
    id: string;
  };
  searchParams: ISearchParams 
};
