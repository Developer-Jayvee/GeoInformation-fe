import {
    login,
    logout
} from "services/api"
export async function Login(username:string , password:string){
    const response = await login(username,password);
    if(!response.data){
        return false;
    }
    const token = response.data.token;
    localStorage.setItem('token',token);
    return response.data;    
}
export async function Logout(){
    const response = await logout();
    if(!response){
        return false;
    }
    localStorage.removeItem('token');
    return true;
}