import { Link } from "react-router-dom"
import "./login.css"
import LOGIN_BG from "../../assests/img/login-bg.png"
import { useContext, useRef, useState } from "react"
import { Context } from "../../context/Context"
import axios from "axios"

const Login = () => {

    const [isError, setIsError] = useState(false);
    const userRef = useRef();
    const passwordRef = useRef();
    const { dispatch, isFetching } = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({type: "LOGIN_START"});
        setIsError(false);
        try{
            const isEmail = /\S+@\S+\.\S+/;
            let response;
            if(isEmail.test(userRef.current.value)){
                response = await axios.post("/auth/login", {
                    email: userRef.current.value,
                    password: passwordRef.current.value
                });
            }else{
                response = await axios.post("/auth/login", {
                    username: userRef.current.value,
                    password: passwordRef.current.value
                });
            }
            dispatch({type: "LOGIN_SUCCESS", payload: response.data});
        }catch(err) {
            setIsError(true);
            dispatch({type: "LOGIN_FAILURE"});
        }
        userRef.current.value = "";
        passwordRef.current.value = "";
    };
  return (
    <div className="login">
        <div className="login-img-container">
            <img className="login-img" src={LOGIN_BG} alt="" />
        </div>
        <div className="login-all-cont">
            <span className="login-text">Login</span>
            <form className="login-form" onSubmit={handleSubmit}>
                <input 
                    className="input-login" 
                    type="text" 
                    name="email-login" 
                    id="email-login"
                    placeholder="Your user name or email..."
                    required
                    ref={userRef}
                />
                <input 
                    type="password" 
                    name="password-login" 
                    id="password-login"
                    className="input-login"
                    required
                    autoCorrect="off"
                    autoComplete="new-password"
                    placeholder="Your Password..."
                    ref={passwordRef} 
                />
                <button 
                    className="btn-login" 
                    type="submit"
                    disabled={isFetching}
                >login</button>
            </form>
            <button className="log-reg-btn">
                <Link className="Link Link-log-reg" to="/register">Do not have an account? Register Here.</Link>
            </button>
            {isError && (<p style={{fontSize:"15px", color:"red"}}>Something went wrong</p>)}
        </div>
    </div>
  )
}

export default Login