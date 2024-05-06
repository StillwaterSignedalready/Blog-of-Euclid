import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache'
import { Post, ArticleRow } from '@/interfaces/post'
import { ICommentParams, ICommentRow, IComment } from '@/interfaces/comment'
import { LanEnum } from '@/interfaces/common'

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

// TODO: limit
export async function fetchArticleList(lan: LanEnum | '' = LanEnum.EN) {
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

export async function fetchArticle(id: number, lan: LanEnum | '' = LanEnum.EN) {
  noStore()
  let row2post: (row: ArticleRow) => Post = row2enPost
  if (lan === LanEnum.CN) row2post = row2cnPost

  try {
    let rows: ArticleRow[] = []
    rows = (await (lan === LanEnum.CN ?
      sql<ArticleRow>`SELECT id, title_cn, excerpt_cn, content_cn, cover_image, created_at FROM Articles WHERE id = ${id}` :
      sql<ArticleRow>`SELECT id, title_en, excerpt_en, content_en, cover_image, created_at FROM Articles WHERE id = ${id}`
    )).rows;

    const post = row2post(rows[0] as ArticleRow);

    return post;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch article data.');
  }
}

export async function createComment({ articleId, articleTitleEn, userName, userEmail, userImage, content }: ICommentParams) {
  try {
    const result = await sql<ArticleRow>`INSERT INTO Comments (article_id, article_title_en, user_name, user_email, user_image, content)
    VALUES (${articleId}, ${articleTitleEn}, ${userName}, ${userEmail}, ${userImage}, ${content});`
    return result;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch article data.');
  }
}

export async function fetchCommentList(articleId: string | null): Promise<IComment[]> {
  try {
    const sqlResult = articleId === null ?
      await sql<ICommentRow>`SELECT id, article_title_en, user_name, user_email, user_image, content, created_at FROM Comments WHERE article_id is NULL ORDER BY created_at DESC`:
      await sql<ICommentRow>`SELECT id, article_title_en, user_name, user_email, user_image, content, created_at FROM Comments WHERE article_id = ${articleId} ORDER BY created_at DESC`

    return sqlResult.rows.map(obj => ({
      id: obj.id,
      // articleId: obj.article_id,
      articleTitleEn: obj.article_title_en,
      userName: obj.user_name,
      userEmail: obj.user_email,
      userImage: obj.user_image,
      content: obj.content,
      createdAt: obj.created_at,
    }));
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch comment data.');
  }
}