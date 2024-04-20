export interface ArticleRow {
  id: string;
  title_en: string;
  excerpt_en: string;
  content_en: string;
  cover_image: string;
  created_at: Date;
}

export type Post = {
  id: string;
  title: string;
  date: string;
  coverImage: string;
  excerpt: string;
  content: string;
  preview?: boolean;
};
