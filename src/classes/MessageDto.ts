export default interface MessageDto {
  content: MessageRoom[];
}

export interface MessageRoom {
  roomId: number;
  partnerProfile: string;
  partnerNickname: string;
  postBoard: string;
  lastChat: string;
  lastPhoto: string | null;
  lastChatTime: string;
  unreadCount: number;
  isChecked: boolean | null;
}
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
