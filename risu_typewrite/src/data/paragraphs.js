/**
 * 타이핑 연습용 문단 데이터
 * 향후 IndexedDB 통합을 위한 구조로 준비
 */
export const paragraphs = [
  "오늘 정말로 다정한 손님이 다녀가셨사옵니다. 그분의 친구분들을 소개해 주신다는 말씀에 소녀는 너무나 기쁘옵니다! 어떤 칵테일을 만들어드려야 할지 벌써부터 설레네요. 부디 마음에 드셨으면",
  "은월은 짧은 탄성을 터뜨렸다. 그녀의 얼굴에 화색이 돌았다. 방금 전까지 희미하게 남아있던 불안감의 그림자가 완전히 걷히고"
];

/**
 * 랜덤 문단 가져오기
 * @returns {string} 랜덤하게 선택된 문단
 */
export function getRandomParagraph() {
  const ranIndex = Math.floor(Math.random() * paragraphs.length);
  return paragraphs[ranIndex];
}

/**
 * 특정 인덱스의 문단 가져오기
 * @param {number} index - 문단 인덱스
 * @returns {string} 선택된 문단
 */
export function getParagraph(index) {
  if (index < 0 || index >= paragraphs.length) {
    return paragraphs[0];
  }
  return paragraphs[index];
}

/**
 * 전체 문단 개수 반환
 * @returns {number} 문단 개수
 */
export function getParagraphCount() {
  return paragraphs.length;
}
