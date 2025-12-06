import { useQuery } from '@apollo/client/react';
import { useNavigate } from 'react-router-dom';
import { GET_MY_ORDERS } from '../graphql/queries/order';
import type { GetOrdersResponse, Order, OrderItem } from '../types/graphql';
import { useAuth } from '../hooks/useAuth';

export default function ClientOrders() {
  const { isClient } = useAuth();
  const navigate = useNavigate();
  const { data, loading, error } = useQuery<GetOrdersResponse>(GET_MY_ORDERS);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900 flex items-center justify-center">
        <div className="bg-red-600/20 border border-red-500/30 rounded-xl p-8 text-center">
          <p className="text-red-300 text-xl font-semibold">Access Denied</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'PENDING': 'bg-yellow-600/20 border-yellow-500/30 text-yellow-300',
      'PREPARING': 'bg-blue-600/20 border-blue-500/30 text-blue-300',
      'READY': 'bg-green-600/20 border-green-500/30 text-green-300',
      'DELIVERED': 'bg-gray-600/20 border-gray-500/30 text-gray-300',
      'CANCELLED': 'bg-red-600/20 border-red-500/30 text-red-300',
    };
    return colors[status.toUpperCase()] || 'bg-gray-600/20 border-gray-500/30 text-gray-300';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">My Orders</h1>
              <p className="text-gray-400 text-sm mt-1">Track your order history</p>
            </div>
            <button
              onClick={() => navigate('/client')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
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
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            <p className="mt-4 text-gray-400">Loading your orders...</p>
          </div>
        ) : error ? (
          <div className="bg-red-600/20 border border-red-500/30 rounded-xl p-6 text-center">
            <p className="text-red-300">Error: {error.message}</p>
          </div>
        ) : !data?.orders || data.orders.length === 0 ? (
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 text-center">
            <p className="text-gray-400 text-lg mb-4">You haven't placed any orders yet.</p>
            <button
              onClick={() => navigate('/client/menu')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
            >
              Browse our menu
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {data.orders.map((order: Order) => (
              <div 
                key={order.id} 
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:bg-gray-800/70 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-xl text-white">Order #{order.id.substring(0, 8)}</h3>
                    <p className="text-sm text-gray-400 mt-1">
                      {new Date(order.createdAt * 1000).toLocaleDateString()} at{' '}
                      {new Date(order.createdAt * 1000).toLocaleTimeString()}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                
                <div className="border-t border-gray-700 pt-4">
                  <h4 className="font-semibold text-white mb-3">Items:</h4>
                  <ul className="space-y-2">
                    {order.items.map((item: OrderItem, idx: number) => (
                      <li key={idx} className="flex justify-between items-center text-gray-300">
                        <span>
                          <span className="font-medium text-indigo-400">{item.quantity}x</span> {item.name}
                        </span>
                        <span className="text-gray-400">${(item.price * item.quantity).toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="border-t border-gray-700 mt-4 pt-4 flex justify-between items-center">
                  <span className="font-bold text-lg text-white">Total:</span>
                  <span className="font-bold text-2xl text-indigo-400">${order.total.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
