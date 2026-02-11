import { useState, useEffect } from 'react';
import { createAccessLink, listAccessLinks, revokeAccessLink } from '../lib/api';
import { AccessLink, CreateLinkResponse } from '../types';

interface ShareLinkModalProps {
    isOpen: boolean;
    boardId: string;
    onClose: () => void;
}

export default function ShareLinkModal({ isOpen, boardId, onClose }: ShareLinkModalProps) {
    const [links, setLinks] = useState<AccessLink[]>([]);
    const [loading, setLoading] = useState(false);
    const [generating, setGenerating] = useState(false);
    const [newLink, setNewLink] = useState<CreateLinkResponse | null>(null);
    const [copied, setCopied] = useState<'url' | 'password' | null>(null);

    useEffect(() => {
        if (isOpen) {
            loadLinks();
            setNewLink(null);
        }
    }, [isOpen, boardId]);

    const loadLinks = async () => {
        setLoading(true);
        const _result = await listAccessLinks(boardId);
        setLinks(result);
        setLoading(false);
    };

    const handleGenerateLink = async () => {
        setGenerating(true);
        const _result = await createAccessLink(boardId, 'viewer');
        if (result) {
            setNewLink(result);
            loadLinks();
        }
        setGenerating(false);
    };

    const handleRevokeLink = async (linkId: string) => {
        if (window.confirm('Are you sure you want to revoke this link? Anyone with this link will no longer be able to access the board.')) {
            await revokeAccessLink(boardId, linkId);
            loadLinks();
        }
    };

    const copyToClipboard = async (text: string, type: 'url' | 'password') => {
        await navigator.clipboard.writeText(text);
        setCopied(type);
        setTimeout(() => setCopied(null), 2000);
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 max-h-[90vh] overflow-hidden flex flex-col">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-900">Share Board</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                        Generate a password-protected link to share this board with anyone.
                    </p>
                </div>

                <div className="p-6 overflow-y-auto flex-1">
                    {newLink && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                            <div className="flex items-center gap-2 mb-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="font-medium text-green-800">Link Generated!</span>
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <label className="block text-xs font-medium text-green-800 mb-1">Share URL</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            readOnly
                                            value={newLink.shareUrl}
                                            className="flex-1 px-3 py-2 text-sm bg-white border border-green-300 rounded-md"
                                        />
                                        <button
                                            onClick={() => copyToClipboard(newLink.shareUrl, 'url')}
                                            className="px-3 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                                        >
                                            {copied === 'url' ? 'Copied!' : 'Copy'}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-green-800 mb-1">Password</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            readOnly
                                            value={newLink.password}
                                            className="flex-1 px-3 py-2 text-sm bg-white border border-green-300 rounded-md font-mono"
                                        />
                                        <button
                                            onClick={() => copyToClipboard(newLink.password, 'password')}
                                            className="px-3 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                                        >
                                            {copied === 'password' ? 'Copied!' : 'Copy'}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800">
                                <strong>Important:</strong> Save this password now. It won't be shown again!
                            </div>
                        </div>
                    )}

                    <div className="mb-4">
                        <button
                            onClick={handleGenerateLink}
                            disabled={generating}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {generating ? (
                                <>
                                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                                    </svg>
                                    Generate New Link
                                </>
                            )}
                        </button>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-3">Active Links</h3>

                        {loading ? (
                            <div className="text-center py-4">
                                <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                            </div>
                        ) : links.length === 0 ? (
                            <p className="text-sm text-gray-500 text-center py-4">
                                No active links. Generate one to share your board.
                            </p>
                        ) : (
                            <div className="space-y-2">
                                {links.map((link) => (
                                    <div
                                        key={link.id}
                                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                                    >
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-mono text-gray-600 truncate">
                                                {link.id.substring(0, 8)}...
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                Created {formatDate(link.created_at)}
                                                {link.expires_at && (
                                                    <span className="ml-2">
                                                        Expires {formatDate(link.expires_at)}
                                                    </span>
                                                )}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => handleRevokeLink(link.id)}
                                            className="ml-3 px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
                                        >
                                            Revoke
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-4 border-t border-gray-200 bg-gray-50">
                    <button
                        onClick={onClose}
                        className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
