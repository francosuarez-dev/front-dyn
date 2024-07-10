import { useState } from "react"
import { useSignInWithEmailAndPassword, useSendPasswordResetEmail } from "react-firebase-hooks/auth"
import { Button, Label, TextInput } from "flowbite-react"
import { auth } from "../firebaseConfig"
import { Navigate, Link } from "react-router-dom"
import { useAuth } from "../providers/AuthProvider"
import { toast } from "react-toastify"

const LoginPage = () => {

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
        signInWithEmailAndPassword,
        userCred,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const [sendPasswordResetEmail, sending, errorSend] = useSendPasswordResetEmail(
        auth
    )

    const actionCodeSettings = {
        url: 'https://margaritaticktes.web.app/login',
    };


    if (user) {
        return <Navigate to="/" />
    }

    return (
        <div className="flex w-full h-full flex-col justify-center justify-items-center align-middle items-center">
            <div className="flex w-full max-w-sm flex-col justify-center gap-4 bg-slate-100 p-2 rounded-lg shadow-md">
                <div className="mb-3">
                    <h1 className="w-full text-center text-3xl font-bold text-black-400">Acceder</h1>
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
                <Button color="blue" onClick={() => signInWithEmailAndPassword(email, pass)} disabled={loading}>{loading ? 'Cargando' : 'Ingresar'}</Button>
            </div>
            <span className="w-full text-center mt-4 font-semibold">NO TENES CUENTA ?</span>
            <div className="w-full items-center flex justify-center">
                <Link to={"/registro"} className="mx-auto p-2 text-center text-green-500 font-semibold">
                    REGISTRARSE
                </Link>
            </div>
            <div className="flex w-full items-center flex-col gap-2 ">
                <button
                    className="mx-auto p-2 text-center text-orange-500 font-semibold"
                    onClick={async () => {
                        const success = await sendPasswordResetEmail(
                            email
                        );
                        if (success) {
                            toast.success('Email Enviado', { position: 'top-center' })
                        } else {
                            toast.error('Error al Enviar Email', { position: 'top-center' })
                        }
                    }}
                >
                    OLVIDE MI CONTRASE&Ntilde;A
                </button>
                {sending && <span>ENVIANDO CORREO DE RECUPERACION</span>}
                <p className="text-center text-red-600 uppercase">
                    {errorSend ? ERROR_MSG[errorSend.code] : ''}
                </p>
            </div>
        </div>
    )
}
export default LoginPage