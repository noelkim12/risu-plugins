import { openDB } from 'idb';
import { PLUGIN_NAME, PLUGIN_VERSION } from '../constants.js';

const DB_NAME = `${PLUGIN_NAME}-stats`;
const DB_VERSION = 1;

/**
 * ============================================
 * IndexedDB 설계 명세
 * ============================================
 *
 * [Store 1] daily-stats (일자별 통계)
 * ----------------------------------------
 * keyPath: date (YYYY-MM-DD 형식)
 *
 * 필드:
 * - date: string              일자 (YYYY-MM-DD)
 * - totalCharacters: number   입력한 총 글자 수
 * - completedSentences: number 완료한 문장 수
 * - maxWpm: number            해당 일자 최대 WPM
 * - maxCpm: number            해당 일자 최대 CPM
 * - avgWpm: number            해당 일자 평균 WPM
 * - avgCpm: number            해당 일자 평균 CPM
 * - maxAccuracy: number      해당 일자 최고 정확도
 * - avgAccuracy: number      해당 일자 평균 정확도
 * - sessions: number          세션 수 (평균 계산용)
 * - updatedAt: number         마지막 업데이트 타임스탬프
 *
 *
 * [Store 2] total-stats (전체 총계)
 * ----------------------------------------
 * keyPath: id (고정값: 'total')
 *
 * 필드:
 * - id: 'total'               고정 키
 * - totalCharacters: number   전체 입력 글자 수
 * - totalSentences: number    전체 완료 문장 수
 * - maxWpm: number            역대 최고 WPM
 * - maxCpm: number            역대 최고 CPM
 * - avgWpm: number            전체 평균 WPM
 * - avgCpm: number            전체 평균 CPM
 * - maxAccuracy: number      역대 최고 정확도
 * - avgAccuracy: number      전체 평균 정확도
 * - points: number            누적 포인트 (글자 수 = 포인트)
 * - totalSessions: number     전체 세션 수
 * - updatedAt: number         마지막 업데이트 타임스탬프
 *
 *
 * [포인트 시스템]
 * ----------------------------------------
 * - 문장 완료 시 입력한 글자 수만큼 포인트 적립
 * - 포인트는 total-stats에 누적 저장
 * - 예: 50글자 문장 완료 → 50포인트 적립
 *
 *
 * [평균 계산 방식]
 * ----------------------------------------
 * - 일자별 평균: 해당 일자의 모든 세션 평균
 * - 전체 평균: 모든 일자의 세션 평균을 재계산
 *
 * ============================================
 */

const STORE_DAILY = 'daily-stats';
const STORE_TOTAL = 'total-stats';

/**
 * IndexedDB 초기화
 * @returns {Promise<IDBDatabase>}
 */
async function initDB() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // 일자별 통계 Store
      if (!db.objectStoreNames.contains(STORE_DAILY)) {
        const dailyStore = db.createObjectStore(STORE_DAILY, { keyPath: 'date' });
        dailyStore.createIndex('date', 'date', { unique: true });
        dailyStore.createIndex('updatedAt', 'updatedAt');
      }

      // 전체 총계 Store
      if (!db.objectStoreNames.contains(STORE_TOTAL)) {
        db.createObjectStore(STORE_TOTAL, { keyPath: 'id' });
      }
    },
  });
}

/**
 * 오늘 날짜를 YYYY-MM-DD 형식으로 반환
 * @returns {string}
 */
function getTodayDate() {
  const now = new Date();
  return now.toISOString().split('T')[0];
}

/**
 * 타자 세션 기록 (문장 완료 시 호출)
 * @param {Object} sessionData - 세션 데이터
 * @param {number} sessionData.wpm - WPM (Words Per Minute)
 * @param {number} sessionData.cpm - CPM (Characters Per Minute)
 * @param {number} sessionData.characters - 입력한 글자 수
 * @param {number} sessionData.accuracy - 정확도 (0-100)
 * @returns {Promise<{dailyStats: Object, totalStats: Object}>}
 */
