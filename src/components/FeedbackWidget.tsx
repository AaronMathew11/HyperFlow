/**
 * Feedback Widget Component
 *
 * Integrates react-visual-feedback with Google Sheets backend
 */

import React, { useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { submitFeedback } from '../services/feedbackService';
import { FEEDBACK_CONFIG } from '../config/feedbackConfig';

interface FeedbackWidgetProps {
  currentUser: {
    id: string;
    email: string;
    name: string;
  };
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

const FeedbackWidget: React.FC<FeedbackWidgetProps> = ({
  currentUser,
  onSuccess,
  onError
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackType, setFeedbackType] = useState('bug');
  const [priority, setPriority] = useState('medium');
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(null);
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(null);

  // Keyboard shortcut to open widget (Ctrl+Q)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'q') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape' && (isOpen || isSelecting)) {
        setIsOpen(false);
        setIsSelecting(false);
        setHoveredElement(null);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isOpen, isSelecting]);

  // Element selection mode
  useEffect(() => {
    if (!isSelecting) {
      setHoveredElement(null);
      return;
    }

    const handleMouseOver = (e: MouseEvent) => {
      e.stopPropagation();
      const target = e.target as HTMLElement;
      if (target && !target.closest('.feedback-widget')) {
        setHoveredElement(target);
      }
    };

    const handleClick = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const target = e.target as HTMLElement;
      if (target && !target.closest('.feedback-widget')) {
        setSelectedElement(target);
        setIsSelecting(false);
        setHoveredElement(null);
      }
    };

    document.addEventListener('mouseover', handleMouseOver, true);
    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver, true);
      document.removeEventListener('click', handleClick, true);
    };
  }, [isSelecting]);

  // Add visual highlight to hovered element
  useEffect(() => {
    if (hoveredElement) {
      hoveredElement.style.outline = '2px solid #3b82f6';
      hoveredElement.style.outlineOffset = '2px';
      return () => {
        hoveredElement.style.outline = '';
        hoveredElement.style.outlineOffset = '';
      };
    }
  }, [hoveredElement]);

  // Capture screenshot
  const captureScreenshot = async () => {
    try {
      // Temporarily hide the widget
      const widget = document.querySelector('.feedback-widget') as HTMLElement;
      const originalDisplay = widget?.style.display || '';
      if (widget) widget.style.display = 'none';

      const canvas = await html2canvas(document.body, {
        useCORS: true,
        allowTaint: true,
        scale: FEEDBACK_CONFIG.SCREENSHOT_SETTINGS.scale,
        width: Math.min(window.innerWidth, FEEDBACK_CONFIG.SCREENSHOT_SETTINGS.maxWidth),
        height: Math.min(window.innerHeight, FEEDBACK_CONFIG.SCREENSHOT_SETTINGS.maxHeight)
      });

      // Restore widget
      if (widget) widget.style.display = originalDisplay;

      // Convert to base64 with compression
      const base64 = canvas.toDataURL(
        FEEDBACK_CONFIG.SCREENSHOT_SETTINGS.format,
        FEEDBACK_CONFIG.SCREENSHOT_SETTINGS.quality
      );

      setScreenshot(base64);
      return base64;
    } catch (error) {
      console.error('Screenshot capture failed:', error);
      return null;
    }
  };

  // Get element details
  const getElementDetails = (element: HTMLElement | null) => {
    if (!element) return {};

    return {
      selector: getCSSSelector(element),
      xpath: getXPath(element),
      text: element.textContent?.substring(0, 500) || '',
      html: element.outerHTML?.substring(0, 1000) || ''
    };
  };

  // Generate CSS selector
  const getCSSSelector = (element: HTMLElement): string => {
    if (element.id) return `#${element.id}`;
    if (element.className) {
      const classes = element.className.split(' ').filter(c => c).join('.');
      if (classes) return `.${classes}`;
    }
    return element.tagName.toLowerCase();
  };

  // Generate XPath
  const getXPath = (element: HTMLElement): string => {
    if (element.id) return `//*[@id="${element.id}"]`;
    if (element === document.body) return '/html/body';

    let path = '';
    let current: HTMLElement | null = element;

    while (current && current !== document.body) {
      let index = 1;
      let sibling = current.previousSibling;

      while (sibling) {
        if (sibling.nodeType === Node.ELEMENT_NODE &&
            (sibling as HTMLElement).tagName === current.tagName) {
          index++;
        }
        sibling = sibling.previousSibling;
      }

      path = `/${current.tagName.toLowerCase()}[${index}]${path}`;
      current = current.parentNode as HTMLElement;
    }

    return `/html/body${path}`;
  };

  // Handle submit
  const handleSubmit = async () => {
    if (!feedbackText.trim()) {
      onError?.('Please enter feedback text');
      return;
    }

    setIsSubmitting(true);

    try {
      // Capture screenshot if not already captured
      const screenshotData = screenshot || await captureScreenshot();

      // Submit feedback
      const result = await submitFeedback(
        feedbackText,
        feedbackType,
        screenshotData,
        currentUser,
        getElementDetails(selectedElement),
        priority,
        {
          timestamp: Date.now(),
          referrer: document.referrer,
          language: navigator.language
        }
      );

      if (result.success) {
        onSuccess?.();
        resetForm();
        setIsOpen(false);
      } else {
        onError?.(result.message);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit feedback';
      onError?.(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setFeedbackText('');
    setFeedbackType('bug');
    setPriority('medium');
    setSelectedElement(null);
    setScreenshot(null);
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(true)}
        className="feedback-widget-button"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#3b82f6',
          color: 'white',
          border: 'none',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          cursor: 'pointer',
          fontSize: '24px',
          zIndex: 9999,
          display: isOpen ? 'none' : 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
        title="Give Feedback (Ctrl+Q)"
      >
        💬
      </button>

      {/* Feedback modal */}
      {isOpen && (
        <div
          className="feedback-widget"
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '400px',
            maxHeight: '600px',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            zIndex: 10000,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '16px',
              backgroundColor: '#3b82f6',
              color: 'white',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>
              Send Feedback
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '24px',
                cursor: 'pointer',
                padding: '0',
                width: '24px',
                height: '24px'
              }}
            >
              ×
            </button>
          </div>

          {/* Content */}
          <div
            style={{
              padding: '20px',
              overflowY: 'auto',
              flex: 1
            }}
          >
            {/* Feedback Type */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                Type
              </label>
              <select
                value={feedbackType}
                onChange={(e) => setFeedbackType(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              >
                <option value="bug">🐛 Bug Report</option>
                <option value="feature">✨ Feature Request</option>
                <option value="improvement">🔧 Improvement</option>
                <option value="question">❓ Question</option>
              </select>
            </div>

            {/* Priority */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>

            {/* Feedback Text */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                Describe the issue or suggestion
              </label>
              <textarea
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Please provide details..."
                rows={5}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  resize: 'vertical',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            {/* Element Selection */}
            <div style={{ marginBottom: '16px' }}>
              <button
                onClick={() => setIsSelecting(true)}
                disabled={isSelecting}
                style={{
                  width: '100%',
                  padding: '10px 16px',
                  backgroundColor: isSelecting ? '#6b7280' : '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: isSelecting ? 'not-allowed' : 'pointer'
                }}
              >
                {isSelecting ? '👆 Click on any element...' : '🎯 Select Element (Optional)'}
              </button>
              {selectedElement && (
                <div
                  style={{
                    marginTop: '8px',
                    padding: '8px',
                    backgroundColor: '#f3f4f6',
                    borderRadius: '6px',
                    fontSize: '12px'
                  }}
                >
                  Selected: <code>{getCSSSelector(selectedElement)}</code>
                </div>
              )}
            </div>

            {/* Screenshot */}
            <div style={{ marginBottom: '16px' }}>
              <button
                onClick={captureScreenshot}
                style={{
                  width: '100%',
                  padding: '10px 16px',
                  backgroundColor: '#8b5cf6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                📸 {screenshot ? 'Retake Screenshot' : 'Capture Screenshot'}
              </button>
              {screenshot && (
                <div style={{ marginTop: '8px' }}>
                  <img
                    src={screenshot}
                    alt="Screenshot preview"
                    style={{
                      width: '100%',
                      borderRadius: '6px',
                      border: '1px solid #d1d5db'
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              padding: '16px',
              borderTop: '1px solid #e5e7eb',
              display: 'flex',
              gap: '12px'
            }}
          >
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !feedbackText.trim()}
              style={{
                flex: 1,
                padding: '10px 16px',
                backgroundColor: isSubmitting || !feedbackText.trim() ? '#9ca3af' : '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: isSubmitting || !feedbackText.trim() ? 'not-allowed' : 'pointer'
              }}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                padding: '10px 16px',
                backgroundColor: 'transparent',
                color: '#6b7280',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
          </div>

          {/* Instruction overlay when selecting */}
          {isSelecting && (
            <div
              style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                color: 'white',
                padding: '20px 40px',
                borderRadius: '8px',
                fontSize: '16px',
                zIndex: 10001,
                textAlign: 'center'
              }}
            >
              Click on any element to select it
              <br />
              <small style={{ fontSize: '14px', opacity: 0.8 }}>Press ESC to cancel</small>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default FeedbackWidget;
