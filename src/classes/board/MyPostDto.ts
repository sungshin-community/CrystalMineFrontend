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
  isBoardDeleted: boolean = false;
  isBoardBlinded: boolean = false;
}

export class PtContentDto {
  commentCount: number = 0;
  content: string = '';
  createdAt: string = '';
  displayName: string = '';
  hasTitle: boolean = false;
  isAnonymous: boolean = true;
  isLiked: boolean = false;
  likeCount: number = 0;
  profileImage: string = '';
  ptPostId: number = 0;
  ptPostType: string = '';
  title: string = '';
}

export default interface MyPostDto {
  content: MyPostContentDto[];
}
