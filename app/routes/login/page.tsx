import { useEffect, useState } from "react"
import {
    Login
} from "services/AuthService"
import "./login.css"
import { useNavigate } from "react-router";

type FormTypes = {
    email:string;
    password:string;
}
export default function LoginPage(){

    const navigate = useNavigate();
    const [formData , setFormData] = useState<FormTypes>({
        email:"",
        password:""
    })

    const submitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const canLogin = await Login(formData.email , formData.password);
        
        if(canLogin){
            navigate('/home');
        }
    }
    const handleFormData = (val:string , key : keyof FormTypes) => {
        setFormData(
            prev => ({
                ...prev,
                [key]:val
            })
        );
    }
    return (
       <div className="login-container">
        <div className="login-card">
            <div className="login-header">
                <h2>Sign In</h2>
                <p>Enter your credentials to access your account</p>
            </div>
            
            <form className="login-form" id="loginForm" onSubmit={submitLogin}>
                <div className="form-group">
                    <div className="input-wrapper">
                        <input type="email" id="email" name="email" onChange={ e => handleFormData(e.target.value , 'email')} required autoComplete="email" />
                        <label htmlFor="email">Email Address</label>
                    </div>
                    <span className="error-message" id="emailError"></span>
                </div>

                <div className="form-group">
                    <div className="input-wrapper password-wrapper">
                        <input type="password" id="password" name="password" required autoComplete="current-password"
                        onChange={ e => handleFormData(e.target.value , 'password')}
                        />
                        <label htmlFor="password">Password</label>
                        <button type="button" className="password-toggle" id="passwordToggle" aria-label="Toggle password visibility">
                            <span className="eye-icon"></span>
                        </button>
                    </div>
                    <span className="error-message" id="passwordError"></span>
                </div>

               
                <button type="submit" className="login-btn" >
                    <span className="btn-text" >Sign In</span>
                    <span className="btn-loader"></span>
                </button>
            </form>

            {/* <div className="signup-link">
                <p>Don't have an account? <a href="#">Create one</a></p>
            </div>

            <div className="success-message" id="successMessage">
                <div className="success-icon">✓</div>
                <h3>Login Successful!</h3>
                <p>Redirecting to your dashboard...</p>
            </div> */}
        </div>
    </div>

    )
}