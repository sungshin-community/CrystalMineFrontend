export interface Chat {
  chatId: number;
  senderId: number;
  chat: string;
  photoUrl: string;
  createdAt: string;
  readAt: string;
}
export interface Content {
  content: Chat[];
}

export interface Message {
  roomId: number;
  partnerNickname: string;
  postId: number;
  postBoardName: string;
  postContent: string;
  chats: Content;
}
