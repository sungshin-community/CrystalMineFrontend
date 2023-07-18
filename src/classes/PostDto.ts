export default interface PostDto {
  postId: number;
  accountId: number;
  boardId: number;
  boardName: string;
  boardType: string;
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
  defaultProfileImage: string;
  nickname: string;
  isOwner: boolean;
  hasTitle: boolean;
  direction: {
    title: string;
    content: string;
  };
}