export async function recordTypingSession(sessionData) {
  const db = await initDB();
  const today = getTodayDate();
  const timestamp = Date.now();

  const { wpm, cpm, characters, accuracy } = sessionData;
  
  // 1. 일자별 통계 업데이트
  let dailyStats = await db.get(STORE_DAILY, today);

  if (!dailyStats) {
    // 신규 일자 데이터 생성
    dailyStats = {
      date: today,
      totalCharacters: 0,
      completedSentences: 0,
      maxWpm: 0,
      maxCpm: 0,
      avgWpm: 0,
      avgCpm: 0,
      maxAccuracy: 0,
      avgAccuracy: 0,
      sessions: 0,
      updatedAt: timestamp,
    };
  }

  // 기존 데이터 정리 (배열이 있으면 길이로 변환, 숫자가 아니면 0으로 초기화)
  if (Array.isArray(dailyStats.sessions)) {
    dailyStats.sessions = dailyStats.sessions.length;
  } else if (typeof dailyStats.sessions !== 'number' || isNaN(dailyStats.sessions)) {
    dailyStats.sessions = 0;
  }

  // 세션 추가
  dailyStats.sessions += 1;
  dailyStats.totalCharacters += characters;
  dailyStats.completedSentences += 1;
  dailyStats.maxWpm = Math.max(dailyStats.maxWpm, wpm);
  dailyStats.maxCpm = Math.max(dailyStats.maxCpm, cpm);
  dailyStats.maxAccuracy = Math.max(dailyStats.maxAccuracy, accuracy);

  // 평균 계산 (누적 평균 방식)
  const sessionCount = dailyStats.sessions;
  if (sessionCount > 0) {
    // 기존 평균값이 NaN이면 0으로 초기화
    if (isNaN(dailyStats.avgWpm)) dailyStats.avgWpm = 0;
    if (isNaN(dailyStats.avgCpm)) dailyStats.avgCpm = 0;
    if (isNaN(dailyStats.avgAccuracy)) dailyStats.avgAccuracy = 0;
    
    // 누적 평균 계산: (기존평균 * (세션수-1) + 현재값) / 세션수
    dailyStats.avgWpm = ((dailyStats.avgWpm * (sessionCount - 1)) + wpm) / sessionCount;
    dailyStats.avgCpm = ((dailyStats.avgCpm * (sessionCount - 1)) + cpm) / sessionCount;
    dailyStats.avgAccuracy = ((dailyStats.avgAccuracy * (sessionCount - 1)) + accuracy) / sessionCount;
  }
  dailyStats.updatedAt = timestamp;

  await db.put(STORE_DAILY, dailyStats);

  // 2. 전체 총계 업데이트
  let totalStats = await db.get(STORE_TOTAL, 'total');

  if (!totalStats) {
    // 신규 총계 데이터 생성
    totalStats = {
      id: 'total',
      totalCharacters: 0,
      totalSentences: 0,
      maxWpm: 0,
      maxCpm: 0,
      avgWpm: 0,
      avgCpm: 0,
      maxAccuracy: 0,
      avgAccuracy: 0,
      points: 0,
      totalSessions: 0,
      updatedAt: timestamp,
    };
  }

  // 총계 업데이트
  totalStats.totalCharacters += characters;
  totalStats.totalSentences += 1;
  totalStats.maxWpm = Math.max(totalStats.maxWpm, wpm);
  totalStats.maxCpm = Math.max(totalStats.maxCpm, cpm);
  totalStats.maxAccuracy = Math.max(totalStats.maxAccuracy, accuracy);
  totalStats.points += characters; // 글자 수만큼 포인트 적립
  totalStats.totalSessions += 1;
  
  // localStorage에 포인트 저장
  try {
    localStorage.setItem('risu-point', totalStats.points.toString());
  } catch (error) {
    console.warn('Failed to save points to localStorage:', error);
  }

  // 전체 평균 재계산 (누적 평균 방식)
  const totalSessionCount = totalStats.totalSessions;
  if (totalSessionCount > 0) {
    // 기존 평균값이 NaN이면 0으로 초기화
    if (isNaN(totalStats.avgWpm)) totalStats.avgWpm = 0;
    if (isNaN(totalStats.avgCpm)) totalStats.avgCpm = 0;
    if (isNaN(totalStats.avgAccuracy)) totalStats.avgAccuracy = 0;
    
    // 누적 평균 계산: (기존평균 * (세션수-1) + 현재값) / 세션수
    totalStats.avgWpm = ((totalStats.avgWpm * (totalSessionCount - 1)) + wpm) / totalSessionCount;
    totalStats.avgCpm = ((totalStats.avgCpm * (totalSessionCount - 1)) + cpm) / totalSessionCount;
    totalStats.avgAccuracy = ((totalStats.avgAccuracy * (totalSessionCount - 1)) + accuracy) / totalSessionCount;
  }
  totalStats.updatedAt = timestamp;

  await db.put(STORE_TOTAL, totalStats);

  return { dailyStats, totalStats };
}

