import { useContext } from "react";
import authContext from "../Context/authcontext";
const Newpassword=()=>{
    const {password,setPassword,setNewPassword}=useContext(authContext);
     const handleChange=(e)=>{
        setPassword(e.target.value);
     }

    const handleSubmit=(e)=>{
       e.preventDefault();
       setNewPassword();
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
  
  
    }} >
        <form style={{ 
                border: 'none',
                borderRadius:'2em',
                backgroundColor:"grey",
                width:"50%",
                padding:'2em',
                textAlign:'center'
         }} >
            <input type="password" onChange={handleChange} value={password} placeholder="enter new password"
            style={{ 
                border: 'none',
                borderRadius:'2em',
                padding:'.5em',
                width:"40%",
                textAlign:'center'
         }}></input>
            <br/>
            <br/>
            <button onClick={handleSubmit} style={{ 
                border: 'none',
                borderRadius:'.5em',
                color:'white',
                padding:'.5em',
                backgroundColor:"green",
                textAlign:'center'
         }}>Set password</button>
        </form>
    </div>
    
  )
}

export default Newpassword;