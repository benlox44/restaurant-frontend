import { useState } from "react";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rPassword, setRPassword] = useState("");
    const [terms, setTerms] = useState(false);


    const isFormValid = email.trim() !== "" && password.trim() !== "" && rPassword.trim() !== "" && terms;
    return (
        <div className="flex flex-col items-center justify-center h-screen dark bg-linear-to-t from-sky-500 to-indigo-500">
            <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-200 mb-4">Register</h2>
                <form className="flex flex-col">
                    <input placeholder="Nombre"
                        className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        />
                    <input placeholder="Correo electronico"
                        className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input placeholder="Contraseña"
                        className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <input placeholder="Repetir contraseña"
                        className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                        type="password"
                        value={rPassword}
                        onChange={(e) => setRPassword(e.target.value)}
                    />
                    <label className="flex cursor-pointer items-center justify-between p-1 text-slate-400"></label>
                    <label className="flex cursor-pointer items-center justify-between p-1 text-slate-400">
                        Accept terms of use
                        <div className="relative inline-block">
                            <input className="peer h-6 w-12 cursor-pointer appearance-none rounded-full border border-gray-300 bg-gary-400 checked:border-green-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2" type="checkbox"
                                checked={terms}
                                onChange={(e)=>setTerms(e.target.checked)}
                            />
                            <span className="pointer-events-none absolute left-1 top-1 block h-4 w-4 rounded-full bg-slate-600 transition-all duration-200 peer-checked:left-7 peer-checked:bg-green-300" />
                        </div>
                    </label>
                    <button className={`bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150 ${isFormValid ? '' : 'opacity-50 cursor-not-allowed'}`} type="submit" disabled={!isFormValid}>Registrar</button>
                </form>
            </div>
        </div>
    );
}