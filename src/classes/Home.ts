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
  sender: string;
  type: number;
  title: string;
  content: string;
  reason: string;
}
