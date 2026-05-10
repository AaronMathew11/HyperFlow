import { useState } from 'react';

interface WorkflowVersion {
  id: string;
  version_number: string | number;
  version_details?: string;
  published_at: string;
}

interface VersionsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  versions: WorkflowVersion[];
  activeVersionId: string | null;
  onSetActive: (versionId: string) => Promise<void>;
  onRestoreToDraft: (versionId: string) => Promise<void>;
}

export default function VersionsPanel({
  isOpen,
  onClose,
  versions,
  activeVersionId,
  onSetActive,
  onRestoreToDraft,
}: VersionsPanelProps) {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [restoringId, setRestoringId] = useState<string | null>(null);
  const [confirmRestore, setConfirmRestore] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSetActive = async (versionId: string) => {
    setLoadingId(versionId);
    await onSetActive(versionId);
    setLoadingId(null);
  };

  const handleRestoreClick = (versionId: string) => {
    setConfirmRestore(versionId);
  };

  const handleRestoreConfirm = async () => {
    if (!confirmRestore) return;
    setRestoringId(confirmRestore);
    setConfirmRestore(null);
    await onRestoreToDraft(confirmRestore);
    setRestoringId(null);
    onClose();
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-end">
        <div className="absolute inset-0 bg-black/30" onClick={onClose} />

        {/* Side panel */}
        <div
          className="relative h-full w-full max-w-sm flex flex-col border-l shadow-2xl"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.99) 0%, rgba(250,250,255,0.98) 100%)',
            backdropFilter: 'blur(40px) saturate(200%)',
            borderColor: 'rgba(6,6,61,0.1)',
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-primary-100">
            <div>
              <h2 className="text-base font-bold text-primary-900">Version History</h2>
              <p className="text-xs text-primary-400 mt-0.5">{versions.length} published version{versions.length !== 1 ? 's' : ''}</p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-primary-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Legend */}
          <div className="px-5 py-3 bg-primary-50/60 border-b border-primary-100 flex items-center gap-4 text-xs text-primary-500">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
              Active — what customers see
            </div>
          </div>

          {/* Version list */}
          <div className="flex-1 overflow-y-auto py-2">
            {versions.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 text-center px-6">
                <svg className="w-10 h-10 text-primary-200 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-sm font-medium text-primary-400">No published versions yet</p>
                <p className="text-xs text-primary-300 mt-1">Click Publish to create your first version</p>
              </div>
            ) : (
              <div className="divide-y divide-primary-50">
                {versions.map((v, idx) => {
                  const isActive = v.id === activeVersionId;
                  const isLatest = idx === 0;
                  const isLoading = loadingId === v.id;
                  const isRestoring = restoringId === v.id;

                  return (
                    <div
                      key={v.id}
                      className={`px-5 py-4 transition-colors ${isActive ? 'bg-green-50/60' : 'hover:bg-primary-50/40'}`}
                    >
                      {/* Version header */}
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-bold text-primary-900">
                            Version {v.version_number}
                          </span>
                          {isActive && (
                            <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-medium">
                              Active
                            </span>
                          )}
                          {isLatest && !isActive && (
                            <span className="text-xs bg-primary-100 text-primary-600 px-1.5 py-0.5 rounded-full">
                              Latest
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Date */}
                      <p className="text-xs text-primary-400 mb-2">{formatDate(v.published_at)}</p>

                      {/* Release notes */}
                      {v.version_details && (
                        <p className="text-xs text-primary-600 bg-primary-50 rounded-lg px-2.5 py-2 mb-3 leading-relaxed">
                          {v.version_details}
                        </p>
                      )}

                      {/* Actions */}
                      <div className="flex gap-2">
                        {!isActive && (
                          <button
                            onClick={() => handleSetActive(v.id)}
                            disabled={isLoading}
                            className="flex-1 text-xs font-medium py-1.5 px-2.5 rounded-lg border border-green-200 text-green-700 bg-green-50 hover:bg-green-100 transition-colors disabled:opacity-50 flex items-center justify-center gap-1"
                          >
                            {isLoading ? (
                              <svg className="animate-spin h-3 w-3" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                              </svg>
                            ) : (
                              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                            Set Active
                          </button>
                        )}
                        <button
                          onClick={() => handleRestoreClick(v.id)}
                          disabled={isRestoring}
                          className="flex-1 text-xs font-medium py-1.5 px-2.5 rounded-lg border border-primary-200 text-primary-600 hover:bg-primary-50 transition-colors disabled:opacity-50 flex items-center justify-center gap-1"
                        >
                          {isRestoring ? (
                            <svg className="animate-spin h-3 w-3" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                          ) : (
                            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                            </svg>
                          )}
                          Restore to Draft
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Restore confirmation dialog */}
      {confirmRestore && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" />
          <div
            className="relative w-full max-w-sm rounded-2xl border p-5 shadow-2xl mx-4"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.99) 0%, rgba(255,255,255,0.95) 100%)',
              borderColor: 'rgba(6,6,61,0.1)',
            }}
          >
            <div className="flex items-start gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-bold text-primary-900">Restore to Draft?</h3>
                <p className="text-xs text-primary-500 mt-1">
                  Your current unsaved draft will be replaced with this version. This doesn't affect what customers see — you'll still need to save and re-publish.
                </p>
              </div>
            </div>
            <div className="flex gap-2.5">
              <button
                onClick={() => setConfirmRestore(null)}
                className="flex-1 px-3 py-2 text-sm font-medium text-primary-600 border border-primary-200 rounded-lg hover:bg-primary-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleRestoreConfirm}
                className="flex-1 px-3 py-2 text-sm font-medium text-white bg-amber-600 rounded-lg hover:bg-amber-700 transition-colors"
              >
                Restore
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
