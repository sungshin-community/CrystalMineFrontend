export default interface Board {
  id: number;
  name: string;
  introduction: string;
  isOwner: boolean;
  isPinned: boolean;
  isOfficial: boolean;
}
