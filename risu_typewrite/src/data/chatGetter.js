/**
 * 긴 텍스트에서 연속된 문장들을 200자 이내로 묶어 랜덤 반환
 * - 불허 특수문자 제거 → 문장 분할 → 연속 병합
 * - 실패 시 최대 5회까지 재귀 재시도
 *
 * @param {string} text
 * @param {{ maxLen?: number, minLen?: number }} [opts]
 * @param {number} [_attempt] 내부 재시도 카운터 (외부에서 쓰지 말 것)
 * @returns {string|null}
 */
export function pickRandomSentence(text, opts = {}, _attempt = 1) {
  console.log("_attempt", _attempt);
  const maxAttempts = 10;
  const maxLen = Math.max(20, opts.maxLen ?? 100);   // 기본 100, 최소 20
  const minLen = Math.max(10, Math.min(opts.minLen ?? 10, maxLen)); // 기본 40

  if (typeof text !== 'string' || !text.trim()) {
    return null;
  }

  // 1) 문장 분할
  const rawSentences = text
    .split(/(?<=[.?!])\s+|[\r\n]+|(?<=”)\s+/)
    .map(s => s.trim())
    .filter(Boolean);

  // 2) 정리 함수 (불허 특수문자 제거 + 구두점 정리)
  const sanitize = (s) => {
    let t = s.replace(/<[^>]+>/g, '');                   // 태그 제거
    t = t.replaceAll(/[^가-힣A-Za-z0-9 .,\?!'"[:\]\-–—]/gu, ''); // 허용 문자 외 제거
    t = t.replaceAll(/([.?!\-])\1{2,}/g, '$1');            // "!!!" → "!", "..." → "."
    t = t.replaceAll(/\s{2,}/g, ' ').trim();               // 공백 정리
    return t;
  };

  const sentences = rawSentences
    .map(sanitize)
    .map(s => s.replace(/^[“"]\s*|\s*[”"]$/g, '"'))     // 따옴표 균일화(선택)
    .filter(s => s.length >= 4 && s.length <= 160)      // 과도하게 긴 단일 문장 배제
    .filter(s => s.split(/\s+/).length >= 2);           // 단어 2개 이상

  let result = null;

  if (sentences.length > 0) {
    // 3) 연속 병합 후보 생성 (시작 인덱스 셔플)
    const idxs = Array.from({ length: sentences.length }, (_, i) => i);
    for (let i = idxs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [idxs[i], idxs[j]] = [idxs[j], idxs[i]];
    }

    const candidates = [];

    outer:
    for (const start of idxs) {
      let chunk = '';
      for (let cur = start; cur < sentences.length; cur++) {
        const next = sentences[cur];
        const joined = chunk ? `${chunk} ${next}` : next;

        if (joined.length > maxLen) {
          if (chunk.length >= minLen) {
            candidates.push(chunk);
          }
          continue outer;
        }
        chunk = joined;
      }
      if (chunk.length >= minLen && chunk.length <= maxLen) {
        candidates.push(chunk);
      }
    }

    // 후보 없으면 단일 문장 fallback
    let pool = candidates;
    if (pool.length === 0) {
      pool = sentences.filter(s => s.length <= maxLen && s.length >= minLen);
    }

    if (pool.length > 0) {
      const quoted = pool.filter(s => /^["].+["]$/.test(s) || /["]/.test(s));
      const finalPool = quoted.length ? quoted : pool;
      result = finalPool[Math.floor(Math.random() * finalPool.length)];
    }
  }

  // 4) 실패 시 최대 10회까지 재귀 재시도
  if (result == null && _attempt < maxAttempts) {
    return pickRandomChunk(text, opts, _attempt + 1);
  }

  return result; // 그래도 없으면 null
}
