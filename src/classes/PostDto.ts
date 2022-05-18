export default interface PostDto {
  postId: number;
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
  isReported: boolean;
  selfDeleteReject: boolean;
}