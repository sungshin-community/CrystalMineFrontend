export default interface QuestionWriteRequest {
  question: QuestionFields;
  images: any;
}

interface QuestionFields {
  title: string;
  content: string;
}
