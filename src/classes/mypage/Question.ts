import Images from "../Images";
 
export default class QuestionListDto {
  id: number = 0;;
  status: boolean = false;
  title: string = '';
  isChecked: boolean = false;
}

export interface QuestionDto {
  id: number;
  status: boolean;
  title: string;
  content: string;
  images: string[];
  thumbnails: string[];
  createdAt: string;
  answer: Answer;
  // isChecked: boolean;
}

interface Answer {
  id: number;
  content: string;
  createdAt: string;
}