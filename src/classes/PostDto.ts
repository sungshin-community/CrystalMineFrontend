export default interface PostDto {
  postId: number;
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