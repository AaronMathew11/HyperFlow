import { useCustomerAuth } from '../contexts/CustomerAuthContext';
import { useNavigate } from 'react-router-dom';

export default function CustomerTopNav() {
    const { user, signOut, businessUnitName } = useCustomerAuth();
    const navigate = useNavigate();

    return (
        <nav className="bg-white shadow-sm border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-50">
            <div
                className="cursor-pointer flex flex-col"
                onClick={() => navigate('/customer/environments')}
            >
                <h1 className="text-xl font-bold text-gray-900 leading-tight">Hypervision</h1>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Customer Portal</p>
            </div>

            {user && (
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-semibold text-sm">
                                {user?.email?.charAt(0).toUpperCase() || 'C'}
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-700 hidden sm:block">{businessUnitName || 'Customer'}</span>
                        </div>
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
