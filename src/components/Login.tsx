import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const { signInWithGoogle } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-white">
      <div
        className="p-8 rounded-2xl shadow-2xl max-w-md w-full"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
          backdropFilter: 'blur(40px) saturate(200%)',
          WebkitBackdropFilter: 'blur(40px) saturate(200%)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.8), 0 20px 60px rgba(6, 6, 61, 0.15)',
        }}
      >
        <div className="flex items-center gap-4 mb-8">
          {/* Logo */}
          <div className="flex-shrink-0">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="64" height="64" rx="16" fill="url(#gradient)" />
              <path d="M20 24L32 16L44 24V40L32 48L20 40V24Z" stroke="white" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
              <path d="M20 24L32 32M32 32L44 24M32 32V48" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="32" cy="24" r="2.5" fill="white" />
              <circle cx="44" cy="24" r="2.5" fill="white" />
              <circle cx="20" cy="24" r="2.5" fill="white" />
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#9393D0" />
                  <stop offset="1" stopColor="#06063D" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Title */}
          <div className="flex-1 text-left">
            <h1 className="text-4xl font-bold text-primary-900 mb-1">Hypervision</h1>
            <p className="text-primary-600">Create beautiful flowcharts</p>
          </div>
        </div>

        <button
          onClick={signInWithGoogle}
          className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-lg border border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
