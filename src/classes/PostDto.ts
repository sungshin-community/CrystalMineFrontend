export default interface PostDto {
  postId: number;
  boardId: number;
  boardName: string;
  profileImage: string;
  displayName: string;
  title: string;
  content: string;
  thumbnails: string[];
  images: string[];
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
  boardId: number;
  title: string;
  content: string;
  images: string[];
  isAnonymous: boolean;
}

export interface PostWriteInfoDto {
  boardName: string;
  profileImage: string;
  nickname: string;
  isOwner: boolean;
  hasTitle: boolean;
  directions: {
    id: number;
    title: string;
    content: string[];
  }[];
}
