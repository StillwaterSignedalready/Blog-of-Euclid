import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache'
import { Post, ArticleRow } from '@/interfaces/post'


const row2post = ({ title_en, created_at, cover_image, content_en, excerpt_en }: ArticleRow): Post => ({
  slug: title_en,
  title: title_en,
  date: created_at.toISOString(),
  coverImage: cover_image,
  excerpt: excerpt_en,
  content: content_en,
})

export async function fetchEnArticles() {
  noStore()

  try {
    const { rows } = await sql<ArticleRow>`SELECT id, title_en, excerpt_en, content_en, cover_image, created_at FROM Articles ORDER BY created_at`;

    const allPosts = rows.map(row => row2post(row as ArticleRow));

    return allPosts;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch article data.');
  }
}