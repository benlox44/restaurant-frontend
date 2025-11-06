export default function ConfirmAccount() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    {/* Icono de email */}
                    <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-4">
                        <svg
                            className="h-12 w-12 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                        </svg>
                    </div>

                    {/* Título */}
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
                        ¡Revisa tu correo electrónico!
                    </h2>

                    {/* Mensaje principal */}
                    <p className="text-lg text-gray-600 mb-4">
                        Te hemos enviado un correo de confirmación
                    </p>

                    {/* Descripción detallada */}
                    <div className="bg-white shadow-md rounded-lg p-6 text-left">
                        <p className="text-gray-700 mb-4">
                            Para completar tu registro, por favor verifica tu cuenta haciendo clic en el enlace que hemos enviado a tu dirección de correo electrónico.
                        </p>
                        
                        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg
                                        className="h-5 w-5 text-blue-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-blue-700">
                                        Si no recibes el correo en los próximos minutos, revisa tu carpeta de spam o correo no deseado.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <ul className="text-sm text-gray-600 space-y-2">
                            <li className="flex items-start">
                                <svg
                                    className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                <span>Verifica que la dirección de correo sea correcta</span>
                            </li>
                            <li className="flex items-start">
                                <svg
                                    className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                <span>El enlace de confirmación expira en 24 horas</span>
                            </li>
                        </ul>
                    </div>

                    {/* Botón de retorno */}
                    <div className="mt-6">
                        <a
                            href="/login"
                            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
                        >
                            <svg
                                className="mr-2 h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                />
                            </svg>
                            Volver al inicio de sesión
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}