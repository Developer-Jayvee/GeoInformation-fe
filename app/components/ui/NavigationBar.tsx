import "./styles/nav.css"
import {
    Logout
} from "services/AuthService"
import { useNavigate } from "react-router";
export default function NavigationBar(){
    const navigate = useNavigate();

    const handleSignout = async () => {
        const response = await Logout();
        if(response){
            navigate('/');
        }
    }
    return (
        <header>
                <button onClick={handleSignout}> Signout </button>
        </header>
    )
}