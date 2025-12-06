import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function ClientDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  const menuOptions = [
    { title: 'View Menu', path: '/client/menu', icon: '🍽️', description: 'Explore our dishes' },
    { title: 'My Orders', path: '/client/orders', icon: '📦', description: 'Check your orders' },
    { title: 'New Order', path: '/client/new-order', icon: '🛒', description: 'Place a new order' },
    { title: 'My Profile', path: '/profile', icon: '👤', description: 'Manage your account' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">Welcome to Restaurant</h1>
              <p className="text-gray-400 text-sm mt-1">Hello, {user?.name}</p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {menuOptions.map((option) => (
            <button
              key={option.path}
              onClick={() => navigate(option.path)}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 hover:bg-gray-800/70 hover:border-indigo-500 transition-all duration-300 text-center group"
            >
              <span className="text-6xl mb-4 block group-hover:scale-110 transition-transform duration-300">
                {option.icon}
              </span>
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                {option.title}
              </h3>
              <p className="text-gray-400 text-sm">{option.description}</p>
            </button>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Thank you for visiting us! 🎉
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Explore our menu, discover new flavors, and place your order easily. 
            We're here to offer you the best dining experience.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-600/20 border border-green-500/30 rounded-xl p-6">
            <h4 className="text-green-300 text-sm font-medium mb-2">Today's Specials</h4>
            <p className="text-2xl font-bold text-white">20% OFF</p>
            <p className="text-gray-400 text-sm mt-2">On selected dishes</p>
          </div>
          <div className="bg-yellow-600/20 border border-yellow-500/30 rounded-xl p-6">
            <h4 className="text-yellow-300 text-sm font-medium mb-2">Delivery Time</h4>
            <p className="text-2xl font-bold text-white">30-45 min</p>
            <p className="text-gray-400 text-sm mt-2">Estimated time</p>
          </div>
        </div>
      </main>
    </div>
  );
}
