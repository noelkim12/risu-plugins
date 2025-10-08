import { openDB } from 'idb';

const DB_NAME = 'lnpm-preset-images';
const DB_VERSION = 1;
const STORE_NAME = 'images';

/**
 * IndexedDB 초기화
 * @returns {Promise<IDBDatabase>}
 */
async function initDB() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'presetId' });
        store.createIndex('presetId', 'presetId', { unique: true });
      }
    },
  });
}

/**
 * 프리셋 이미지 저장
 * @param {number} presetId - 프리셋 ID
 * @param {Array<{id: string, blob: Blob, fileName: string, size: number}>} images - 이미지 배열
 * @returns {Promise<void>}
 */
export async function savePresetImages(presetId, images) {
  const db = await initDB();
  await db.put(STORE_NAME, {
    presetId,
    images: images.map(img => ({
      id: img.id,
      blob: img.blob,
      fileName: img.fileName,
      size: img.size,
      timestamp: img.timestamp || Date.now(),
    })),
    updatedAt: Date.now(),
  });
}

/**
 * 프리셋 이미지 조회
 * @param {number} presetId - 프리셋 ID
 * @returns {Promise<Array<{id: string, blob: Blob, fileName: string, size: number, timestamp: number}>>}
 */
export async function getPresetImages(presetId) {
  const db = await initDB();
  const data = await db.get(STORE_NAME, presetId);
  return data ? data.images : [];
}

/**
 * 특정 이미지 삭제
 * @param {number} presetId - 프리셋 ID
 * @param {string} imageId - 이미지 ID
 * @returns {Promise<void>}
 */
export async function deletePresetImage(presetId, imageId) {
  const db = await initDB();
  const data = await db.get(STORE_NAME, presetId);

  if (data) {
    data.images = data.images.filter(img => img.id !== imageId);
    data.updatedAt = Date.now();

    if (data.images.length > 0) {
      await db.put(STORE_NAME, data);
    } else {
      await db.delete(STORE_NAME, presetId);
    }
  }
}

/**
 * 프리셋의 모든 이미지 삭제
 * @param {number} presetId - 프리셋 ID
 * @returns {Promise<void>}
 */
export async function deleteAllPresetImages(presetId) {
  const db = await initDB();
  await db.delete(STORE_NAME, presetId);
}

/**
 * 이미지 추가 (기존 이미지에 추가)
 * @param {number} presetId - 프리셋 ID
 * @param {Object} image - 추가할 이미지
 * @returns {Promise<void>}
 */
export async function addPresetImage(presetId, image) {
  const db = await initDB();
  let data = await db.get(STORE_NAME, presetId);

  if (!data) {
    data = { presetId, images: [], updatedAt: Date.now() };
  }

  // 최대 4개 제한
  if (data.images.length >= 4) {
    throw new Error('Maximum 4 images allowed per preset');
  }

  data.images.push({
    id: image.id,
    blob: image.blob,
    fileName: image.fileName,
    size: image.size,
    timestamp: Date.now(),
  });

  data.updatedAt = Date.now();
  await db.put(STORE_NAME, data);
}

/**
 * 전체 데이터베이스 조회 (디버깅용)
 * @returns {Promise<Array>}
 */
export async function getAllPresetImages() {
  const db = await initDB();
  return db.getAll(STORE_NAME);
}
