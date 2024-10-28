export default interface CommentDto {
  id: number;
  accountId: number;
  parentId: number;
  postId: number;
  boardType: string;
  isAnonymous: boolean;
  displayName: string;
  profileImage: string;
  isOfReader: boolean;
  isOfBoardOwner: boolean;
  isOfPostAuthor: boolean;
  isOfBlacklist: boolean;
  isOfDeletedUser: boolean;
  content: string;
  emoticonUrl: string;
  createdAt: string;
  likeCount: number;
  isLiked: boolean;
  isReported: boolean;
  isBlind: boolean;
  isDeleted: boolean;
}

export interface RecommentDto {
  id: number;
  accountId: number;
  parentId: number;
  postId: number;
  boardType: string;
  isAnonymous: boolean;
  displayName: string;
  profileImage: string;
  isOfReader: boolean;
  isOfBoardOwner: boolean;
  isOfPostAuthor: boolean;
  isOfBlacklist: boolean;
  isOfDeletedUser: boolean;
  content: string;
  emoticonUrl: string;
  createdAt: string;
  likeCount: number;
  isLiked: boolean;
  isReported: boolean;
  isBlind: boolean;
  isDeleted: boolean;
  recomments: RecommentDto[];
}
