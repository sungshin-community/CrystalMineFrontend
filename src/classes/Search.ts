export interface BoardContent {
  id: number;
  name: string;
  introduction: string;
  isOwner: boolean;
  isPinned: boolean;
}

export interface SearchBoard {
  content: BoardContent[];
  pageable: string;
  totalPages: number;
  totalElements: number;
  last: boolean;
  numberOfElements: number;
  first: boolean;
  size: number;
  number: number;
  sort: {
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
  };
  empty: boolean;
}

interface PostContent {
  postId: number;
  boardName: string;
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

export interface SearchPost {
  content: PostContent[];
  pageable: string;
  totalPages: number;
  totalElements: number;
  last: boolean;
  numberOfElements: number;
  first: boolean;
  size: number;
  number: number;
  sort: {
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
  };
  empty: boolean;
}
