import { useEffect, useState } from "react"
import {
    Login
} from "services/AuthService"
import "app/routes/login/login.css"
import { useNavigate } from "react-router";
import {
    isEmailValid
} from 'utils/validation'
import type {
    FormTypes,
} from 'types/index'

type SubmitType = boolean;
type ErrorMessagesType = FormTypes;
export default function LoginPage() {

    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [errorMessages, setErrorMessages] = useState<ErrorMessagesType>({
        email: "",
        password: ""
    })
    const [canSubmit, setCanSubmit] = useState<SubmitType>(false);
    const [formData, setFormData] = useState<FormTypes>({
        email: "",
        password: ""
    });
    useEffect(() => {
        const computeFieldChange = () => {

            if (!formData.email || !formData.password) setCanSubmit(false);
            else if (formData.email && formData.password) setCanSubmit(true)
        }
        computeFieldChange()
    }, [formData]);

    const submitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const action = confirm("Continue login?");
        if (!action) return;
        if (!canSubmit) return;

        const response = await Login(formData.email, formData.password);
        if (response) {
            setSuccessMessage(response.message)
            setTimeout(() => {
                navigate('/home');
            }, 1500);
        }
    }
    const handleFormData = (val: string, key: keyof FormTypes) => {
        let hasError = val.length === 0;
        let errorMessage = `Please fill up this field.`
        if (key === "email") {
            const isInValid = !isEmailValid({ email: val });
            hasError = isInValid
            errorMessage = isInValid ? 'Email is not valid' : errorMessage
        }
        setErrorMessages(
            (prev) => ({
                ...prev,
                [key]: hasError ? errorMessage : ''
            })
        )
        setFormData(
            prev => ({
                ...prev,
                [key]: val
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
                            <input type="email" id="email" name="email" onChange={e => handleFormData(e.target.value, 'email')} autoComplete="email" />
                            <label htmlFor="email">Email Address</label>
                        </div>
                        <span className="error-message" id="emailError">{errorMessages.email}</span>
                    </div>

                    <div className="form-group">
                        <div className="input-wrapper password-wrapper">
                            <input type="password" id="password" name="password" autoComplete="current-password"
                                onChange={e => handleFormData(e.target.value, 'password')}
                            />
                            <label htmlFor="password">Password</label>
                            <button type="button" className="password-toggle" id="passwordToggle" aria-label="Toggle password visibility">
                                <span className="eye-icon"></span>
                            </button>
                        </div>
                        <span className="error-message" id="passwordError">{errorMessages.password}</span>
                    </div>


                    <button type="submit" className="login-btn" disabled={!canSubmit} >
                        <span className="btn-text" >Sign In</span>
                        <span className="btn-loader"></span>
                    </button>
                    <h3 className={`success-message ${successMessage !== '' ? 'show' : ''}`}>{successMessage}</h3>
                </form>


            </div>
        </div>

    )
}