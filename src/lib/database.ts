import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache'
import { Post, ArticleRow, LanEnum } from '@/interfaces/post'


const row2enPost = ({ title_en, created_at, cover_image, content_en, excerpt_en, id }: ArticleRow): Post => ({
  id,
  title: title_en,
  date: created_at.toISOString(),
  coverImage: cover_image,
  excerpt: excerpt_en,
  content: content_en,
})

const row2cnPost = ({ title_cn, created_at, cover_image, content_cn, excerpt_cn, id }: ArticleRow): Post => ({
  id,
  title: title_cn,
  date: created_at.toISOString(),
  coverImage: cover_image,
  excerpt: excerpt_cn,
  content: content_cn,
})

export async function fetchArticleList(lan: LanEnum = LanEnum.EN) {
  noStore()
  let row2post: (row: ArticleRow) => Post = row2enPost
  if (lan === LanEnum.CN) row2post = row2cnPost
  try {
    let rows: ArticleRow[] = []
    rows = (await (lan === LanEnum.CN ?
      sql<ArticleRow>`SELECT id, title_cn, excerpt_cn, content_cn, cover_image, created_at FROM Articles ORDER BY created_at DESC` :
      sql<ArticleRow>`SELECT id, title_en, excerpt_en, content_en, cover_image, created_at FROM Articles ORDER BY created_at DESC`
    )).rows

    const allPosts = rows.map(row => row2post(row as ArticleRow));

    return allPosts;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch article data.');
  }
}

export async function fetchArticle(id: number) {
  noStore()

  try {
    const { rows } = await sql<ArticleRow>`SELECT id, title_en, excerpt_en, content_en, cover_image, created_at FROM Articles WHERE id = ${id}`;

    const post = row2enPost(rows[0] as ArticleRow);

    return post;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch article data.');
  }
}