import { useState } from 'react';

interface PublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublish: (versionDetails: string) => Promise<void>;
  isPublishing: boolean;
  nextVersionNumber: number;
}

export default function PublishModal({ isOpen, onClose, onPublish, isPublishing, nextVersionNumber }: PublishModalProps) {
  const [versionDetails, setVersionDetails] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onPublish(versionDetails.trim());
    setVersionDetails('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div
        className="relative w-full max-w-md rounded-2xl border p-6 shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.92) 100%)',
          backdropFilter: 'blur(40px) saturate(200%)',
          borderColor: 'rgba(6,6,61,0.1)',
        }}
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-bold text-primary-900">Publish to Customer Dashboard</h2>
            <p className="text-sm text-primary-500 mt-0.5">Customers will see this version</p>
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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary-700 mb-1">
              Release Notes <span className="text-primary-400 font-normal">(optional)</span>
            </label>
            <textarea
              value={versionDetails}
              onChange={e => setVersionDetails(e.target.value)}
              placeholder="Describe what changed in this version..."
              rows={3}
              className="w-full px-3 py-2 text-sm border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white resize-none"
              autoFocus
            />
          </div>

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-sm font-medium text-primary-600 border border-primary-200 rounded-lg hover:bg-primary-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPublishing}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {isPublishing ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Publishing...
                </>
              ) : (
                <>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  Publish as Version {nextVersionNumber}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
