import React from 'react';
import { useMutation } from '@apollo/client/react';
import { CREATE_PAYMENT } from '../graphql/mutations/payment';

interface PaymentButtonProps {
  amount: number;
  buyOrder: string;
  sessionId: string;
}

interface CreatePaymentData {
  createPayment: {
    success: boolean;
    url: string;
    token: string;
  };
}

export const PaymentButton: React.FC<PaymentButtonProps> = ({ amount, buyOrder, sessionId }) => {
  const [createPayment, { loading, error }] = useMutation<CreatePaymentData>(CREATE_PAYMENT);

  const handlePayment = async () => {
    try {
      const { data } = await createPayment({
        variables: {
          amount,
          buyOrder,
          sessionId,
        },
      });

      if (data?.createPayment?.success) {
        // Create a form to submit to Webpay
        const form = document.createElement('form');
        form.action = data.createPayment.url;
        form.method = 'POST';

        const tokenInput = document.createElement('input');
        tokenInput.type = 'hidden';
        tokenInput.name = 'token_ws';
        tokenInput.value = data.createPayment.token;

        form.appendChild(tokenInput);
        document.body.appendChild(form);
        form.submit();
      }
    } catch (err) {
      console.error('Error initiating payment:', err);
    }
  };

  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
    >
      {loading ? 'Procesando...' : 'Pagar con Webpay'}
    </button>
  );
};
