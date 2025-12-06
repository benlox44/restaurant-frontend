import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  const menuOptions = [
    { title: 'View Orders', path: '/admin/orders', icon: '📋', description: 'Manage all orders' },
    { title: 'Manage Menu', path: '/admin/menu', icon: '🍽️', description: 'Edit menu items' },
    { title: 'My Profile', path: '/profile', icon: '👤', description: 'Manage your account' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-gray-400 text-sm mt-1">Welcome, {user?.name}</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              <span>🚪</span>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {menuOptions.map((option) => (
            <button
              key={option.path}
              onClick={() => navigate(option.path)}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:bg-gray-800/70 hover:border-blue-500 transition-all duration-300 text-left group"
            >
              <div className="flex items-start gap-4">
                <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                  {option.icon}
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {option.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{option.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-600/20 border border-blue-500/30 rounded-xl p-6">
            <h4 className="text-blue-300 text-sm font-medium mb-2">Pending Orders</h4>
            <p className="text-3xl font-bold text-white">12</p>
          </div>
          <div className="bg-green-600/20 border border-green-500/30 rounded-xl p-6">
            <h4 className="text-green-300 text-sm font-medium mb-2">Active Menu Items</h4>
            <p className="text-3xl font-bold text-white">24</p>
          </div>
          <div className="bg-purple-600/20 border border-purple-500/30 rounded-xl p-6">
            <h4 className="text-purple-300 text-sm font-medium mb-2">Today's Sales</h4>
            <p className="text-3xl font-bold text-white">$1,250</p>
          </div>
        </div>
      </main>
    </div>
  );
}
