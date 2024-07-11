import { auth } from "../firebaseConfig"
import { useAuth } from "../providers/AuthProvider"
import { useUpdateProfile } from "react-firebase-hooks/auth"
import { useSignOut } from "react-firebase-hooks/auth"
import { Navigate } from "react-router-dom"
import { Modal, Avatar, Spinner } from "flowbite-react"
import { EditText } from "react-edit-text"
import 'react-edit-text/dist/index.css';
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

const CuentaPage = () => {

    const { user, loading, error } = useAuth();
    const [signOut] = useSignOut(auth);
    const [updateProfile, updating, errorUpdate] = useUpdateProfile(auth);
    const [displayName, setDisplayName] = useState('Nombre y Apellido');
    const [initials, setInitials] = useState('DyN');

    useEffect(() => {
        if (user) {
            if (user.displayName) {
                setDisplayName(user.displayName)
                setInitials(user.displayName.substring(0,2).toUpperCase())
            }
        }
    }, [user])

    if (loading) {
        return (
            <span>Cargando...</span>
        )
    }

    if (!user) {
        return <Navigate to="/login" />
    }

    const letrasPerfil = () => {
        const letras = displayName.substring(0, 2);
    }

    const updatePerfil = async () => {
        const success = await updateProfile({ displayName, });
        if (success) {
            toast.success('Nombre Actualizado');
        }
    }

    return (
        <div className="flex flex-1 flex-col gap-4 pt-3">

            {user &&
                <>
                    <Avatar size="lg" placeholderInitials={initials} rounded bordered color="purple">
                        <div className="space-y-1 font-medium">
                            <EditText
                                name="displayName"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                editButtonProps={{ style: { padding: 5, } }}
                                onSave={updatePerfil}
                                showEditButton />
                            <div className="text-sm text-gray-500 font-bold">{user.email}</div>
                        </div>
                    </Avatar>
                    <button onClick={signOut} className="p-2 max-w-sm mx-auto bg-red-500 rounded-md text-white font-bold">Cerrar Sesion</button>
                    <Modal show={updating} >
                        <Modal.Body>
                            <div className="flex w-full p-8 flex-col gap-10 justify-center align-middle">
                                <Spinner color="success" size="xl" className="flex mx-auto" />
                                <span className="flex mx-auto animate-pulse text-center">Guardando Nombre...</span>
                            </div>
                        </Modal.Body>
                    </Modal>
                </>
            }

        </div>
    )
}
export default CuentaPage