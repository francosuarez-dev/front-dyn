import { createContext, useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig"

const AuhtContext = createContext();

export const useAuth = () => {
    return useContext(AuhtContext);
}

export const AuthProvider = ({ children }) => {
    
    const [user, loading, error] = useAuthState(auth);

    return (
        <AuhtContext.Provider value={{ user, loading, error}}>
            {children}
        </AuhtContext.Provider>
    )
}