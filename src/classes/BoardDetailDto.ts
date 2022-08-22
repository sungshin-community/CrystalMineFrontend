export default interface BoardDetailDto {
  content: ContentPreviewDto[];
}

export interface ContentPreviewDto {
  postId: number;
  profileImage: string;
  displayName: string;
  title: string;
  content: string;
  hasTitle: boolean;
  isOwner: boolean;
  isAnonymous: boolean;
  isLiked: boolean;
  likeCount: number;
  imageCount: number;
  commentCount: number;
  isDeleted: number;
  // TODO: 여기 아래 필드는 필요한 지 모르겠음. 쓰고 있는지 확인해야함.
  isAuthor: boolean;
  createdAt: string;
  isScraped: boolean;
  scrapCount: number;
  boardType: string;
}