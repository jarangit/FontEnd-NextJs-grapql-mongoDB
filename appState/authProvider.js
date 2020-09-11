import React, { createContext, useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import Router from 'next/router'


export const AuthContext = createContext()

const AuthProvider = ({children, userData}) => {

    const [user, setUser] = useState(userData)

    const [ID_CatPro_FromC, setID_CatPro_FromC] = useState('')
    const [ID_ATTPro_FromC, setID_ATTPro_FromC] = useState([])

    const [ID_CatPro_FromEdit, setID_CatPro_FromEdit] = useState('')
    const [ID_ATTPro_FromEdit, setID_ATTPro_FromEdit] = useState([])


    useEffect(() => {
        const syncLogout = e => {
            if ( e.key === 'logout' ) {
                setUser(null)
                Router.push("/products")
            }
        }

        window.addEventListener("storage", syncLogout)

        return () => {
            window.removeEventListener("storage", syncLogout)
            window.localStorage.removeItem('logout')
        }
       
    }, [])



    const setAuthUser = userInfo => setUser(userInfo)

    const Signout = () => {
        Cookies.remove('jwt')
        setUser('')
        localStorage.setItem("logout", Date.now())
        Router.push('/products')
    }
    return (
        <AuthContext.Provider value = { { 
            user, 
            setAuthUser, 

            Signout,
            
            ID_CatPro_FromC, 
            setID_CatPro_FromC,

            ID_ATTPro_FromC, 
            setID_ATTPro_FromC,

            ID_ATTPro_FromEdit,
            setID_ATTPro_FromEdit,

            ID_CatPro_FromEdit,
            setID_CatPro_FromEdit,
            } } > 

            { children }
        </AuthContext.Provider>
    )
}

export default AuthProvider
