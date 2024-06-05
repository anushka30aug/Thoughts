import React, { useContext, useEffect } from "react";
import authContext from "../Context/authcontext";
import { useNavigate,Link } from "react-router-dom";
import style from './auth.module.css'
function Login() {
    const { credentials, setCredentials, login } = useContext(authContext);
    const handleSubmit = (e) => {
        e.preventDefault();
        login();
    }
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    const navigate = useNavigate();
   useEffect(()=>{
    if(localStorage.getItem('token')){
        navigate('/')
    }
    // eslint-disable-next-line
   },[])
    return (
        <div>
            <form className={style.auth_form}>
                <h2 className={style.auth_heading}>Login</h2>
                <input type="email" placeholder="Email ID" name="email" id="email" value={credentials.email} onChange={handleChange} className={style.input} />

                <input type="password" minLength={6} placeholder="password" name="password" id="password" value={credentials.password} onChange={handleChange} className={style.input} />


                <button onClick={handleSubmit} className={style.auth_button}>Login</button>
                <br/>
                forgot pasword?<Link to='/email' style={{'color':'lightblue'}}> click here....</Link>
                <br/>
                <hr color="white"/>
                Create new account? <Link to='/signup' style={{'color':'lightblue'}}>signup here...</Link>
            </form>
        </div>
    )

}
export default Login;