const typingText = document.querySelector(".typing-text p"),
inpField = document.querySelector(".wrapper .input-field"),
tryAgainBtn = document.querySelector(".content button"),
mistakeTag = document.querySelector(".mistake span"),
wpmTag = document.querySelector(".wpm span"),
cpmTag = document.querySelector(".cpm span");

let charIndex = mistakes = isTyping = 0;
let isComposing = false;
let targetText = ""; // 타이핑 대상 문자열

/**
 * 새로운 문단을 로드하고 초기화
 * - 랜덤하게 문단 선택
 * - span 요소들을 생성하고 공백에 space 클래스 추가
 * - 첫 번째 span에 active 클래스 추가
 */
function loadParagraph() {
    const ranIndex = Math.floor(Math.random() * paragraphs.length);
    targetText = paragraphs[ranIndex]; // 타이핑 대상 문자열 저장
    typingText.innerHTML = "";
    inpField.value = "";
    charIndex = mistakes = isTyping = 0;
    isComposing = false;
    inpField.value = "";
    // 시작 시간 초기화
    window.startTime = null;
    // typing-current 클래스 제거
    const characters = typingText.querySelectorAll("span");
    characters.forEach(span => {
        span.classList.remove("typing-current");
    });
    targetText.split("").forEach(char => {
        let spanClass = char === ' ' ? 'space' : '';
        let span = `<span class="${spanClass}">${char}</span>`
        typingText.innerHTML += span;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

/**
 * 타이핑 입력을 처리하는 메인 함수
 * - 한글 조합 중일 때는 처리하지 않음
 * - 정답/오답 판정 및 클래스 부여
 * - WPM, CPM, mistake 카운트 업데이트
 * - 타이핑 완료 시 onTypingComplete() 호출
 */
function initTyping() {
    // 한글 조합 중일 때는 처리하지 않음
    if(isComposing) {
        updateTypingTextDisplay();
        return;
    }
    
    let characters = typingText.querySelectorAll("span");
    let currentInput = inpField.value;
    
    // 현재 입력 중인 내용을 typing-text 영역에 표시
    updateTypingTextDisplay();
    
    if(charIndex < characters.length - 1) {
        if(!isTyping) {
            isTyping = true;
        }
        
        // 현재 입력된 문자 수에 따라 처리
        if(currentInput.length > charIndex) {
            // 새로운 문자가 입력된 경우
            let typedChar = currentInput[charIndex];
            let targetChar = targetText[charIndex];
            
            // 정답/오답 판정
            if(typedChar === targetChar) {
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        } else if(currentInput.length < charIndex) {
            // 백스페이스로 문자가 삭제된 경우
            if(charIndex > 0) {
                charIndex--;
                if(characters[charIndex].classList.contains("incorrect")) {
                    mistakes--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        }
        
        // active 클래스 업데이트
        updateActiveDisplay();

        // WPM 계산을 위해 시작 시간 기록
        if(!window.startTime) {
            window.startTime = Date.now();
        }
        let elapsedTime = (Date.now() - window.startTime) / 1000; // 초 단위
        
        // 정확히 타이핑한 문자 수만 계산 (mistake 제외, 공백 제외)
        let correctChars = 0;
        for (let i = 0; i < charIndex; i++) {
            if (targetText[i] !== ' ' && !characters[i].classList.contains("incorrect")) {
                correctChars++;
            }
        }
        
        let wpm = Math.round((correctChars / 5) / (elapsedTime / 60));
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        
        wpmTag.innerText = wpm;
        mistakeTag.innerText = mistakes;
        cpmTag.innerText = correctChars; // 정확히 타이핑한 문자 수만 표시
    } else {
        // 타이핑 완료
        inpField.value = "";
        onTypingComplete();
    }   
}


/**
 * 타이핑 중인 내용을 시각적으로 표시
 * - 입력된 문자들에 typing-current 클래스 추가
 * - active span 업데이트
 */
function updateTypingTextDisplay() {
    // 현재 입력 중인 내용을 typing-text 영역에 표시
    const currentInput = inpField.value;
    const characters = typingText.querySelectorAll("span");
    
    // 모든 typing-current 클래스 제거
    characters.forEach(span => span.classList.remove("typing-current"));
    
    // 현재 입력된 문자들을 하이라이트로 표시
    for (let i = 0; i < currentInput.length && i < characters.length; i++) {
        characters[i].classList.add("typing-current");
    }
    
    // active 클래스에 현재 타이핑 중인 내용 표시
    updateActiveDisplay();
}

/**
 * 현재 타이핑 위치의 active span을 업데이트
 * - active 클래스를 현재 타이핑 위치로 이동
 * - 타이핑 중인 글자 또는 원본 글자 표시
 */
function updateActiveDisplay() {
    const currentInput = inpField.value;
    const characters = typingText.querySelectorAll("span");
    
    // 모든 active 클래스 제거
    characters.forEach(span => span.classList.remove("active"));
    
    // 현재 타이핑 위치의 문자에 active 클래스 추가
    if(charIndex < characters.length) {
        characters[charIndex].classList.add("active");
        
        // active span에 현재 타이핑 중인 글자만 표시
        if(currentInput.length > charIndex) {
            console.log("currentInput[charIndex]", currentInput[charIndex])
            // 현재 타이핑 중인 글자
            characters[charIndex].innerText = currentInput[charIndex] == " " ? "　" : currentInput[charIndex];
        } else {
            // 아직 타이핑하지 않은 글자는 원본 표시
            characters[charIndex].innerText = targetText[charIndex];
        }
    }
}

/**
 * 남은 타이핑할 내용을 반환
 * @returns {string} 현재 위치부터 끝까지의 텍스트
 */
function getRemainingContent() {
    const characters = typingText.querySelectorAll("span");
    let remaining = "";
    
    // 현재 위치부터 끝까지의 내용을 가져옴
    for (let i = charIndex; i < characters.length; i++) {
        remaining += characters[i].innerText;
    }
    
    return remaining;
}

/**
 * 타이핑 완료 시 호출되는 함수
 * - 최종 결과 표시
 * - 통계 계산 및 표시
 * - 완료 메시지 또는 다음 단계 안내
 */
function onTypingComplete() {
    
    console.log("타이핑 완료!");
    console.log(`최종 WPM: ${wpmTag.innerText}`);
    console.log(`최종 CPM: ${cpmTag.innerText}`);
    console.log(`총 실수: ${mistakeTag.innerText}`);
    
    // 여기에 완료 후 처리 로직 추가 가능
    // 예: 결과 저장, 다음 문단 로드, 통계 업데이트 등
    loadParagraph();
}

/**
 * 게임을 초기화하고 새 문단을 로드
 * - 모든 변수 초기화
 * - 새로운 문단 로드
 * - UI 상태 초기화
 */
function resetGame() {
    loadParagraph();
    charIndex = mistakes = isTyping = 0;
    isComposing = false;
    inpField.value = "";
    wpmTag.innerText = 0;
    mistakeTag.innerText = 0;
    cpmTag.innerText = 0;
    // 시작 시간 초기화
    window.startTime = null;
    // typing-current 클래스 제거
    const characters = typingText.querySelectorAll("span");
    characters.forEach(span => {
        span.classList.remove("typing-current");
    });
}

/**
 * 한글 조합 시작 이벤트 핸들러
 * - 조합 상태를 true로 설정
 * - 시각적 표시 업데이트
 */
function handleCompositionStart() {
    isComposing = true;
    updateTypingTextDisplay();
}

/**
 * 한글 조합 중 이벤트 핸들러
 * - 조합 중인 내용을 시각적으로 표시
 */
function handleCompositionUpdate() {
    updateTypingTextDisplay();
}

/**
 * 한글 조합 완료 이벤트 핸들러
 * - 조합 상태를 false로 설정
 * - 실제 타이핑 처리 실행
 */
function handleCompositionEnd() {
    isComposing = false;
    // 조합이 끝난 후 실제 타이핑 처리
    initTyping();
}

loadParagraph();
inpField.addEventListener("input", initTyping);
inpField.addEventListener("compositionstart", handleCompositionStart);
inpField.addEventListener("compositionupdate", handleCompositionUpdate);
inpField.addEventListener("compositionend", handleCompositionEnd);
tryAgainBtn.addEventListener("click", resetGame);
updateActiveDisplay();