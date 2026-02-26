import axiosInstance from "utils/axios.config";
import axios from "axios"

export async function getIpInfo(){
    const axiosApi = axiosInstance({});
    const response = axiosApi.get('geo');
    return response
}
export async function login(username:string , password:string){
    const axiosApi = axiosInstance({ headers : {
        "Content-Type":" application/json"
    }});
    const response  = await axiosApi.post("login",{
        username:username,
        password:password
    });
    return response
}

export async function logout(){
    const axiosApi = axiosInstance({});
    const token = localStorage.getItem('token');
    const response = await axiosApi.post("logout", {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if(!response){
        return false
    }
    return true
}