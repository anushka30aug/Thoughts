import React, { useContext , useEffect } from "react";
import authContext from "../Context/authcontext";
import {Link} from 'react-router-dom';
import style from './auth.module.css'
import { useNavigate } from "react-router-dom";
function Signup() {
    const { userInfo, setUserInfo, signup } = useContext(authContext);
    const handleChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
    }
    const handleClick = (e) => {
        e.preventDefault();
        signup();
    }
    const navigate = useNavigate();
    useEffect(()=>{
     if(localStorage.getItem('token')){
         navigate('/')
     }
    })
    return (
        <form className={style.auth_form}>
            <h2 className={style.auth_heading}>Signup</h2>
            <input type="text" minLength={6} placeholder="Name" name="name" id="name" value={userInfo.name} onChange={handleChange} className={style.input}/>

            <input type="email" placeholder="Email ID" name="email" id="email" value={userInfo.email} onChange={handleChange} className={style.input} />

            <input type="password" minLength={6} placeholder="password" name="password" id="password" value={userInfo.password} onChange={handleChange} className={style.input} />

            <button onClick={handleClick} className={style.auth_button}>Signup</button>

            <hr color="white"/>
            
            already have an Account? <Link to='/login' style={{'color':'lightblue'}}>Login here...</Link>
            


        </form>
    )
}

export default Signup;