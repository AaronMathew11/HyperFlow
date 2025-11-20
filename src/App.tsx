import { AuthProvider, useAuth } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Sidebar from "./components/Sidebar";
import Canvas from "./components/Canvas";
import { FeedbackProvider, useFeedback } from "react-visual-feedback";
import "react-visual-feedback/dist/index.css";
import {
  submitFeedback,
  updateFeedbackStatus,
} from "./services/feedbackService";
import { useState } from "react";

// Feedback control buttons component
function FeedbackButtons() {
  const { isActive, setIsActive, setIsDashboardOpen } = useFeedback();

  return (
    <div
      className="fixed bottom-4 right-4 z-50 flex gap-3"
      style={{ pointerEvents: "auto" }}
    >
      <button
        onClick={() => setIsDashboardOpen(true)}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transition-all duration-200 flex items-center gap-2"
        title="Open Feedback Dashboard (Ctrl+Shift+Q)"
      >
        📊 Dashboard
      </button>
      <button
        onClick={() => setIsActive(!isActive)}
        className={`px-4 py-2 ${
          isActive
            ? "bg-red-600 hover:bg-red-700"
            : "bg-green-600 hover:bg-green-700"
        } text-white rounded-lg shadow-lg transition-all duration-200 flex items-center gap-2`}
        title={
          isActive ? "Cancel Feedback Mode (Esc)" : "Report an Issue (Ctrl+Q)"
        }
      >
        {isActive ? "✕ Cancel" : "💬 Report Issue"}
      </button>
    </div>
  );
}

// Main app content wrapper with FeedbackProvider
function AppContent() {
  const { user } = useAuth();
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // Handle feedback submission to Google Sheets
  const handleFeedbackSubmit = async (feedbackData: any) => {
    try {
      // Convert the library's feedback format to our format
      const result = await submitFeedback(
        feedbackData.feedback,
        "bug", // Default type, can be customized
        feedbackData.screenshot,
        {
          id: user?.id || "anonymous",
          email: user?.email || "anonymous@example.com",
          name:
            user?.user_metadata?.full_name ||
            user?.email?.split("@")[0] ||
            "Anonymous User",
        },
        {
          selector: feedbackData.elementInfo?.selector,
          xpath: feedbackData.elementInfo?.selector, // Library doesn't provide xpath, using selector
          text: feedbackData.elementInfo?.text,
          html: feedbackData.elementInfo?.tagName,
        },
        "medium", // Default priority
        {
          url: feedbackData.url,
          viewport: feedbackData.viewport,
          userAgent: feedbackData.userAgent,
          elementInfo: feedbackData.elementInfo,
          libraryData: feedbackData, // Store original library data
        }
      );

      if (result.success) {
        setNotification({
          message: "Feedback submitted successfully!",
          type: "success",
        });
        setTimeout(() => setNotification(null), 3000);
      } else {
        setNotification({
          message: "Failed to submit feedback",
          type: "error",
        });
        setTimeout(() => setNotification(null), 3000);
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setNotification({ message: "Error submitting feedback", type: "error" });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  // Handle status changes from dashboard
  const handleStatusChange = async ({
    id,
    status,
    comment,
  }: {
    id: string;
    status: string;
    comment?: string;
  }) => {
    try {
      await updateFeedbackStatus(
        id,
        status as any,
        user?.email || "system",
        comment || `Status changed to ${status}`
      );
      console.log("Status updated successfully");
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <FeedbackProvider
      onSubmit={handleFeedbackSubmit}
      onStatusChange={handleStatusChange}
      dashboard={true}
      isDeveloper={true} // Set to false for regular users, true for developers
      userName={
        user?.user_metadata?.full_name ||
        user?.email?.split("@")[0] ||
        "Anonymous User"
      }
      userEmail={user?.email || null}
      mode="light"
    >
      <div className="relative h-screen w-screen overflow-hidden">
        <Canvas />
        <div className="absolute top-0 left-0 z-20 pointer-events-none h-full">
          <div className="pointer-events-auto">
            <Sidebar />
          </div>
        </div>

        {/* Feedback control buttons */}
        <FeedbackButtons />

        {/* Notification toast */}
        {notification && (
          <div
            className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg ${
              notification.type === "success"
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            } animate-fade-in`}
          >
            {notification.message}
          </div>
        )}
      </div>
    </FeedbackProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <AppContent />
      </ProtectedRoute>
    </AuthProvider>
  );
}

export default App;
