import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

export default function PaymentResult() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<string | null>(null);
  const [details, setDetails] = useState<any>({});

  useEffect(() => {
    const statusParam = searchParams.get('status');
    setStatus(statusParam);

    const params: any = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    setDetails(params);
  }, [searchParams]);

  const handleBack = () => {
    navigate('/client/orders');
  };

  if (!status) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center">
        {status === 'success' ? (
          <>
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
              <svg className="h-10 w-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">¡Pago Exitoso!</h2>
            <p className="text-gray-600 mb-6">Tu transacción ha sido procesada correctamente.</p>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <div className="flex justify-between mb-2">
                <span className="text-gray-500">Monto:</span>
                <span className="font-semibold text-gray-900">${Number(details.amount).toLocaleString('es-CL')}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-500">Orden:</span>
                <span className="font-mono text-gray-900">{details.buy_order}</span>
              </div>
              {details.token && (
                <div className="flex justify-between mb-2">
                  <span className="text-gray-500">Token:</span>
                  <span className="font-mono text-gray-900 text-xs truncate ml-2">{details.token.substring(0, 20)}...</span>
                </div>
              )}
              {details.receipt_id && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Boleta ID:</span>
                  <span className="font-mono text-gray-900 text-xs truncate ml-2">{details.receipt_id}</span>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
              <svg className="h-10 w-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Pago Fallido</h2>
            <p className="text-gray-600 mb-6">
              {details.message || 'La transacción no pudo ser procesada.'}
            </p>
            
            {details.response_code && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                <div className="flex justify-between">
                  <span className="text-gray-500">Código de respuesta:</span>
                  <span className="font-mono text-gray-900">{details.response_code}</span>
                </div>
              </div>
            )}
          </>
        )}

        <button
          onClick={handleBack}
          className={`w-full py-3 px-4 rounded-lg text-white font-semibold transition-colors ${
            status === 'success' 
              ? 'bg-green-600 hover:bg-green-700' 
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {status === 'success' ? 'Ver mis pedidos' : 'Volver a intentar'}
        </button>
      </div>
    </div>
  );
}
