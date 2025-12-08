import { PaymentButton } from '../components/PaymentButton';

export default function Payment() {
  // Generate a random session ID for testing
  const sessionId = `session-${Math.floor(Math.random() * 1000000)}`;
  const buyOrder = `order-${Math.floor(Math.random() * 1000000)}`;
  const amount = 29750;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        Procesar Pago
      </h1>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Resumen de Orden</h2>
        <div className="space-y-4 mb-6">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span className="font-semibold">$25.000</span>
          </div>
          <div className="flex justify-between">
            <span>Impuestos:</span>
            <span className="font-semibold">$4.750</span>
          </div>
          <div className="border-t pt-4 flex justify-between text-xl">
            <span className="font-bold">Total:</span>
            <span className="font-bold text-blue-600">${amount.toLocaleString('es-CL')}</span>
          </div>
        </div>
        <div className="w-full">
          <PaymentButton 
            amount={amount} 
            buyOrder={buyOrder} 
            sessionId={sessionId} 
          />
        </div>
      </div>
    </div>
  );
}
