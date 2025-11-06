import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { useNavigate } from "react-router-dom";
import { REGISTER_MUTATION } from "../graphql/mutations/auth";
import type { RegisterResponse, RegisterVariables } from "../types/graphql";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rPassword, setRPassword] = useState("");
    const [terms, setTerms] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const [registerMutation, { loading }] = useMutation<RegisterResponse, RegisterVariables>(REGISTER_MUTATION, {
        onCompleted: (data) => {
            console.log("Registro exitoso:", data.register.message);
            // Redirigir a la página de confirmación de cuenta (mensaje de revisar email)
            navigate("/auth/confirm-account");
        },
        onError: (error) => {
            console.error("Error en el registro:", error);
            
            // Detectar diferentes tipos de errores y mostrar mensajes apropiados
            const errorMessage = error.message.toLowerCase();
            
            if (errorMessage.includes('already registered') || 
                errorMessage.includes('already exists') || 
                errorMessage.includes('ya existe') || 
                errorMessage.includes('ya está registrado') ||
                errorMessage.includes('duplicate') ||
                errorMessage.includes('conflict')) {
                setError("Este correo electrónico ya está registrado. Por favor, inicia sesión o usa otro correo.");
            } else if (errorMessage.includes('invalid email') || errorMessage.includes('correo inválido')) {
                setError("El formato del correo electrónico no es válido");
            } else if (errorMessage.includes('password') && errorMessage.includes('weak')) {
                setError("La contraseña no cumple con los requisitos de seguridad");
            } else if (errorMessage.includes('network') || errorMessage.includes('fetch') || errorMessage.includes('failed to fetch')) {
                setError("Error de conexión. Por favor, verifica tu conexión a internet e intenta nuevamente.");
            } else {
                setError(error.message || "Error al registrar usuario. Por favor, intenta nuevamente.");
            }
        },
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // Validaciones
        if (!name.trim()) {
            setError("El nombre es requerido");
            return;
        }

        if (!email.trim()) {
            setError("El correo electrónico es requerido");
            return;
        }

        if (password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres");
            return;
        }

        if (password !== rPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }

        if (!terms) {
            setError("Debes aceptar los términos de uso");
            return;
        }

        try {
            await registerMutation({
                variables: {
                    email: email.trim(),
                    password,
                    name: name.trim(),
                },
            });
        } catch (err) {
            // El error ya se maneja en onError
            console.error("Error capturado:", err);
        }
    };

    const isFormValid = email.trim() !== "" && password.trim() !== "" && rPassword.trim() !== "" && name.trim() !== "" && terms;
    
    return (
        <div className="flex flex-col items-center justify-center h-screen dark bg-linear-to-t from-sky-500 to-indigo-500">
            <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-200 mb-4">Register</h2>
                
                {error && (
                    <div className="bg-red-500 text-white p-3 rounded-md mb-4 flex items-start">
                        <svg 
                            className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                        >
                            <path 
                                fillRule="evenodd" 
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" 
                                clipRule="evenodd" 
                            />
                        </svg>
                        <div>
                            <p className="font-semibold">{error}</p>
                            {error.includes("ya está registrada") && (
                                <a 
                                    href="/login" 
                                    className="text-sm underline mt-1 inline-block hover:text-gray-100"
                                >
                                    Ir a iniciar sesión
                                </a>
                            )}
                        </div>
                    </div>
                )}

                {loading && (
                    <div className="bg-blue-500 text-white p-3 rounded-md mb-4">
                        Registrando usuario...
                    </div>
                )}

                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <input placeholder="Nombre"
                        className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        disabled={loading}
                        />
                    <input placeholder="Correo electronico"
                        className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                    />

                    <input placeholder="Contraseña"
                        className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                    />

                    <input placeholder="Repetir contraseña"
                        className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                        type="password"
                        value={rPassword}
                        onChange={(e) => setRPassword(e.target.value)}
                        disabled={loading}
                    />
                    <label className="flex cursor-pointer items-center justify-between p-1 text-slate-400"></label>
                    <label className="flex cursor-pointer items-center justify-between p-1 text-slate-400">
                        Accept terms of use
                        <div className="relative inline-block">
                            <input className="peer h-6 w-12 cursor-pointer appearance-none rounded-full border border-gray-300 bg-gary-400 checked:border-green-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2" type="checkbox"
                                checked={terms}
                                onChange={(e)=>setTerms(e.target.checked)}
                                disabled={loading}
                            />
                            <span className="pointer-events-none absolute left-1 top-1 block h-4 w-4 rounded-full bg-slate-600 transition-all duration-200 peer-checked:left-7 peer-checked:bg-green-300" />
                        </div>
                    </label>
                    <button 
                        className={`bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150 ${(isFormValid && !loading) ? '' : 'opacity-50 cursor-not-allowed'}`} 
                        type="submit" 
                        disabled={!isFormValid || loading}
                    >
                        {loading ? "Registrando..." : "Registrar"}
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <p className="text-gray-400 text-sm">
                        ¿Ya tienes cuenta?{" "}
                        <a href="/login" className="text-blue-400 hover:text-blue-300">
                            Inicia sesión
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}