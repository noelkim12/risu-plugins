import { compressImage, blobToDataURL, formatFileSize, isValidImageType } from '../../utils/image-compressor.js';
import { getPresetImages, addPresetImage, deletePresetImage } from '../../utils/image-storage.js';

export class LnpmPreviewTab extends HTMLElement {
  constructor() {
    super();
    this.presetId = null;
    this.images = [];
    this.maxImages = 4;
    this.isUploading = false;
  }

  set config({ presetId }) {
    this.presetId = presetId;
    this.loadImages();
  }

  connectedCallback() {
    this.className = "lnpm-preview-tab";
    this.render();
  }

  async loadImages() {
    if (this.presetId === null) return;

    try {
      this.images = await getPresetImages(this.presetId);
      this.render();
    } catch (error) {
      console.error('[LnpmPreviewTab] Failed to load images:', error);
    }
  }

  async handleFileSelect(event) {
    const files = Array.from(event.target.files || []);

    if (files.length === 0) return;

    const remainingSlots = this.maxImages - this.images.length;
    if (remainingSlots <= 0) {
      alert(`최대 ${this.maxImages}개의 이미지만 등록할 수 있습니다.`);
      return;
    }

    const filesToProcess = files.slice(0, remainingSlots);

    // 로딩 시작
    this.isUploading = true;
    this.render();

    try {
      for (const file of filesToProcess) {
        if (!isValidImageType(file)) {
          alert(`지원하지 않는 파일 형식입니다: ${file.name}\n(jpg, png, webp, gif만 지원)`);
          continue;
        }

        try {
          // 압축
          const compressedBlob = await compressImage(file);

          // IndexedDB에 저장
          const imageData = {
            id: `img-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            blob: compressedBlob,
            fileName: file.name,
            size: compressedBlob.size,
          };

          await addPresetImage(this.presetId, imageData);

          // UI 업데이트
          this.images.push(imageData);

          console.log(`[LnpmPreviewTab] Image added: ${file.name}`);
        } catch (error) {
          console.error(`[LnpmPreviewTab] Failed to process ${file.name}:`, error);
          alert(`이미지 처리 실패: ${file.name}\n${error.message}`);
        }
      }
    } finally {
      // 로딩 종료
      this.isUploading = false;
      this.render();

      // input 초기화
      event.target.value = '';
    }
  }

  async handleDeleteImage(imageId) {
    if (!confirm('이 이미지를 삭제하시겠습니까?')) return;

    try {
      await deletePresetImage(this.presetId, imageId);
      this.images = this.images.filter(img => img.id !== imageId);
      this.render();
      console.log(`[LnpmPreviewTab] Image deleted: ${imageId}`);
    } catch (error) {
      console.error('[LnpmPreviewTab] Failed to delete image:', error);
      alert('이미지 삭제 실패');
    }
  }

  async renderImageCard(image) {
    try {
      const dataURL = await blobToDataURL(image.blob);
      return `
        <div class="lnpm-image-card" data-image-id="${image.id}">
          <div class="lnpm-image-preview" style="background-image: url('${dataURL}')"></div>
          <div class="lnpm-image-info">
            <div class="lnpm-image-name">${image.fileName}</div>
            <div class="lnpm-image-size">${formatFileSize(image.size)}</div>
          </div>
          <button class="lnpm-image-delete" data-image-id="${image.id}">×</button>
        </div>
      `;
    } catch (error) {
      console.error('[LnpmPreviewTab] Failed to render image:', error);
      return '';
    }
  }

  async render() {
    const canAddMore = this.images.length < this.maxImages && !this.isUploading;
    const imageCardsHTML = await Promise.all(this.images.map(img => this.renderImageCard(img)));

    this.innerHTML = `
      <div class="lnpm-preview-content">
        <div class="lnpm-preview-header">
          <h3 class="lnpm-preview-title">프리셋 미리보기</h3>
          <div class="lnpm-preview-info">
            ${this.images.length} / ${this.maxImages} 이미지
          </div>
        </div>

        <div class="lnpm-preview-grid">
          ${imageCardsHTML.join('')}

          ${this.isUploading ? `
            <div class="lnpm-loading-card">
              <div class="lnpm-spinner"></div>
              <div class="lnpm-loading-text">업로드 중...</div>
            </div>
          ` : canAddMore ? `
            <label class="lnpm-upload-card">
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.webp,.gif"
                multiple
                style="display: none"
                class="lnpm-file-input"
              />
              <div class="lnpm-upload-icon">+</div>
              <div class="lnpm-upload-text">이미지 추가</div>
            </label>
          ` : ''}
        </div>

        <div class="lnpm-preview-tips">
          <p>• 최대 ${this.maxImages}개의 이미지를 등록할 수 있습니다</p>
          <p>• 지원 형식: JPG, PNG, WebP, GIF</p>
          <p>• 이미지는 자동으로 압축됩니다 (최대 1024px, 500KB)</p>
        </div>
      </div>
    `;

    // 이벤트 리스너 추가
    const fileInput = this.querySelector('.lnpm-file-input');
    if (fileInput) {
      fileInput.addEventListener('change', (e) => this.handleFileSelect(e));
    }

    const deleteButtons = this.querySelectorAll('.lnpm-image-delete');
    deleteButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const imageId = e.target.dataset.imageId;
        this.handleDeleteImage(imageId);
      });
    });
  }
}
