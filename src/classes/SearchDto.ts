export interface BoardContentDto {
  id: number;
  name: string;
  introduction: string;
  isOwner: boolean;
  isPinned: boolean;
}

export interface SearchBoardDto {
  content: BoardContentDto[];
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

export interface PostContentDto {
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

export interface SearchPostDto {
  content: PostContentDto[];
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
