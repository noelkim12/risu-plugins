/**
 * findOriginalRangeFromHtml
 * @param {string} originalMd - 원본 마크다운 전체 문자열
 * @param {string} replacedHtml - 정규식 치환 후 화면에 표시되는 HTML(해당 블록의 outerHTML 또는 innerHTML)
 * @param {object} [opts]
 * @param {number} [opts.anchor=12] - 앵커 길이(앞/뒤)
 * @param {number} [opts.fuzzyMaxLen=120] - 근사 탐색 허용 최대 길이
 * @param {number} [opts.fuzzyCutoff=20] - 편집거리 컷오프
 * @returns {{start:number,end:number, method:'exact'|'anchor'|'fuzzy'}|null}
 */
function findOriginalRangeFromHtml(originalMd, replacedHtml, opts = {}) {
    const ANCH = opts.anchor ?? 6;
    const FUZZY_MAX = opts.fuzzyMaxLen ?? 200;
    const CUTOFF = opts.fuzzyCutoff ?? 20;
  
    // --- 1) HTML → 평문 ---
    const plain = htmlToPlain(replacedHtml);
    if (!plain) return null;
  
    // --- 2) 정규화 + (md 전용) 인덱스 맵 생성 ---
    const { norm: mdN, map: mdMap } = normalizeWithMap(originalMd);
    const { norm: plN } = normalizeWithMap(plain); // 비교만 필요, 맵 불필요
  
    console.log(mdN, plN);
    console.log(mdMap);
    // --- 3) 1순위: 전체 일치 ---
    let idx = mdN.indexOf(plN);
    if (idx >= 0) return mapBack(idx, idx + plN.length);
  
    // --- 4) 2순위: 앵커(head/tail) 일치 ---
    const N = Math.max(8, Math.min(ANCH, Math.floor(plN.length / 3)));
    if (plN.length >= N * 2) {
      const head = plN.slice(0, N);
      const tail = plN.slice(-N);
      const headPos = mdN.indexOf(head);
      if (headPos >= 0) {
        const tailPos = mdN.indexOf(tail, headPos + head.length);
        if (tailPos >= 0) return mapBack(headPos, tailPos + N, 'anchor');
      }
    }
  
    // --- 5) 3순위: 근사 탐색(짧은 텍스트 한정) ---
    if (plN.length <= FUZZY_MAX) {
      let best = { pos: -1, dist: Infinity };
      const step = 8; // 스캔 스텝
      for (let i = 0; i + plN.length <= mdN.length; i += step) {
        const seg = mdN.slice(i, i + plN.length);
        const d = fastEditDistance(plN, seg, CUTOFF);
        if (d < best.dist) { best = { pos: i, dist: d }; if (d === 0) break; }
      }
      if (best.pos >= 0 && best.dist <= Math.max(5, Math.floor(plN.length * 0.15))) {
        return mapBack(best.pos, best.pos + plN.length, 'fuzzy');
      }
    }
  
    return null;
  
    // --- 헬퍼 함수 영역 ---
    /**
     * 
     * @param {*} nStart 
     * @param {*} nEnd 
     * @param {*} method 
     * @returns 
     */
    function mapBack(nStart, nEnd, method = 'exact') {
      // 정규화 문자열 인덱스를 원본으로 역투영
      const start = mdMap[nStart];
      // 끝 인덱스: nEnd는 'exclusive'로 처리 → 마지막 문자 맵을 이용해 +1
      const end = nEnd - 1 < mdMap.length ? (mdMap[nEnd - 1] + 1) : originalMd.length;
      return { start, end, method };
    }
  
    function htmlToPlain(htmlOrFragment) {
      // 문자열/DOM 모두 지원
      let html = '';
      if (typeof htmlOrFragment === 'string') html = htmlOrFragment;
      else if (htmlOrFragment && htmlOrFragment.outerHTML) html = htmlOrFragment.outerHTML;
      else if (htmlOrFragment && htmlOrFragment.innerHTML) html = htmlOrFragment.innerHTML;
      else return '';
  
      const div = document.createElement('div');
      div.innerHTML = html;
  
      // ruby 보정: <ruby>베이스<rt>루비</rt></ruby> → "베이스(루비)"
      div.querySelectorAll('ruby').forEach(rb => {
        const base = rb.cloneNode(true);
        base.querySelectorAll('rt, rp').forEach(n => n.remove());
        const rt = rb.querySelector('rt')?.textContent || '';
        const text = `${base.textContent || ''}${rt ? `(${rt})` : ''}`;
        rb.replaceWith(document.createTextNode(text));
      });
  
      return div.textContent || '';
    }
  
    function normalizeWithMap(s) {
      // 개행 통일, NBSP→space, 제로폭 제거, 연속 공백 축약
      // (주의) NFC는 맵핑 복잡도가 커서 생략. 한글/일반문자에선 실전상 문제 드묾.
      const out = [];
      const map = [];
      const len = s.length;
      let i = 0;
  
      while (i < len) {
        const ch = s[i];
  
        // \r\n → \n, 단독 \r → \n
        if (ch === '\r') {
          const next = s[i + 1];
          // 개행 하나만 출력
          out.push('\n'); map.push(i);
          i += (next === '\n') ? 2 : 1;
          continue;
        }
  
        // 제로폭 문자 제거
        if (ch >= '\u200B' && ch <= '\u200D' || ch === '\uFEFF') { i++; continue; }
  
        // NBSP → space
        if (ch === '\u00A0') { out.push(' '); map.push(i); i++; continue; }
  
        // 공백/탭 런을 ' ' 하나로 축약
        if (ch === ' ' || ch === '\t') {
          // 이미 바로 앞이 공백이면 스킵
          if (out.length > 0 && out[out.length - 1] === ' ') { i++; continue; }
          out.push(' '); map.push(i); i++;
          continue;
        }
  
        // 일반 문자
        out.push(ch); map.push(i); i++;
      }
  
      return { norm: out.join(''), map };
    }
  
    function fastEditDistance(a, b, cutoff = 30) {
      const n = a.length, m = b.length;
      if (Math.abs(n - m) > cutoff) return cutoff + 1;
      const dp = new Array(m + 1);
      for (let j = 0; j <= m; j++) dp[j] = j;
      for (let i = 1; i <= n; i++) {
        let prev = dp[0]; dp[0] = i;
        let rowMin = dp[0];
        for (let j = 1; j <= m; j++) {
          const tmp = dp[j];
          const cost = a.charCodeAt(i - 1) === b.charCodeAt(j - 1) ? 0 : 1;
          dp[j] = Math.min(
            dp[j] + 1,
            dp[j - 1] + 1,
            prev + cost
          );
          prev = tmp;
          if (dp[j] < rowMin) rowMin = dp[j];
        }
        if (rowMin > cutoff) return cutoff + 1; // 가지치기
      }
      return dp[m];
    }
  }
  