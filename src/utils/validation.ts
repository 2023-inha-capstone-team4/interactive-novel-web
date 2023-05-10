/**
 * 이메일 형식을 검증합니다.
 * 주어진 이메일 문자열이 올바른 형식인 경우 `true`, 그렇지 않으면 `false`를 반환합니다.
 */
export function validateEmailFormat(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