/**
 * 특정 일자 통계 조회
 * @param {string} date - 조회할 날짜 (YYYY-MM-DD), 생략 시 오늘
 * @returns {Promise<Object|null>}
 */
export async function getDailyStats(date = null) {
  const db = await initDB();
  const targetDate = date || getTodayDate();
  return await db.get(STORE_DAILY, targetDate);
}

/**
 * 전체 총계 조회
 * @returns {Promise<Object>}
 */
export async function getTotalStats() {
  const db = await initDB();
  const stats = await db.get(STORE_TOTAL, 'total');

  // 초기 상태 반환
  if (!stats) {
    return {
      id: 'total',
      totalCharacters: 0,
      totalSentences: 0,
      maxWpm: 0,
      maxCpm: 0,
      avgWpm: 0,
      avgCpm: 0,
      maxAccuracy: 0,
      avgAccuracy: 0,
      points: 0,
      totalSessions: 0,
      updatedAt: Date.now(),
    };
  }

  return stats;
}

/**
 * 모든 일자별 통계 조회 (날짜 내림차순)
 * @param {number} limit - 조회 제한 수 (생략 시 전체)
 * @returns {Promise<Array<Object>>}
 */
export async function getAllDailyStats(limit = null) {
  const db = await initDB();
  const allStats = await db.getAll(STORE_DAILY);

  // 날짜 내림차순 정렬
  allStats.sort((a, b) => b.date.localeCompare(a.date));

  return limit ? allStats.slice(0, limit) : allStats;
}

/**
 * 포인트 조회 (IndexedDB 우선, localStorage 백업)
 * @returns {Promise<number>}
 */
export async function getPoints() {
  const totalStats = await getTotalStats();
  
  // IndexedDB에 데이터가 있으면 사용
  if (totalStats.points > 0) {
    return totalStats.points;
  }
  
  // IndexedDB에 데이터가 없으면 localStorage에서 확인
  try {
    const localPoints = localStorage.getItem('risu-point');
    if (localPoints !== null) {
      const points = parseInt(localPoints, 10);
      if (!isNaN(points) && points >= 0) {
        return points;
      }
    }
  } catch (error) {
    console.warn('Failed to read points from localStorage:', error);
  }
  
  return totalStats.points;
}

/**
 * 특정 일자 통계 삭제
 * @param {string} date - 삭제할 날짜 (YYYY-MM-DD)
 * @returns {Promise<void>}
 */
export async function deleteDailyStats(date) {
  const db = await initDB();
  await db.delete(STORE_DAILY, date);

  // 전체 평균 재계산
  await recalculateTotalStats();
}

/**
 * 전체 통계 초기화 (모든 데이터 삭제)
 * @returns {Promise<void>}
 */
