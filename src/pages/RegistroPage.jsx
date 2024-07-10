import { useState } from "react"
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth"
import { Button, Label, TextInput } from "flowbite-react"
import { auth } from "../firebaseConfig"
import { Navigate } from "react-router-dom"
import { useAuth } from "../providers/AuthProvider"

const RegistroPage = () => {

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const { user } = useAuth();

    const ERROR_MSG = {
        'auth/email-already-in-use': "El correo ingresado ya esta en uso",
        'auth/weak-password': "La contraseña debe tener al menos 6 caracteres",
        'auth/invalid-email': "Correo electronico no valido",
        'auth/missing-password': "Debe ingresar una contraseña ",
        'auth/missing-email': "Debe ingresar un correo electronico",
        'auth/invalid-credential': "Usuario o contraseña incorrectos"
    }

    const [
        createUserWithEmailAndPassword,
        userRegi,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth)


    if (user) {
        return <Navigate to="/" />
    }

    return (
        <div className="flex w-full flex-col justify-center justify-items-center align-middle items-center">
            <div className="flex w-full max-w-sm flex-col justify-center gap-4 bg-slate-100 p-2 rounded-lg shadow-md">
                <div className="mb-3">
                    <h1 className="w-full text-center text-3xl font-bold text-black-400">Crear Cuenta</h1>
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email" value="Email" />
                    </div>
                    <TextInput id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} required shadow />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password1" value="Password" />
                    </div>
                    <TextInput id="password1" type="password" value={pass} onChange={(e) => setPass(e.target.value)} required shadow />
                </div>
                <p className="text-center text-red-600">
                    {error ? ERROR_MSG[error.code] : ''}
                </p>
                <Button color="blue" onClick={() => createUserWithEmailAndPassword(email, pass)} disabled={loading}>{loading ? 'Cargando' : 'Registrarme'}</Button>
            </div>
        </div>
    )
}
export default RegistroPage