export default interface MessageDto {
  content: Message[];
}

export interface Message {
  id: number;
  nickname: string;
  profileImage: string;
  boardType: string;
  content: string;
  time: string;
  postId: number;
  messageCount: number;
}