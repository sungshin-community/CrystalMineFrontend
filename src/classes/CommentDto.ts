export default interface CommentDto {
  id: number;
  parentId: number;
  postId: number;
  displayName: string;
  profileImageUrl: string;
  isAuthor: boolean;
  content: string;
  likeCount: number;
  createdAt: string;
  isLiked: boolean;
  isReported: boolean;
  isBlind: boolean;
  recomments: RecommentDto[]
}

export interface RecommentDto {
  id: number;
  parentId: number;
  postId: number;
  displayName: string;
  profileImageUrl: string;
  isAuthor: boolean;
  content: string;
  likeCount: number;
  createdAt: string;
  isLiked: boolean;
  isReported: boolean;
  isBlind: boolean;
  recomments: RecommentDto[]
}