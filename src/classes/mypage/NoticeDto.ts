import Images from "../Images";

export default class NoticeListDto {
  id: number = 0;
  title: string = '';
  isNew: boolean = false;
  createdAt: string = '';
}
export class NoticeDto {
  id: number = 0;
  title: string = '';
  content: string = '';
  images: Images[] = [];
  isNew: boolean = false;
  createdAt: string = '';
}
