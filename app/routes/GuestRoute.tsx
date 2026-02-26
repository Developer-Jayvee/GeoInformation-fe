import { useEffect, useState } from "react";
import { Navigate, Outlet , useLocation } from "react-router";


export default function GuestRoute(){
    const location = useLocation();
    const [isAlreadyLogin , setAlreadyLogin] = useState<boolean | null>(false);

    useEffect( () => {
        const token = localStorage.getItem('token');
        if(token){
            setAlreadyLogin(true);
        }
    },[])
    if(location.pathname === "/" && isAlreadyLogin){
        return <Navigate to="/home" replace />
    }
    return <Outlet/>
}