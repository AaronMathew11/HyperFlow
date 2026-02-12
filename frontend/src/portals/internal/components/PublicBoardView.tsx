import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { verifyLinkPassword, getPublicBoard } from '../../../shared/lib/api';
import { Board } from '../../../shared/types';
import Canvas from './Canvas';

export default function PublicBoardView() {
    const { linkId } = useParams<{ linkId: string }>();
    const [password, setPassword] = useState('');
    const [verified, setVerified] = useState(false);
    const [board, setBoard] = useState<Board | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [storedPassword, setStoredPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!linkId || !password.trim()) return;

        setLoading(true);
        setError(null);

        try {
            // First verify the password
            await verifyLinkPassword(linkId, password);

            // If verification succeeds, fetch the board
            const result = await getPublicBoard(linkId, password);
            if (result) {
                setBoard(result.board);
                setStoredPassword(password);
                setVerified(true);
            }
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Failed to verify password');
            }
        } finally {
            setLoading(false);
        }
    };

    // Dummy onBack function for read-only mode
    const handleBack = () => {
        setVerified(false);
        setBoard(null);
        setPassword('');
    };

    if (verified && board) {
        return (
            <div className="relative h-screen w-screen overflow-hidden">
                {/* Shared Board Indicator */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium shadow-lg flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                    Viewing shared board (read-only)
                </div>

                <Canvas board={board} onBack={handleBack} readOnly={true} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-8">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Protected Board</h1>
                    <p className="text-gray-600 mt-2">
                        Enter the password to view this shared board.
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter password"
                            autoFocus
                            required
                        />
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading || !password.trim()}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Verifying...
                            </>
                        ) : (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                                </svg>
                                View Board
                            </>
                        )}
                    </button>
                </form>

                <p className="text-center text-xs text-gray-500 mt-6">
                    This board is password protected. Ask the owner for the password.
                </p>
            </div>
        </div>
    );
}
