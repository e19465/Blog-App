import { Link, useNavigate } from "react-router-dom"
import "./register.css"
import REGIS_BG from "../../assests/img/regis-bg.png"
import { useState } from "react"
import axios from "axios"

const Register = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false);
        try{
            const response = await axios.post("/auth/register", {
                username,
                email,
                password,
            });
            
            response.data && navigate("/login");
            // response.data && window.location.replace("/login"); //this is also correct insted navigate but this method reloads the page
        }catch(err){
            setError(true);
            console.log(`Error: ${err.stack}`);
        }

        setUsername("");
        setEmail("");
        setPassword("");
    }

  return (
    <div className="register">
        <div className="register-img-container">
            <img className="register-img" src={REGIS_BG} alt="" />
        </div>
        <div className="register-all-cont">
            <span className="register-text">Register</span>
            <form className="register-form" onSubmit={handleSubmit}>
                <input 
                    type="text"
                    placeholder="Enter Username..."
                    required
                    id="reg-username"
                    className="input-register" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input 
                    className="input-register" 
                    type="email" 
                    name="email-register" 
                    id="email-register"
                    placeholder="Enter email..."
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    type="password" 
                    name="password-register" 
                    id="password-register"
                    className="input-register"
                    required
                    autoCorrect="off"
                    autoComplete="new-password"
                    placeholder="Enter Password..." 
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                    className="btn-register" 
                    type="submit"
                >Register</button>
            </form>
            <button className="log-reg-btn">
                <Link className="Link Link-log-reg" to="/login">Already have an account? Login Here.</Link>
            </button>
            {error && (<p style={{fontSize:"15px", color:"red"}}>Username or Email already in use</p>)}
        </div>
    </div>
  )
}

export default Register