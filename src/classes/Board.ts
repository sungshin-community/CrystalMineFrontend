export default interface Board {
  id: number;
  name: string;
  introduction: string;
  hotable: boolean;
  type: number;
  isOwner: boolean;
  isPinned: boolean;
  isReported: boolean;
}
