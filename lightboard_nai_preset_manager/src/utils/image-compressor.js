import imageCompression from 'browser-image-compression';

const SUPPORTED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
const MAX_SIZE_MB = 0.5;
const MAX_WIDTH_OR_HEIGHT = 1024;

/**
 * 파일 타입 검증
 * @param {File} file - 검증할 파일
 * @returns {boolean}
 */
export function isValidImageType(file) {
  return SUPPORTED_TYPES.includes(file.type);
}

/**
 * 파일 확장자 검증
 * @param {string} fileName - 파일명
 * @returns {boolean}
 */
export function isValidImageExtension(fileName) {
  const ext = fileName.toLowerCase().split('.').pop();
  return ['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext);
}

/**
 * 이미지 압축
 * @param {File} file - 압축할 이미지 파일
 * @returns {Promise<Blob>} 압축된 이미지 Blob
 */
export async function compressImage(file) {
  if (!isValidImageType(file)) {
    throw new Error(`Unsupported file type: ${file.type}. Allowed: jpg, png, webp, gif`);
  }

  // GIF는 압축하지 않고 원본 반환 (애니메이션 보존)
  if (file.type === 'image/gif') {
    return file;
  }

  const options = {
    maxSizeMB: MAX_SIZE_MB,
    maxWidthOrHeight: MAX_WIDTH_OR_HEIGHT,
    useWebWorker: true,
    fileType: file.type,
  };

  try {
    const compressedFile = await imageCompression(file, options);
    console.log(`[ImageCompressor] Compressed ${file.name}: ${(file.size / 1024).toFixed(2)}KB → ${(compressedFile.size / 1024).toFixed(2)}KB`);
    return compressedFile;
  } catch (error) {
    console.error('[ImageCompressor] Compression failed:', error);
    throw error;
  }
}

/**
 * 여러 이미지 압축
 * @param {FileList|Array<File>} files - 압축할 이미지 파일들
 * @returns {Promise<Array<{original: File, compressed: Blob}>>}
 */
export async function compressImages(files) {
  const fileArray = Array.from(files);
  const results = [];

  for (const file of fileArray) {
    try {
      const compressed = await compressImage(file);
      results.push({
        original: file,
        compressed,
      });
    } catch (error) {
      console.error(`[ImageCompressor] Failed to compress ${file.name}:`, error);
      throw error;
    }
  }

  return results;
}

/**
 * Blob을 Data URL로 변환
 * @param {Blob} blob - 변환할 Blob
 * @returns {Promise<string>} Data URL
 */
export function blobToDataURL(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * 파일 크기 포맷팅
 * @param {number} bytes - 바이트 크기
 * @returns {string} 포맷된 문자열 (e.g., "1.5 MB")
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}
