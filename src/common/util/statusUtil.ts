export function getHundredsDigit(status: number) {
  console.log("여기는 100의 자리수 알아내는 곳. status는", status, "100의 자리수:", Math.floor(status / 100))
  return Math.floor(status / 100);
}