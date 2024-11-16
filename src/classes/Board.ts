export default interface Board {
  contentType: string;
  id: number;
  name: string;
  introduction: string;
  hotable: boolean;
  type: string;
  isOwner: boolean;
  isPinned: boolean;
  isReported: boolean;
  todayNewPost: boolean;
}
