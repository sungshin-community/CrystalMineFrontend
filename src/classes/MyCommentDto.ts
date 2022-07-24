export default class MyCommentDto {
  id: number = 0;
  postId: number = 0;
  boardId: number = 0;
  content: string = '';
  postContent: string = '';
  boardName: string = '';
  profileImage: string = '';
  isAnonymous: boolean = true;
  displayName: string = '';
  isOfPostAuthor: boolean = false;
  likeCount: number = 0;
  createdAt: string = '';
  isLiked: boolean = false;
  isChecked: boolean = false;
  isBoardDeleted: boolean = false;
  isBoardBlinded: boolean = false;
  isPostDeleted: boolean = false;
  isPostBlinded: boolean = false;
}