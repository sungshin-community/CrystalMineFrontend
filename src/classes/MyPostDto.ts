export default interface MyPostDto {
  postId: number;
  boardName: string;
  profileImage: string;
  displayName: string;
  title : string;
  content : string;
  createdAt : string;
  hasTitle : boolean;
  isOwner : boolean;
  isAnonymous : boolean;
  isLiked : boolean;
  likeCount : number;
  imageCount : number;
  commentCount : number;
}
