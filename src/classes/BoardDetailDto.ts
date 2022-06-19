export default interface BoardDetailDto {
  content: ContentPreviewDto[];
}

export interface ContentPreviewDto {
  postId: number;
  profileImage: string;
  displayName: string;
  isAuthor: boolean;
  title: string;
  content: string;
  createdAt: string;
  commentCount: number;
  isLiked: boolean;
  likeCount: number;
  isScraped: boolean;
  scrapCount: number;
  imageCount: number;
}