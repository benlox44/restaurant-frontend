import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

export default function HomePage() {
    const navigate = useNavigate();
    const { user, isAuthenticated, loading } = useAuth();

    useEffect(() => {
        // If user is authenticated, redirect to their dashboard
        if (!loading && isAuthenticated && user) {
            if (user.role === 'ADMIN') {
                navigate('/admin');
            } else {
                navigate('/client');
            }
        }
    }, [loading, isAuthenticated, user, navigate]);

    // Show loading while checking auth
    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gradient-to-b from-sky-500 to-indigo-600">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
                    <p className="mt-4 text-white">Cargando...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-sky-500 via-indigo-500 to-indigo-600">
            <div className="relative overflow-hidden">
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="flex justify-between items-center mb-16">
                        <div className="flex items-center space-x-3">
                            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-3 rounded-lg shadow-lg">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-white">Restaurante</h1>
                                <p className="text-gray-100 text-sm">Del Sabor</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={() => navigate('/login')} className="px-6 py-2.5 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-indigo-600 transition-all duration-300">
                                Iniciar Sesión
                            </button>
                            <button onClick={() => navigate('/register')} className="px-6 py-2.5 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg">
                                Registrarse
                            </button>
                        </div>
                    </div>
                    <div className="text-center space-y-8 py-20">
                        <div className="space-y-4">
                            <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                                Sabores que
                                <span className="block text-yellow-300">Enamoran</span>
                            </h2>
                            <p className="text-xl text-gray-100 max-w-2xl mx-auto">Visítanos y disfruta de nuestra selección de platillos únicos. Consulta nuestro menú y reserva tu mesa.</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                            <button onClick={() => navigate('/register')} className="px-8 py-4 bg-white text-indigo-600 text-lg font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:scale-105 transform">🍽️ Ver Menú</button>
                            <button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-indigo-700 text-white text-lg font-semibold rounded-lg hover:bg-indigo-800 transition-all duration-300 border-2 border-white/20">Ver Más</button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
                        <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl border border-gray-700 text-center shadow-lg">
                            <div className="text-4xl font-bold text-yellow-300 mb-2">100+</div>
                            <div className="text-gray-200">Platillos Únicos</div>
                        </div>
                        <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl border border-gray-700 text-center shadow-lg">
                            <div className="text-4xl font-bold text-yellow-300 mb-2">15</div>
                            <div className="text-gray-200">Años de Experiencia</div>
                        </div>
                        <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl border border-gray-700 text-center shadow-lg">
                            <div className="text-4xl font-bold text-yellow-300 mb-2">100%</div>
                            <div className="text-gray-200">Ingredientes Frescos</div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="features" className="py-20 bg-indigo-900/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">¿Por qué elegirnos?</h3>
                        <p className="text-gray-200 max-w-2xl mx-auto">Una experiencia gastronómica única en nuestro local</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-sky-400 transition-all duration-300 group shadow-lg">
                            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                            </div>
                            <h4 className="text-xl font-semibold text-white mb-2">Menú Digital</h4>
                            <p className="text-gray-400">Consulta nuestro menú completo desde tu mesa con códigos QR</p>
                        </div>
                        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-sky-400 transition-all duration-300 group shadow-lg">
                            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            </div>
                            <h4 className="text-xl font-semibold text-white mb-2">Ubicación Céntrica</h4>
                            <p className="text-gray-400">Fácil acceso y estacionamiento disponible para tu comodidad</p>
                        </div>
                        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-sky-400 transition-all duration-300 group shadow-lg">
                            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                            </div>
                            <h4 className="text-xl font-semibold text-white mb-2">Pago Digital</h4>
                            <p className="text-gray-400">Paga con tarjeta en tu mesa de forma rápida y segura</p>
                        </div>
                        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-sky-400 transition-all duration-300 group shadow-lg">
                            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                            <h4 className="text-xl font-semibold text-white mb-2">Atención Personalizada</h4>
                            <p className="text-gray-400">Nuestro equipo te atiende con la mejor experiencia gastronómica</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-20 bg-gradient-to-r from-sky-500 to-indigo-600">
                <div className="max-w-4xl mx-auto text-center px-4">
                    <h3 className="text-4xl font-bold text-white mb-6">¿Listo para visitarnos?</h3>
                    <p className="text-xl text-white/95 mb-8">Crea tu cuenta para ver nuestro menú y conocer nuestras promociones</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button onClick={() => navigate('/register')} className="px-8 py-4 bg-white text-indigo-600 text-lg font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-xl">Crear Cuenta</button>
                        <button onClick={() => navigate('/login')} className="px-8 py-4 bg-transparent border-2 border-white text-white text-lg font-semibold rounded-lg hover:bg-white hover:text-indigo-600 transition-all duration-300">Iniciar Sesión</button>
                    </div>
                </div>
            </div>
            <div className="bg-indigo-900 border-t border-indigo-800 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center text-gray-300">
                        <p>© 2025 Restaurante Del Sabor. Todos los derechos reservados.</p>
                        <p className="text-sm mt-2">Pago seguro con Webpay Plus 🔒</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
