export default interface Response<T> {
  timestamp: string;
  code: string;
  status: string;
  detail: string;
  data: T;
}
