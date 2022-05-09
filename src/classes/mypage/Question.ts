import Images from "../Images";
 
export default interface QuestionListDto {
  id: number;
  status: boolean;
  title: string;
}

export interface QuestionDto {
  id: number;
  status: boolean;
  title: string;
  content: string;
  img: Images[];
  createdAt: string;
  answer: Answer;
}

interface Answer {
  id: number;
  content: string;
  createdAt: string;
}