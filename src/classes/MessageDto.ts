export class MessageRoom {
  roomId: number = 0;
  partnerProfile: string = '';
  partnerNickname: string = '';
  postBoard: string = '';
  lastChat: string = '';
  lastPhoto: string | null = null;
  lastChatTime: string = '';
  unreadCount: number = 0;
  isChecked: boolean = false;
}

export interface MessageRoomSubscribe {
  roomId: number;
  receiverId: number;
  lastChat: string;
  lastPhotoChat: string | null;
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