export async function resetAllStats() {
  const db = await initDB();

  // 모든 일자별 통계 삭제
  const allDates = await db.getAllKeys(STORE_DAILY);
  await Promise.all(allDates.map(date => db.delete(STORE_DAILY, date)));

  // 총계 초기화
  await db.put(STORE_TOTAL, {
    id: 'total',
    totalCharacters: 0,
    totalSentences: 0,
    maxWpm: 0,
    maxCpm: 0,
    avgWpm: 0,
    avgCpm: 0,
    maxAccuracy: 0,
    avgAccuracy: 0,
    points: 0,
    totalSessions: 0,
    updatedAt: Date.now(),
  });
  
  // localStorage 포인트 초기화
  try {
    localStorage.setItem('risu-point', '0');
  } catch (error) {
    console.warn('Failed to reset points in localStorage:', error);
  }
}

/**
 * 전체 총계 재계산 (일자별 데이터 기반)
 * @returns {Promise<void>}
 */
async function recalculateTotalStats() {
  const db = await initDB();
  const allDailyStats = await db.getAll(STORE_DAILY);

  let totalCharacters = 0;
  let totalSentences = 0;
  let maxWpm = 0;
  let maxCpm = 0;
  let maxAccuracy = 0;
  let totalWpmSum = 0;
  let totalCpmSum = 0;
  let totalAccuracySum = 0;
  let totalSessionCount = 0;
  let points = 0;

  allDailyStats.forEach(daily => {
    totalCharacters += daily.totalCharacters;
    totalSentences += daily.completedSentences;
    maxWpm = Math.max(maxWpm, daily.maxWpm);
    maxCpm = Math.max(maxCpm, daily.maxCpm);
    maxAccuracy = Math.max(maxAccuracy, daily.maxAccuracy);
    points += daily.totalCharacters; // 글자 수 = 포인트

    // sessions가 배열인 경우 길이로 변환, 숫자가 아니면 0으로 처리
    let sessionCount = 0;
    if (Array.isArray(daily.sessions)) {
      sessionCount = daily.sessions.length;
    } else if (typeof daily.sessions === 'number' && !isNaN(daily.sessions)) {
      sessionCount = daily.sessions;
    }

    totalSessionCount += sessionCount;
    
    // 평균값이 NaN이면 0으로 처리
    const avgWpm = isNaN(daily.avgWpm) ? 0 : daily.avgWpm;
    const avgCpm = isNaN(daily.avgCpm) ? 0 : daily.avgCpm;
    const avgAccuracy = isNaN(daily.avgAccuracy) ? 0 : daily.avgAccuracy;
    
    totalWpmSum += avgWpm * sessionCount;
    totalCpmSum += avgCpm * sessionCount;
    totalAccuracySum += avgAccuracy * sessionCount;
  });

  // 평균 계산 및 NaN 처리
  const avgWpm = totalSessionCount > 0 ? totalWpmSum / totalSessionCount : 0;
  const avgCpm = totalSessionCount > 0 ? totalCpmSum / totalSessionCount : 0;
  const avgAccuracy = totalSessionCount > 0 ? totalAccuracySum / totalSessionCount : 0;

  const totalStats = {
    id: 'total',
    totalCharacters,
    totalSentences,
    maxWpm,
    maxCpm,
    maxAccuracy,
    avgWpm: isNaN(avgWpm) ? 0 : avgWpm,
    avgCpm: isNaN(avgCpm) ? 0 : avgCpm,
    avgAccuracy: isNaN(avgAccuracy) ? 0 : avgAccuracy,
    points,
    totalSessions: totalSessionCount,
    updatedAt: Date.now(),
  };

  await db.put(STORE_TOTAL, totalStats);
  
  // localStorage에 포인트 저장
  try {
    localStorage.setItem('risu-point', totalStats.points.toString());
  } catch (error) {
    console.warn('Failed to save points to localStorage:', error);
  }
}

/**
 * 전체 데이터베이스 조회 (디버깅용)
 * @returns {Promise<{daily: Array, total: Object}>}
 */
export async function getAllData() {
  const db = await initDB();
  const daily = await db.getAll(STORE_DAILY);
  const total = await db.get(STORE_TOTAL, 'total');

  return { daily, total };
}
