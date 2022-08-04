
export interface PinBoardDto {
  boardId: number;
  boardName: string;
  recentPostContent: string;
  todayNewPost: boolean;
}

export interface HotBoardDto {
  boardId: number;
  boardName: string;
  hotPosts: HotPostDto[];
}

export interface HotPostDto {
  postId: number;
  postContent: string;
  likeCount: number;
  commentCount: number;
}

export interface HomeNotificationDto {
  content: HomeNotification[];
}

export interface HomeNotification {
  id: number;
  from: string;
  type: string;
  title: string;
  content?: string;
  blind?: BlindDto
  unblind?: UnblindDto
}

interface BlindDto {
  message: string;
  reason: string;
  content: string;
}
interface UnblindDto {
  message: string;
  content: string;
}