import { useQuery, useMutation } from '@apollo/client/react';
import { GET_ORDERS } from '../graphql/queries/order';
import { UPDATE_ORDER_STATUS } from '../graphql/mutations/order';
import type { GetOrdersResponse, Order, OrderItem } from '../types/graphql';
import { useAuth } from '../hooks/useAuth';

export default function AdminOrders() {
  const { isAdmin } = useAuth();
  const { data, loading, error, refetch } = useQuery<GetOrdersResponse>(GET_ORDERS);
  const [updateStatus] = useMutation(UPDATE_ORDER_STATUS, { onCompleted: () => refetch() });

  if (!isAdmin) return <p>Access Denied</p>;
  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleStatusChange = (id: string, status: string) => {
    updateStatus({ variables: { id, status } });
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Manage Orders</h1>
      <div className="space-y-4">
        {data?.orders.map((order: Order) => (
          <div key={order.id} className="bg-white p-4 rounded shadow border">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold">Order #{order.id.substring(0, 8)}</h3>
                <p className="text-sm text-gray-500">{new Date(order.createdAt * 1000).toLocaleString()}</p>
                <ul className="mt-2">
                  {order.items.map((item: OrderItem, idx: number) => (
                    <li key={idx}>
                      {item.quantity}x {item.name} (${item.price})
                    </li>
                  ))}
                </ul>
                <p className="font-bold mt-2">Total: ${order.total}</p>
              </div>
              <div>
                <select 
                  value={order.status} 
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  className="border p-2 rounded"
                >
                  <option value="PENDING">Pending</option>
                  <option value="PREPARING">Preparing</option>
                  <option value="READY">Ready</option>
                  <option value="DELIVERED">Delivered</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
