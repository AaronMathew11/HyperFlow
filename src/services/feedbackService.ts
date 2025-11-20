/**
 * Feedback Service
 *
 * Handles all communication with Google Sheets backend
 */

import { FEEDBACK_CONFIG, FeedbackData, StatusType } from '../config/feedbackConfig';

// Helper to get device type
const getDeviceType = (): string => {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

// Helper to get OS info
const getOSInfo = (): string => {
  const userAgent = navigator.userAgent;
  if (userAgent.includes('Win')) return 'Windows';
  if (userAgent.includes('Mac')) return 'MacOS';
  if (userAgent.includes('Linux')) return 'Linux';
  if (userAgent.includes('Android')) return 'Android';
  if (userAgent.includes('iOS')) return 'iOS';
  return 'Unknown';
};

// Generate UUID (polyfill for older browsers)
const generateUUID = (): string => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback UUID generation
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

/**
 * Submit feedback to Google Sheets
 */
export const submitFeedback = async (
  feedbackText: string,
  feedbackType: string,
  screenshotBase64: string | null,
  currentUser: { id: string; email: string; name: string },
  elementDetails?: {
    selector?: string;
    xpath?: string;
    text?: string;
    html?: string;
  },
  priority: string = 'medium',
  additionalContext?: Record<string, any>
): Promise<{ success: boolean; message: string; id?: string }> => {
  try {
    const feedbackData: FeedbackData = {
      id: generateUUID(),
      userId: currentUser.id,
      userEmail: currentUser.email,
      userName: currentUser.name,
      feedbackText,
      feedbackType: feedbackType as any,
      status: 'new',
      priority: priority as any,
      screenshotBase64: screenshotBase64 || undefined,
      elementSelector: elementDetails?.selector,
      elementXPath: elementDetails?.xpath,
      elementText: elementDetails?.text,
      elementHtml: elementDetails?.html,
      pageUrl: window.location.href,
      pageTitle: document.title,
      browserInfo: navigator.userAgent,
      screenResolution: `${screen.width}x${screen.height}`,
      viewportSize: `${window.innerWidth}x${window.innerHeight}`,
      deviceType: getDeviceType(),
      osInfo: getOSInfo(),
      contextData: additionalContext ? JSON.stringify(additionalContext) : undefined
    };

    const response = await fetch(FEEDBACK_CONFIG.GOOGLE_SHEETS_API_URL, {
      method: 'POST',
      mode: 'no-cors', // Required for Google Apps Script
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        action: 'addFeedback',
        feedback: feedbackData
      })
    });

    // Note: with no-cors mode, we can't read the response
    // Assume success if no error was thrown
    return {
      success: true,
      message: 'Feedback submitted successfully',
      id: feedbackData.id
    };

  } catch (error) {
    console.error('Error submitting feedback:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to submit feedback'
    };
  }
};

/**
 * Get all feedback (requires CORS to be properly configured)
 */
export const getAllFeedback = async (): Promise<FeedbackData[]> => {
  try {
    const response = await fetch(
      `${FEEDBACK_CONFIG.GOOGLE_SHEETS_API_URL}?action=getAllFeedback`
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching feedback:', error);
    return [];
  }
};

/**
 * Get feedback by user ID
 */
export const getFeedbackByUser = async (userId: string): Promise<FeedbackData[]> => {
  try {
    const response = await fetch(
      `${FEEDBACK_CONFIG.GOOGLE_SHEETS_API_URL}?action=getFeedbackByUser&userId=${userId}`
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user feedback:', error);
    return [];
  }
};

/**
 * Get feedback by status
 */
export const getFeedbackByStatus = async (status: StatusType): Promise<FeedbackData[]> => {
  try {
    const response = await fetch(
      `${FEEDBACK_CONFIG.GOOGLE_SHEETS_API_URL}?action=getFeedbackByStatus&status=${status}`
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching feedback by status:', error);
    return [];
  }
};

/**
 * Update feedback status
 */
export const updateFeedbackStatus = async (
  feedbackId: string,
  newStatus: StatusType,
  changedBy: string,
  reason?: string
): Promise<{ success: boolean; message: string }> => {
  try {
    await fetch(FEEDBACK_CONFIG.GOOGLE_SHEETS_API_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        action: 'updateStatus',
        id: feedbackId,
        status: newStatus,
        changedBy,
        reason: reason || `Status changed to ${newStatus}`
      })
    });

    return {
      success: true,
      message: 'Status updated successfully'
    };
  } catch (error) {
    console.error('Error updating status:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to update status'
    };
  }
};

/**
 * Add comment to feedback
 */
export const addComment = async (
  feedbackId: string,
  userId: string,
  userRole: string,
  comment: string,
  isInternal: boolean = false
): Promise<{ success: boolean; message: string }> => {
  try {
    await fetch(FEEDBACK_CONFIG.GOOGLE_SHEETS_API_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        action: 'addComment',
        comment: {
          id: generateUUID(),
          feedbackId,
          userId,
          userRole,
          comment,
          isInternal
        }
      })
    });

    return {
      success: true,
      message: 'Comment added successfully'
    };
  } catch (error) {
    console.error('Error adding comment:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to add comment'
    };
  }
};

/**
 * Get notifications for user
 */
export const getNotifications = async (
  userId: string,
  unreadOnly: boolean = false
): Promise<any[]> => {
  try {
    const response = await fetch(
      `${FEEDBACK_CONFIG.GOOGLE_SHEETS_API_URL}?action=getNotifications&userId=${userId}&unreadOnly=${unreadOnly}`
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return [];
  }
};

/**
 * Mark notification as read
 */
export const markNotificationAsRead = async (
  notificationId: string
): Promise<{ success: boolean; message: string }> => {
  try {
    await fetch(FEEDBACK_CONFIG.GOOGLE_SHEETS_API_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        action: 'markNotificationRead',
        id: notificationId
      })
    });

    return {
      success: true,
      message: 'Notification marked as read'
    };
  } catch (error) {
    console.error('Error marking notification as read:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to mark as read'
    };
  }
};

/**
 * Dismiss notification
 */
export const dismissNotification = async (
  notificationId: string
): Promise<{ success: boolean; message: string }> => {
  try {
    await fetch(FEEDBACK_CONFIG.GOOGLE_SHEETS_API_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        action: 'dismissNotification',
        id: notificationId
      })
    });

    return {
      success: true,
      message: 'Notification dismissed'
    };
  } catch (error) {
    console.error('Error dismissing notification:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to dismiss notification'
    };
  }
};

export default {
  submitFeedback,
  getAllFeedback,
  getFeedbackByUser,
  getFeedbackByStatus,
  updateFeedbackStatus,
  addComment,
  getNotifications,
  markNotificationAsRead,
  dismissNotification
};
