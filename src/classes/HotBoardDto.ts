export default interface HotBoardDto {
  boardId: number;
  boardName: string;
  hotPostDtos: HotPostDto[];
}

export interface HotPostDto {
  postId: number;
  postContent: string;
  likeCount: number;
  commentCount: number;
}