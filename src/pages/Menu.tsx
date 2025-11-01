export default function Menu() {
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        Nuestro Menú
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold mb-2">Plato 1</h3>
          <p className="text-gray-600 mb-4">Descripción del plato</p>
          <p className="text-2xl font-bold text-blue-600">$10.000</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold mb-2">Plato 2</h3>
          <p className="text-gray-600 mb-4">Descripción del plato</p>
          <p className="text-2xl font-bold text-blue-600">$15.000</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold mb-2">Plato 3</h3>
          <p className="text-gray-600 mb-4">Descripción del plato</p>
          <p className="text-2xl font-bold text-blue-600">$12.000</p>
        </div>
      </div>
    </div>
  );
}
