import { useQuery, useMutation } from '@apollo/client/react';
import { useNavigate } from 'react-router-dom';
import { GET_ORDERS } from '../graphql/queries/order';
import { UPDATE_ORDER_STATUS } from '../graphql/mutations/order';
import type { GetOrdersResponse, Order, OrderItem } from '../types/graphql';
import { useAuth } from '../hooks/useAuth';

export default function AdminOrders() {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const { data, loading, error, refetch } = useQuery<GetOrdersResponse>(GET_ORDERS);
  const [updateStatus] = useMutation(UPDATE_ORDER_STATUS, { onCompleted: () => refetch() });

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center">
        <div className="bg-red-600/20 border border-red-500/30 rounded-xl p-8 text-center">
          <p className="text-red-300 text-xl font-semibold">Access Denied</p>
        </div>
      </div>
    );
  }

  const handleStatusChange = (id: string, status: string) => {
    updateStatus({ variables: { id, status } });
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'PENDING': 'bg-yellow-600/20 border-yellow-500/30 text-yellow-300',
      'PREPARING': 'bg-blue-600/20 border-blue-500/30 text-blue-300',
      'READY': 'bg-green-600/20 border-green-500/30 text-green-300',
      'DELIVERED': 'bg-gray-600/20 border-gray-500/30 text-gray-300',
      'CANCELLED': 'bg-red-600/20 border-red-500/30 text-red-300',
    };
    return colors[status] || 'bg-gray-600/20 border-gray-500/30 text-gray-300';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">Manage Orders</h1>
              <p className="text-gray-400 text-sm mt-1">View and update order status</p>
            </div>
            <button
              onClick={() => navigate('/admin')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              <span>⬅️</span>
              Back to Dashboard
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="text-center text-white">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-400">Loading orders...</p>
          </div>
        ) : error ? (
          <div className="bg-red-600/20 border border-red-500/30 rounded-xl p-6 text-center">
            <p className="text-red-300">Error: {error.message}</p>
          </div>
        ) : !data?.orders || data.orders.length === 0 ? (
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 text-center">
            <p className="text-gray-400 text-lg">No orders yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {data.orders.map((order: Order) => (
              <div 
                key={order.id} 
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:bg-gray-800/70 transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-xl text-white">Order #{order.id.substring(0, 8)}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 mb-4">
                      {new Date(order.createdAt * 1000).toLocaleDateString()} at{' '}
                      {new Date(order.createdAt * 1000).toLocaleTimeString()}
                    </p>
                    
                    <div className="border-t border-gray-700 pt-4">
                      <h4 className="font-semibold text-white mb-3">Items:</h4>
                      <ul className="space-y-2">
                        {order.items.map((item: OrderItem, idx: number) => (
                          <li key={idx} className="flex justify-between items-center text-gray-300">
                            <span>
                              <span className="font-medium text-blue-400">{item.quantity}x</span> {item.name}
                            </span>
                            <span className="text-gray-400">${(item.price * item.quantity).toFixed(2)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="border-t border-gray-700 mt-4 pt-4 flex justify-between items-center">
                      <span className="font-bold text-lg text-white">Total:</span>
                      <span className="font-bold text-2xl text-blue-400">${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="lg:w-48">
                    <label className="block text-sm font-medium text-gray-400 mb-2">Update Status:</label>
                    <select 
                      value={order.status} 
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="w-full bg-gray-700 border border-gray-600 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    >
                      <option value="PENDING">🕐 Pending</option>
                      <option value="PREPARING">👨‍🍳 Preparing</option>
                      <option value="READY">✅ Ready</option>
                      <option value="DELIVERED">🚚 Delivered</option>
                      <option value="CANCELLED">❌ Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
