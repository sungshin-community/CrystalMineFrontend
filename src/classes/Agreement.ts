export default class Agreement {
  id: number = 0;
  title: string = '';
  content: string = '';
  checked: boolean = false;
}
export class DirectionAgreement {
  id: number = 0;
  title: string = '제목입니다';
  content: string[] = [];
  checked: boolean = false;
}
export class AgreementWithDate {
  id: number = 0;
  title: string = '';
  agreementDate: string = '';
  content: string = '';
}
export interface AgreementAll {
  direction: Agreement[],
  agreement: Agreement[],
}