import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCustomerAuth } from '../contexts/CustomerAuthContext';

export default function CustomerLogin() {
  const { linkId } = useParams<{ linkId: string }>();
  const navigate = useNavigate();
  const { signIn } = useCustomerAuth();

  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkId) return;

    setLoading(true);
    setError('');

    try {
      const success = await signIn(linkId, password);
      if (success) {
        navigate('/customer/environments');
      } else {
        setError('Invalid password or access link expired');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-14 h-14 rounded-xl bg-gray-900 flex items-center justify-center mb-4">
            <svg
              className="w-7 h-7 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path d="M9 12l2 2 4-4" />
              <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <h1 className="text-2xl font-semibold text-gray-900">
            Hypervision Portal
          </h1>
          <p className="text-sm text-gray-500 mt-1 text-center">
            Access your workflow documentation
          </p>
        </div>

        {/* Card */}
        <div className="border border-gray-200 rounded-2xl p-6 shadow-sm">

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Error */}
            {error && (
              <div className="border border-red-200 bg-red-50 rounded-xl px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Access Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter password"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-900 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-black transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                  Verifying...
                </div>
              ) : (
                'Access Portal'
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-400 text-center mt-6">
          Secure access for authorized users only
        </p>
      </div>
    </div>
  );
}