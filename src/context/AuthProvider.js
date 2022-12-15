import { createContext, useState } from "react";
import axios from "../api/axios";
import { useEffect } from "react";
const AuthContext = createContext({})

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({})
    useEffect(() => {
        const token = localStorage.getItem("user")
        setAuth(JSON.parse(token))
        if(token) {
          
          axios.defaults.headers.common["Authorization"] = `Bearer $`
        }
      }, [])
    return (
        <AuthContext.Provider value = {{auth, setAuth}}>
        {children}
        </AuthContext.Provider>
    )
}
export default AuthContext