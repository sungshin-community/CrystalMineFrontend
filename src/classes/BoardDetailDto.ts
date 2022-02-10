export default interface BoardDetailDto {
  id: number;
  name: string;
  isOwner: boolean;
  isPinned: boolean;
  isReported: boolean;
  deletedAt: string;
  postResponseDto: PostResponseDto;
}

interface  PostResponseDto {
  content: ContentPreviewDto[];
}

export interface ContentPreviewDto {
  postId: number;
  profileImage: string;
  nickname: string;
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