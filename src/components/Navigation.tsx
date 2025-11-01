import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-gray-800">
            Restaurant
          </Link>
          <div className="flex space-x-6">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Inicio
            </Link>
            <Link 
              to="/menu" 
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Menú
            </Link>
            <Link 
              to="/payment" 
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Pago
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
