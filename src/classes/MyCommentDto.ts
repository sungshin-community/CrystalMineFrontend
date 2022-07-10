export default interface MyCommentDto {
  id: number,
  postId: number,
  boardId: number,
  content: string,
  postContent: string,
  boardName: string,
  profileImageUrl: string,
  isAnonymous: boolean,
  displayName: string,
  isOfPostAuthor: boolean,
  likeCount: number,
  createdAt: string
}