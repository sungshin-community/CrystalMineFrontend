interface pantheonList {
  content: string;
  createdAt: string;
  department: string;
  displayName: string;
  isBlind: boolean;
  isLiked: boolean;
  likeCount: number;
  newCommentAuthor: string;
  newCommentContent: string;
  profileImage: string;
  ptCommentCount: number;
  ptPostId: number;
  thumbnail: string;
  title: string;
  userJob: string;
  userYear: number;
  ptPostType?: string;
  isSelected?: boolean;
  point?: number;
}

interface pantheonDetail {
  content: string;
  createdAt: string;
  department: string;
  thumbnails?: string[];
  isBlind: boolean;
  isLiked: boolean;
  isOwner: boolean;
  isReported: boolean;
  isScraped: boolean;
  likeCount: number;
  displayName: string;
  profileImage: string;
  ptPostId: number;
  title: string;
  userJob: string;
  userYear: number;
  point?: number;
  isSelected?: boolean;
}

interface pantheonComment {
  authorDepartment: string;
  authorJob: string;
  authorYear: number;
  content: string;
  createdAt: string;
  displayName: string;
  emoticonUrl: string;
  ptCommentId: number;
  isBlind: boolean;
  isLiked: boolean;
  isReported: boolean;
  isOfReader: boolean;
  likeCount: number;
  isSelcted?: boolean;
  profileImageUrl: string;
  canReadSelectedComment?: boolean;
  reComments?: pantheonComment[];
}

export type {pantheonList, pantheonDetail, pantheonComment};
