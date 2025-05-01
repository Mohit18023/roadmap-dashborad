export const DEFAULT_IMAGES = {
    ROADMAP: '/default-roadmap.png',
    BADGE: '/default-badge.png',
  } as const;
  
  export const SUPPORTED_FILE_TYPES = {
    PDF: 'application/pdf',
    IMAGE: 'image/*',
  } as const;
  
  export const PROCESSING_STAGES = {
    IDLE: 'idle',
    UPLOADING: 'uploading',
    PROCESSING: 'processing',
    COMPLETE: 'complete',
    ERROR: 'error',
  } as const;
  