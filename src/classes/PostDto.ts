export default interface PostDto {
  postId: number;
  boardName: string;
  profileImage: string;
  displayName: string;
  title: string;
  content: string;
  createdAt: string;
  hasTitle: boolean;
  isAuthor: boolean;
  isOwner: boolean;
  isAnonymous: boolean;
  isLiked: boolean;
  isScraped: boolean;
  isReported: boolean;
  likeCount: number;
  imageCount: number;
  commentCount: number;
}

export interface PostWriteDto {
  boardId : number;
  title : string;
  content : string;
  images : string[];
  isAnonymous : boolean;
}