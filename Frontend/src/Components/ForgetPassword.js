import React, { useContext, useState } from "react";
import authContext from "../Context/authcontext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Forget = () => {
    const navigate = useNavigate();
    const [tempOtp, setTempOtp] = useState('')
    const { otp, setOtp , sendMail} = useContext(authContext);
    const handleChange = (e) => {
        setTempOtp(e.target.value)
    }
    const handleClick = (e) => {
        e.preventDefault();
        console.log(otp);
        if (tempOtp !== otp) {
            toast.error('invalid OTP');
        }
        else {
            toast.success('correct OTP');
            setTempOtp('');
            setOtp('');
            navigate('/setpassword')
        }
    }
    const handleResend = (e) => {
        e.preventDefault();
        sendMail();
    }
    return (
        <div style={{
          
            position:"fixed",
            top:"0",
            left:"0",
            width:"100%",
            height:"100%",
            zIndex:"1000",
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            backgroundColor:"rgba(0,0,0,0.7)"
      
      
        }}>
            <form style={{ 
                border: 'none',
                borderRadius:'2em',
                backgroundColor:"grey",
                width:"50%",
                padding:'2em',
                textAlign:'center'
         }}>
                <input type="number" onChange={handleChange} value={tempOtp} placeholder="enter otp"
                style={{ 
                border: 'none',
                borderRadius:'2em',
                padding:'.5em',
                width:"30%",
                textAlign:'center'
         }}></input>
          
         <br/>
         <br/>
                <button onClick={handleClick} style={{ 
                border: 'none',
                borderRadius:'.5em',
                color:'white',
                padding:'.5em',
                backgroundColor:"green",
                textAlign:'center',
                margin:'1em'
         }}>submit</button>
         
                <button onClick={handleResend} style={{ 
                border: 'none',
                borderRadius:'.5em',
                color:'white',
                padding:'.5em',
                backgroundColor:"blue",
                textAlign:'center'
         }}>Resend OTP</button>
            </form>
        </div>
    )
}
export default Forget;