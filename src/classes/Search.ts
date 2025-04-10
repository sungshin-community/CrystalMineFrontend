import Board from './Board';
import {MyPostContentDto, PtContentDto} from './board/MyPostDto';
import MyCommentDto from './MyCommentDto';

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

export interface BoardSearchResult {
  content: Board[];
}

export interface PtSearchResult {
  content: PtContentDto[];
}

export interface PostContent {
  postId: number;
  boardName: string;
  profileImage: string;
  displayName: string;
  isAuthor: boolean;
  title: string;
  content: string;
  createdAt: string;
  commentCount: number;
  isLiked: boolean;
  likeCount: number;
  isScraped: boolean;
  hasTitle: boolean;
  isOwner: boolean;
  isAnonymous: boolean;
  scrapCount: number;
  imageCount: number;
}

export interface SearchPost {
  content: MyPostContentDto[];
}

export interface SearchComment {
  content: MyCommentDto[];
}
