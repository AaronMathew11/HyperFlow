/**
 * React Visual Feedback - Configuration
 *
 * This file contains the configuration for your Google Sheets backend
 */

export const FEEDBACK_CONFIG = {
  // Your deployed Google Apps Script Web App URL
  GOOGLE_SHEETS_API_URL: 'https://script.google.com/macros/s/AKfycbxHKfJxgJCrcOPwzvcGUIvYs-ZjS6QQylRv1qTmF2oGt69ExSQE9eff6Wki4Votx8pp/exec',

  // Feedback types
  FEEDBACK_TYPES: {
    BUG: 'bug',
    FEATURE: 'feature',
    IMPROVEMENT: 'improvement',
    QUESTION: 'question'
  } as const,

  // Status types
  STATUS_TYPES: {
    NEW: 'new',
    ACKNOWLEDGED: 'acknowledged',
    IN_PROGRESS: 'in_progress',
    NEEDS_INFO: 'needs_info',
    PLANNED: 'planned',
    COMPLETED: 'completed',
    REJECTED: 'rejected'
  } as const,

  // Priority levels
  PRIORITY_LEVELS: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical'
  } as const,

  // User roles
  USER_ROLES: {
    USER: 'user',
    DEVELOPER: 'developer',
    ADMIN: 'admin'
  } as const,

  // Screenshot settings
  SCREENSHOT_SETTINGS: {
    // Compression quality (0-1, lower = smaller file)
    quality: 0.7,

    // Scale factor (0-1, lower = smaller dimensions)
    scale: 0.5,

    // Format: 'image/jpeg' or 'image/png'
    format: 'image/jpeg' as const,

    // Max width/height (pixels) - images will be resized if larger
    maxWidth: 1920,
    maxHeight: 1080
  },

  // API retry settings
  RETRY_SETTINGS: {
    maxRetries: 3,
    retryDelay: 1000 // milliseconds
  }
};

// Type definitions
export type FeedbackType = typeof FEEDBACK_CONFIG.FEEDBACK_TYPES[keyof typeof FEEDBACK_CONFIG.FEEDBACK_TYPES];
export type StatusType = typeof FEEDBACK_CONFIG.STATUS_TYPES[keyof typeof FEEDBACK_CONFIG.STATUS_TYPES];
export type PriorityLevel = typeof FEEDBACK_CONFIG.PRIORITY_LEVELS[keyof typeof FEEDBACK_CONFIG.PRIORITY_LEVELS];
export type UserRole = typeof FEEDBACK_CONFIG.USER_ROLES[keyof typeof FEEDBACK_CONFIG.USER_ROLES];

export interface FeedbackData {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  feedbackText: string;
  feedbackType: FeedbackType;
  status?: StatusType;
  priority?: PriorityLevel;
  screenshotBase64?: string;
  screenshotUrl?: string;
  elementSelector?: string;
  elementXPath?: string;
  elementText?: string;
  elementHtml?: string;
  pageUrl: string;
  pageTitle: string;
  browserInfo: string;
  screenResolution: string;
  viewportSize: string;
  deviceType: string;
  osInfo: string;
  contextData?: string;
  assignedTo?: string;
  createdAt?: Date;
  updatedAt?: Date;
  resolvedAt?: Date;
  isDeleted?: boolean;
}

// Helper function to validate feedback data
export const validateFeedbackData = (data: Partial<FeedbackData>) => {
  const errors: string[] = [];

  if (!data.feedbackText || data.feedbackText.trim().length === 0) {
    errors.push('Feedback text is required');
  }

  if (!data.feedbackType || !Object.values(FEEDBACK_CONFIG.FEEDBACK_TYPES).includes(data.feedbackType)) {
    errors.push('Valid feedback type is required');
  }

  if (!data.userId) {
    errors.push('User ID is required');
  }

  if (!data.userEmail) {
    errors.push('User email is required');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export default FEEDBACK_CONFIG;
