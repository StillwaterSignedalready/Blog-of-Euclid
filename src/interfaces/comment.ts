export interface ICommentRow {
  id: string;
  article_id: string;
  article_title_en: string;
  user_name: string;
  user_email: string;
  user_image: string;
  content: string;
  created_at: Date;
}

export interface IComment {
  id: string;
  articleId?: string;
  articleTitleEn: string;
  userName: string;
  userEmail: string;
  userImage: string;
  content: string;
  createdAt: Date;
}

export interface ICommentParams {
  articleId: string;
  articleTitleEn: string;
  userName: string;
  userEmail: string;
  userImage: string;
  content: string
}