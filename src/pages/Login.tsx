import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login(){
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(email && password) {
            navigate('/');
        }
    };

    const isFormValid = email.trim() !== "" && password.trim() !== "";

    return(
    <div className="flex flex-col items-center justify-center h-screen dark bg-linear-to-t from-sky-500 to-indigo-500">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-200 mb-4">Bienvenido</h2>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input 
            placeholder="Correo electronico" 
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            placeholder="Contraseña" 
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex items-center justify-between flex-wrap">
            <label className="text-sm text-gray-200 cursor-pointer" htmlFor="remember-me">
              <input className="mr-2" id="remember-me" type="checkbox" />
              Recordar en este dispositivo
            </label>
            <a className="text-sm text-blue-500 hover:underline mb-0.5" href="#">Recuperar contraseña?</a>
            <p className="text-white mt-4"> No tienes una cuenta? <a className="text-sm text-blue-500 hover:underline mt-4" onClick={()=>{navigate("/register")}}>Crear cuenta</a></p>
          </div>
          <button 
            className={`font-bold py-2 px-4 rounded-md mt-4 transition ease-in-out duration-150 ${
              isFormValid 
                ? 'bg-gradient-to-r from-indigo-500 to-blue-500 text-white hover:bg-indigo-600 hover:to-blue-600' 
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
            type="submit"
            disabled={!isFormValid}
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
    );
}