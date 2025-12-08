import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import { useNavigate } from 'react-router-dom';
import { GET_MENU } from '../graphql/queries/menu';
import { CREATE_MENU_ITEM, UPDATE_MENU_ITEM, DELETE_MENU_ITEM } from '../graphql/mutations/menu';
import { CREATE_ORDER } from '../graphql/mutations/order';
import { CREATE_PAYMENT } from '../graphql/mutations/payment';
import { useAuth } from '../hooks/useAuth';
import type { GetMenuResponse, MenuItem } from '../types/graphql';
import Modal from '../components/Modal';

interface CreateOrderResponse {
  createOrder: {
    id: string;
    order: {
      id: string;
      total: number;
      status: string;
    };
  };
}

interface CreatePaymentResponse {
  createPayment: {
    success: boolean;
    url: string;
    token: string;
  };
}

export default function Menu() {
  const { isAdmin, isClient } = useAuth();
  const navigate = useNavigate();
  const { data, loading, error, refetch } = useQuery<GetMenuResponse>(GET_MENU);

  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm?: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
  });

  const showModal = (title: string, message: string, onConfirm?: () => void) => {
    setModalConfig({ isOpen: true, title, message, onConfirm });
  };

  const closeModal = () => {
    setModalConfig(prev => ({ ...prev, isOpen: false }));
  };
  
  const [createMenuItem] = useMutation(CREATE_MENU_ITEM, { 
    onCompleted: () => {
      refetch();
      setNewItem({ name: '', description: '', price: 0, category: '' });
      showModal('Éxito', '¡Ítem creado!');
    } 
  });
  const [updateMenuItem] = useMutation(UPDATE_MENU_ITEM, { 
    onCompleted: () => {
      refetch();
      setEditingItem(null);
      showModal('Éxito', '¡Ítem actualizado!');
    } 
  });
  const [deleteMenuItem] = useMutation(DELETE_MENU_ITEM, { onCompleted: () => refetch() });
  const [createOrder] = useMutation<CreateOrderResponse>(CREATE_ORDER);
  const [createPayment] = useMutation<CreatePaymentResponse>(CREATE_PAYMENT);

  const [newItem, setNewItem] = useState({ name: '', description: '', price: 0, category: '' });
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [cart, setCart] = useState<{ item: MenuItem; quantity: number }[]>([]);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    createMenuItem({ variables: { ...newItem, price: parseFloat(newItem.price.toString()) } });
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    updateMenuItem({ 
      variables: { 
        id: editingItem.id, 
        name: editingItem.name,
        description: editingItem.description,
        price: parseFloat(editingItem.price.toString()),
        category: editingItem.category
      } 
    });
  };

  const handleDelete = (id: string) => {
    showModal('Confirmar Eliminación', '¿Estás seguro de que quieres eliminar este ítem?', () => {
      deleteMenuItem({ variables: { id } });
    });
  };

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.item.id === item.id);
      if (existing) {
        return prev.map(i => i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => {
      const existing = prev.find(i => i.item.id === itemId);
      if (existing && existing.quantity > 1) {
        return prev.map(i => i.item.id === itemId ? { ...i, quantity: i.quantity - 1 } : i);
      }
      return prev.filter(i => i.item.id !== itemId);
    });
  };

  const clearCart = () => {
    showModal('Confirmar Limpieza', '¿Limpiar todos los ítems del carrito?', () => {
      setCart([]);
    });
  };

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      showModal('Error', '¡Tu carrito está vacío! Agrega ítems antes de realizar un pedido.');
      return;
    }
    const items = cart.map(c => ({
      menuItemId: c.item.id,
      quantity: c.quantity
    }));

    try {
      const { data } = await createOrder({ variables: { items } });
      
      if (data?.createOrder?.order) {
        const { id, total } = data.createOrder.order;
        const sessionId = `session-${id}`;
        
        // Initiate payment
        const paymentResult = await createPayment({
          variables: {
            amount: Math.round(total),
            buyOrder: id,
            sessionId: sessionId
          }
        });
        
        if (paymentResult.data?.createPayment?.success) {
          const { url, token } = paymentResult.data.createPayment;
          
          // Create and submit form to redirect to Webpay
          const form = document.createElement('form');
          form.action = url;
          form.method = 'POST';
          
          const tokenInput = document.createElement('input');
          tokenInput.type = 'hidden';
          tokenInput.name = 'token_ws';
          tokenInput.value = token;
          
          form.appendChild(tokenInput);
          document.body.appendChild(form);
          form.submit();
        } else {
          showModal('Error', 'Error al iniciar el pago. Por favor intente nuevamente.');
        }
      }
    } catch (err) {
      console.error('Order/Payment error:', err);
      showModal('Error', 'Ocurrió un error al procesar su pedido.');
    }
  };

  const getDashboardPath = () => {
    return isAdmin ? '/admin' : '/client';
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${isAdmin ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900' : 'bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900'} flex items-center justify-center`}>
        <div className="text-center">
          <div className={`inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${isAdmin ? 'border-blue-500' : 'border-indigo-500'}`}></div>
          <p className="mt-4 text-gray-400">Loading menu...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen ${isAdmin ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900' : 'bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900'} flex items-center justify-center`}>
        <div className="bg-red-600/20 border border-red-500/30 rounded-xl p-6 text-center">
          <p className="text-red-300">Error loading menu: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isAdmin ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900' : 'bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900'} pb-24`}>
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">{isAdmin ? 'Manage Menu' : 'Our Menu'}</h1>
              <p className="text-gray-400 text-sm mt-1">{isAdmin ? 'Add, edit, or delete menu items' : 'Browse our delicious dishes'}</p>
            </div>
            <button
              onClick={() => navigate(getDashboardPath())}
              className={`${isAdmin ? 'bg-blue-600 hover:bg-blue-700' : 'bg-indigo-600 hover:bg-indigo-700'} text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2`}
            >
              <span>⬅️</span>
              Back to Dashboard
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Admin: Add Menu Item Form */}
        {isAdmin && !editingItem && (
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-bold text-white mb-4">➕ Add Menu Item</h2>
            <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                placeholder="Name" 
                value={newItem.name} 
                onChange={e => setNewItem({...newItem, name: e.target.value})} 
                className="p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400" 
                required 
              />
              <input 
                placeholder="Description" 
                value={newItem.description} 
                onChange={e => setNewItem({...newItem, description: e.target.value})} 
                className="p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400" 
                required 
              />
              <input 
                type="number" 
                step="0.01" 
                placeholder="Price" 
                value={newItem.price} 
                onChange={e => setNewItem({...newItem, price: parseFloat(e.target.value)})} 
                className="p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400" 
                required 
              />
              <input 
                placeholder="Category" 
                value={newItem.category} 
                onChange={e => setNewItem({...newItem, category: e.target.value})} 
                className="p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400" 
                required 
              />
              <button 
                type="submit" 
                className="md:col-span-2 bg-green-600 hover:bg-green-700 text-white font-semibold p-3 rounded-lg transition-colors"
              >
                ✅ Add Item
              </button>
            </form>
          </div>
        )}

        {/* Admin: Edit Menu Item Form */}
        {isAdmin && editingItem && (
          <div className="bg-blue-600/20 border-2 border-blue-500/50 backdrop-blur-sm rounded-xl p-6 mb-8">
            <h2 className="text-xl font-bold text-white mb-4">✏️ Edit Menu Item</h2>
            <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                placeholder="Name" 
                value={editingItem.name} 
                onChange={e => setEditingItem({...editingItem, name: e.target.value})} 
                className="p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400" 
                required 
              />
              <input 
                placeholder="Description" 
                value={editingItem.description} 
                onChange={e => setEditingItem({...editingItem, description: e.target.value})} 
                className="p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400" 
                required 
              />
              <input 
                type="number" 
                step="0.01" 
                placeholder="Price" 
                value={editingItem.price} 
                onChange={e => setEditingItem({...editingItem, price: parseFloat(e.target.value)})} 
                className="p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400" 
                required 
              />
              <input 
                placeholder="Category" 
                value={editingItem.category} 
                onChange={e => setEditingItem({...editingItem, category: e.target.value})} 
                className="p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400" 
                required 
              />
              <button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-lg transition-colors"
              >
                💾 Update Item
              </button>
              <button 
                type="button" 
                onClick={() => setEditingItem(null)} 
                className="bg-gray-600 hover:bg-gray-700 text-white font-semibold p-3 rounded-lg transition-colors"
              >
                ❌ Cancel
              </button>
            </form>
          </div>
        )}

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.menu.map((item: MenuItem) => (
            <div 
              key={item.id} 
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:bg-gray-800/70 hover:border-blue-500/50 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold text-white mb-2">{item.name}</h3>
              <p className="text-gray-400 mb-3 text-sm">{item.description}</p>
              <p className="text-xs text-gray-500 mb-3">
                <span className="bg-gray-700/50 px-2 py-1 rounded">📂 {item.category}</span>
              </p>
              <p className="text-3xl font-bold text-blue-400 mb-4">${item.price.toFixed(2)}</p>
              
              {isAdmin && (
                <div className="flex gap-2">
                  <button 
                    onClick={() => setEditingItem(item)} 
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-semibold"
                  >
                    ✏️ Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id)} 
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors font-semibold"
                  >
                    🗑️ Delete
                  </button>
                </div>
              )}
              
              {isClient && (
                <button 
                  onClick={() => addToCart(item)} 
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-lg transition-colors font-semibold flex items-center justify-center gap-2"
                >
                  🛒 Add to Cart
                </button>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* Shopping Cart - Fixed Bottom */}
      {isClient && cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800/95 backdrop-blur-sm border-t-2 border-indigo-500/50 shadow-2xl p-4 max-h-80 overflow-y-auto z-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-xl text-white flex items-center gap-2">
                🛒 Shopping Cart
              </h3>
              <button 
                onClick={clearCart} 
                className="text-sm text-red-400 hover:text-red-300 hover:underline transition-colors"
              >
                🗑️ Clear Cart
              </button>
            </div>
            
            <div className="space-y-2 mb-4 max-h-40 overflow-y-auto">
              {cart.map(({ item, quantity }) => (
                <div 
                  key={item.id} 
                  className="flex justify-between items-center bg-gray-700/50 border border-gray-600 p-3 rounded-lg"
                >
                  <div className="flex-1">
                    <span className="font-medium text-white">{item.name}</span>
                    <span className="text-gray-400 text-sm ml-2">${item.price.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => removeFromCart(item.id)} 
                      className="bg-red-600 hover:bg-red-700 text-white w-8 h-8 rounded-lg font-bold transition-colors"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-bold text-white">{quantity}</span>
                    <button 
                      onClick={() => addToCart(item)} 
                      className="bg-green-600 hover:bg-green-700 text-white w-8 h-8 rounded-lg font-bold transition-colors"
                    >
                      +
                    </button>
                    <span className="w-20 text-right text-white font-semibold">
                      ${(item.price * quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t border-gray-600">
              <div>
                <p className="text-sm text-gray-400">
                  {cart.reduce((a, b) => a + b.quantity, 0)} items
                </p>
                <p className="font-bold text-2xl text-white">
                  Total: <span className="text-indigo-400">${cart.reduce((a, b) => a + (b.item.price * b.quantity), 0).toFixed(2)}</span>
                </p>
              </div>
              <button 
                onClick={handlePlaceOrder} 
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-bold transition-colors shadow-lg flex items-center gap-2"
              >
                ✅ Place Order
              </button>
            </div>
          </div>
        </div>
      )}
      <Modal
        isOpen={modalConfig.isOpen}
        onClose={closeModal}
        title={modalConfig.title}
        onConfirm={modalConfig.onConfirm}
      >
        {modalConfig.message}
      </Modal>
    </div>
  );
}
