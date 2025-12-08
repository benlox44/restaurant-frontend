import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { LOGIN_MUTATION } from "../graphql/mutations/auth";
import type { LoginResponse, LoginVariables } from "../types/graphql";

// Helper function to decode JWT and extract role
function decodeJWT(token: string): { role?: string } | null {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error("Error decoding JWT:", error);
        return null;
    }
}

export default function Login(){
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const [loginMutation, { loading }] = useMutation<LoginResponse, LoginVariables>(LOGIN_MUTATION, {
        onCompleted: (data) => {
            console.log("Login exitoso");
            
            // Guardar el token en localStorage
            const token = data.login.accessToken;
            localStorage.setItem('accessToken', token);
            
            // Si marcó "recordar", guardar el email
            if (rememberMe) {
                localStorage.setItem('rememberedEmail', email);
            } else {
                localStorage.removeItem('rememberedEmail');
            }
            
            // Decodificar el token para obtener el rol
            const payload = decodeJWT(token);
            
            // Redirigir según el rol
            if (payload?.role === 'ADMIN') {
                navigate('/admin');
            } else {
                navigate('/client');
            }
        },
        onError: (error) => {
            console.error("Error en el login:", error);
            
            const errorMessage = error.message.toLowerCase();
            
            if (errorMessage.includes('invalid credentials') || 
                errorMessage.includes('incorrect') ||
                errorMessage.includes('wrong password')) {
                setError("Correo electrónico o contraseña incorrectos");
            } else if (errorMessage.includes('not confirmed') || 
                       errorMessage.includes('email not verified')) {
                setError("Por favor, confirma tu correo electrónico antes de iniciar sesión");
            } else if (errorMessage.includes('locked') || 
                       errorMessage.includes('blocked')) {
                setError("Tu cuenta ha sido bloqueada. Por favor, contacta al soporte");
            } else if (errorMessage.includes('network') || 
                       errorMessage.includes('fetch')) {
                setError("Error de conexión. Verifica tu internet e intenta nuevamente");
            } else {
                setError(error.message || "Error al iniciar sesión. Intenta nuevamente");
            }
        },
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!email.trim()) {
            setError("El correo electrónico es requerido");
            return;
        }

        if (!password.trim()) {
            setError("La contraseña es requerida");
            return;
        }

        try {
            await loginMutation({
                variables: {
                    email: email.trim(),
                    password,
                },
            });
        } catch (err) {
            // El error ya se maneja en onError
            console.error("Error capturado:", err);
        }
    };

    const isFormValid = email.trim() !== "" && password.trim() !== "";

    return(
    <div className="flex flex-col items-center justify-center h-screen dark bg-linear-to-t from-sky-500 to-indigo-500">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-200 mb-4">Bienvenido</h2>
        
        {error && (
            <div className="bg-red-500 text-white p-3 rounded-md mb-4 flex items-start">
                <svg 
                    className="w-5 h-5 mr-2 shrink-0 mt-0.5" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                >
                    <path 
                        fillRule="evenodd" 
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" 
                        clipRule="evenodd" 
                    />
                </svg>
                <p className="font-semibold">{error}</p>
            </div>
        )}

        {loading && (
            <div className="bg-blue-500 text-white p-3 rounded-md mb-4">
                Iniciando sesión...
            </div>
        )}

        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input 
            placeholder="Correo electronico" 
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <input 
            placeholder="Contraseña" 
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          <div className="flex items-center justify-between flex-wrap">
            <label className="text-sm text-gray-200 cursor-pointer" htmlFor="remember-me">
              <input 
                className="mr-2" 
                id="remember-me" 
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={loading}
              />
              Recordar en este dispositivo
            </label>
            <a className="text-sm text-blue-500 hover:underline mb-0.5" href="/forgot-password">¿Olvidaste tu contraseña?</a>
            <p className="text-white mt-4"> No tienes una cuenta? <a className="text-sm text-blue-500 hover:underline mt-4 cursor-pointer" onClick={()=>{navigate("/register")}}>Crear cuenta</a></p>
          </div>
          <button 
            className={`font-bold py-2 px-4 rounded-md mt-4 transition ease-in-out duration-150 ${
              (isFormValid && !loading)
                ? 'bg-gradient-to-r from-indigo-500 to-blue-500 text-white hover:bg-indigo-600 hover:to-blue-600' 
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
            type="submit"
            disabled={!isFormValid || loading}
          >
            {loading ? "Iniciando..." : "Iniciar Sesión"}
          </button>
        </form>
      </div>
    </div>
    );
}