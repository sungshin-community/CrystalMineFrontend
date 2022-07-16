export class MyPostContentDto {
  postId: number = 0;
  boardName: string = '';
  profileImage: string[] = [];
  displayName: string = '';
  title: string = '';
  content: string = '';
  createdAt: string = '';
  hasTitle: boolean = false;
  isOwner: boolean = false;
  isAnonymous: boolean = true;
  isLiked: boolean = false;
  likeCount: number = 0;
  imageCount: number = 0;
  commentCount: number = 0;
  isChecked: boolean = false;
}

export default interface MyPostDto {
  content: MyPostContentDto[];
}