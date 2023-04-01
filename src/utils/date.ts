/**
 * Date 객체를 받아 'yyyy. m. d.' 포맷의 문자열을 반환합니다.
 */
function dateToString(date: Date): string {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();

  return `${y}. ${m}. ${d}.`;
}

// TODO: 날짜 + 시간 -> 문자열 변환 함수 구현
// function dateTimeToString(dateTime: Date): string {
//   return '';
// }

export { dateToString };
