import { useState } from 'react';
import { useMutation } from '@apollo/client/react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { REQUEST_PASSWORD_RESET, RESET_PASSWORD, REQUEST_UNLOCK, UNLOCK_ACCOUNT } from '../graphql/mutations/auth';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  
  const isUnlockPage = location.pathname.includes('unlock-account');
  const pageType = token 
    ? (isUnlockPage ? 'unlock-confirm' : 'reset-confirm')
    : (isUnlockPage ? 'unlock-request' : 'reset-request');
  
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [requestReset, { loading: requestLoading }] = useMutation<{
    requestPasswordReset: { message: string };
  }>(REQUEST_PASSWORD_RESET, {
    onCompleted: (data) => {
      setMessage(data.requestPasswordReset.message);
      setError('');
    },
    onError: (err) => {
      setError(err.message);
      setMessage('');
    },
  });

  const [resetPassword, { loading: resetLoading }] = useMutation<{
    resetPassword: { message: string };
  }>(RESET_PASSWORD, {
    onCompleted: (data) => {
      setMessage(data.resetPassword.message);
      setError('');
      setTimeout(() => navigate('/login'), 2000);
    },
    onError: (err) => {
      setError(err.message);
      setMessage('');
    },
  });

  const [requestUnlock, { loading: unlockRequestLoading }] = useMutation<{
    requestUnlock: { message: string };
  }>(REQUEST_UNLOCK, {
    onCompleted: (data) => {
      setMessage(data.requestUnlock.message);
      setError('');
    },
    onError: (err) => {
      setError(err.message);
      setMessage('');
    },
  });

  const [unlockAccount, { loading: unlockLoading }] = useMutation<{
    unlockAccount: { message: string };
  }>(UNLOCK_ACCOUNT, {
    onCompleted: (data) => {
      setMessage(data.unlockAccount.message);
      setError('');
      setTimeout(() => navigate('/login'), 2000);
    },
    onError: (err) => {
      setError(err.message);
      setMessage('');
    },
  });

  const handleRequestReset = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');
    if (isUnlockPage) {
      requestUnlock({ variables: { email } });
    } else {
      requestReset({ variables: { email } });
    }
  };

  const handleUnlockAccount = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');
    unlockAccount({ variables: { token } });
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    resetPassword({ variables: { token, newPassword } });
  };

  const getTitle = () => {
    switch (pageType) {
      case 'unlock-request': return 'Unlock Account';
      case 'unlock-confirm': return 'Unlock Your Account';
      case 'reset-confirm': return 'Reset Password';
      default: return 'Forgot Password';
    }
  };

  const isLoading = requestLoading || resetLoading || unlockRequestLoading || unlockLoading;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900 p-4">
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          {getTitle()}
        </h2>

        {message && (
          <div className="mb-4 p-3 bg-green-600/20 border border-green-500/50 rounded text-green-300 text-sm">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-600/20 border border-red-500/50 rounded text-red-300 text-sm">
            {error}
          </div>
        )}

        {!token ? (
          <form onSubmit={handleRequestReset} className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500"
                placeholder="Enter your email"
                required
              />
              <p className="text-gray-400 text-xs mt-1">
                {isUnlockPage 
                  ? "We'll send you a link to unlock your account"
                  : "We'll send you a link to reset your password"}
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Sending...' : (isUnlockPage ? 'Send Unlock Link' : 'Send Reset Link')}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-indigo-400 hover:text-indigo-300 text-sm"
              >
                Back to Login
              </button>
            </div>
          </form>
        ) : isUnlockPage ? (
          <form onSubmit={handleUnlockAccount} className="space-y-4">
            <p className="text-gray-300 mb-4">
              Click the button below to unlock your account.
            </p>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Unlocking...' : 'Unlock Account'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500"
                placeholder="Enter new password"
                required
                minLength={8}
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500"
                placeholder="Confirm new password"
                required
                minLength={8}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
