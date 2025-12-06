import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client/react';
import { useNavigate } from 'react-router-dom';
import { UPDATE_PROFILE, UPDATE_PASSWORD, REQUEST_EMAIL_UPDATE, DELETE_ACCOUNT } from '../graphql/mutations/auth';
import { useAuth } from '../hooks/useAuth';

export default function Profile() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  
  const [name, setName] = useState(user?.name || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [emailPassword, setEmailPassword] = useState('');
  const [deletePassword, setDeletePassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [updateProfile] = useMutation(UPDATE_PROFILE, {
    onCompleted: () => {
      setMessage('Profile updated successfully');
      setTimeout(() => setMessage(''), 3000);
    },
    onError: (err) => {
      console.error('Update profile error:', err);
      setError(`Error: ${err.message}. The backend may not be configured to pass auth tokens to gRPC services.`);
    },
  });

  const [updatePassword] = useMutation(UPDATE_PASSWORD, {
    onCompleted: () => {
      setMessage('Password updated successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      setTimeout(() => setMessage(''), 3000);
    },
    onError: (err) => setError(err.message),
  });

  const [requestEmailUpdate] = useMutation(REQUEST_EMAIL_UPDATE, {
    onCompleted: () => {
      setMessage('Email update requested. Check your new email for confirmation link.');
      setNewEmail('');
      setEmailPassword('');
      setTimeout(() => setMessage(''), 5000);
    },
    onError: (err) => setError(err.message),
  });

  const [deleteAccount] = useMutation(DELETE_ACCOUNT, {
    onCompleted: () => {
      localStorage.removeItem('accessToken');
      navigate('/login');
    },
    onError: (err) => setError(err.message),
  });

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    if (user?.name && !name) {
      setName(user.name);
    }
  }, [user, name]);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    updateProfile({ variables: { name } });
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (newPassword !== confirmNewPassword) {
      setError('Passwords do not match');
      return;
    }
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    updatePassword({ variables: { currentPassword, newPassword } });
  };

  const handleEmailUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    requestEmailUpdate({ variables: { password: emailPassword, newEmail } });
  };

  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      setError('');
      deleteAccount({ variables: { password: deletePassword } });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-white mb-2">Loading Profile...</h2>
          <p className="text-gray-400">Please wait</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">My Profile</h1>
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
          >
            ← Back
          </button>
        </div>

        {message && (
          <div className="mb-4 p-4 bg-green-600/20 border border-green-500/50 rounded-lg text-green-300">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-4 p-4 bg-red-600/20 border border-red-500/50 rounded-lg text-red-300">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Update Profile */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Update Profile</h2>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm mb-2">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                  required
                />
              </div>
              <div className="text-sm text-gray-400 mb-2">
                <span className="font-medium text-gray-300">Current Email:</span> {user?.email}
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg"
              >
                Update Profile
              </button>
            </form>
          </div>

          {/* Change Password */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Change Password</h2>
            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm mb-2">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                  required
                  minLength={8}
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                  required
                  minLength={8}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg"
              >
                Change Password
              </button>
            </form>
          </div>

          {/* Update Email */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Update Email</h2>
            <form onSubmit={handleEmailUpdate} className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm mb-2">New Email</label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">Password</label>
                <input
                  type="password"
                  value={emailPassword}
                  onChange={(e) => setEmailPassword(e.target.value)}
                  className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg"
              >
                Update Email
              </button>
            </form>
          </div>

          {/* Delete Account */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-red-700/50 rounded-xl p-6">
            <h2 className="text-xl font-bold text-red-400 mb-4">Danger Zone</h2>
            <p className="text-gray-400 text-sm mb-4">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm mb-2">Confirm Password</label>
                <input
                  type="password"
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                  className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                  placeholder="Enter password to confirm"
                />
              </div>
              <button
                type="button"
                onClick={handleDeleteAccount}
                disabled={!deletePassword}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
