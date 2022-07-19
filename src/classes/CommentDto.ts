export default interface CommentDto {
  id: number;
  parentId: number;
  postId: number;
  isAnonymous: boolean;
  displayName: string;
  profileImage: string;
  isOfReader: boolean;
  isOfBoardOwner: boolean;
  isOfPostAuthor: boolean;
  isOfBlacklist: boolean;
  isOfDeletedUser: boolean;
  content: string;
  createdAt: string;
  likeCount: number;
  isLiked: boolean;
  isReported: boolean;
  isBlind: boolean;
  isDeleted: boolean;
}

export interface RecommentDto {
  id: number;
  parentId: number;
  postId: number;
  isAnonymous: boolean;
  displayName: string;
  profileImage: string;
  isOfReader: boolean;
  isOfBoardOwner: boolean;
  isOfPostAuthor: boolean;
  isOfBlacklist: boolean;
  isOfDeletedUser: boolean;
  content: string;
  createdAt: string;
  likeCount: number;
  isLiked: boolean;
  isReported: boolean;
  isBlind: boolean;
  isDeleted: boolean;
  recomments: RecommentDto[]
}