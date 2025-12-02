import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import { GET_MENU } from '../graphql/queries/menu';
import { CREATE_MENU_ITEM, DELETE_MENU_ITEM } from '../graphql/mutations/menu';
import { CREATE_ORDER } from '../graphql/mutations/order';
import { useAuth } from '../hooks/useAuth';
import type { GetMenuResponse, MenuItem } from '../types/graphql';

export default function Menu() {
  const { isAdmin, isClient } = useAuth();
  const { data, loading, error, refetch } = useQuery<GetMenuResponse>(GET_MENU);
  
  const [createMenuItem] = useMutation(CREATE_MENU_ITEM, { 
    onCompleted: () => {
      refetch();
      setNewItem({ name: '', description: '', price: 0, category: '' });
      alert('Item created!');
    } 
  });
  const [deleteMenuItem] = useMutation(DELETE_MENU_ITEM, { onCompleted: () => refetch() });
  const [createOrder] = useMutation(CREATE_ORDER, {
    onCompleted: () => {
      setCart([]);
      alert('Order placed successfully!');
    }
  });

  const [newItem, setNewItem] = useState({ name: '', description: '', price: 0, category: '' });
  const [cart, setCart] = useState<{ item: MenuItem; quantity: number }[]>([]);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    createMenuItem({ variables: { ...newItem, price: parseFloat(newItem.price.toString()) } });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure?')) {
      deleteMenuItem({ variables: { id } });
    }
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

  const handlePlaceOrder = () => {
    const items = cart.map(c => ({
      menuItemId: c.item.id,
      name: c.item.name,
      quantity: c.quantity,
      price: c.item.price
    }));
    createOrder({ variables: { items } });
  };

  if (loading) return <p>Loading menu...</p>;
  if (error) return <p>Error loading menu: {error.message}</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Nuestro Menú</h1>

      {isAdmin && (
        <div className="bg-gray-100 p-4 rounded mb-8">
          <h2 className="text-xl font-bold mb-4">Admin: Add Menu Item</h2>
          <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input placeholder="Name" value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} className="p-2 border rounded" required />
            <input placeholder="Description" value={newItem.description} onChange={e => setNewItem({...newItem, description: e.target.value})} className="p-2 border rounded" required />
            <input type="number" placeholder="Price" value={newItem.price} onChange={e => setNewItem({...newItem, price: parseFloat(e.target.value)})} className="p-2 border rounded" required />
            <input placeholder="Category" value={newItem.category} onChange={e => setNewItem({...newItem, category: e.target.value})} className="p-2 border rounded" required />
            <button type="submit" className="bg-green-600 text-white p-2 rounded hover:bg-green-700">Add Item</button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data?.menu.map((item: MenuItem) => (
          <div key={item.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200">
            <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
            <p className="text-gray-600 mb-4">{item.description}</p>
            <p className="text-sm text-gray-500 mb-2">Category: {item.category}</p>
            <p className="text-2xl font-bold text-blue-600">${item.price}</p>
            
            {isAdmin && (
              <button onClick={() => handleDelete(item.id)} className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full">
                Delete
              </button>
            )}
            
            {isClient && (
              <button onClick={() => addToCart(item)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full">
                Add to Cart
              </button>
            )}
          </div>
        ))}
      </div>

      {isClient && cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg">Cart ({cart.reduce((a, b) => a + b.quantity, 0)} items)</h3>
              <p>Total: ${cart.reduce((a, b) => a + (b.item.price * b.quantity), 0)}</p>
            </div>
            <button onClick={handlePlaceOrder} className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700">
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
