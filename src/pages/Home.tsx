export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Bienvenido a Nuestro Restaurant
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Disfruta de la mejor comida y experiencia culinaria.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-3">Nuestro Menú</h2>
          <p className="text-gray-600">
            Explora nuestra variedad de platos preparados con ingredientes frescos.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-3">Pago Seguro</h2>
          <p className="text-gray-600">
            Paga de forma segura con Webpay Plus integrado.
          </p>
        </div>
      </div>
    </div>
  );
}
