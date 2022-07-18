export default class MyCommentDto {
  id: number = 0;
  postId: number = 0;
  boardId: number = 0;
  content: string = '';
  postContent: string = '';
  boardName: string = '';
  profileImageUrl: string = '';
  isAnonymous: boolean = true;
  displayName: string = '';
  isOfPostAuthor: boolean = false;
  likeCount: number = 0;
  createdAt: string = '';
  isLiked: boolean = false;
  isChecked: boolean = false;
}