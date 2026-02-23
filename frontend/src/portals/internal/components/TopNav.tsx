import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function TopNav() {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();

    return (
        <nav className="bg-white shadow-sm border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-50">
            <div
                className="cursor-pointer flex flex-col"
                onClick={() => navigate('/')}
            >
                <h1 className="text-xl font-bold text-gray-900 leading-tight">Hypervision</h1>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Workflow Management</p>
            </div>

            {user && (
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <svg className="h-4 w-4 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <span className="text-sm font-medium text-gray-700 hidden sm:block">{user.email}</span>
                    </div>
                    <div className="w-px h-6 bg-gray-200"></div>
                    <button
                        onClick={signOut}
                        className="text-sm text-gray-500 hover:text-red-600 transition-colors py-1.5 px-2 rounded-md hover:bg-red-50"
                    >
                        Sign Out
                    </button>
                </div>
            )}
        </nav>
    );
}
