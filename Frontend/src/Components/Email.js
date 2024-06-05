import React, { useContext} from "react";
import authContext from "../Context/authcontext";

const Email=()=>{
    const { emailId, setEmailId, verifyEmailId } = useContext(authContext);
    const handleChange=(e)=>{
       setEmailId(e.target.value);
    }
    const onsubmit=(e)=>{
     e.preventDefault();
     verifyEmailId();
    }
  return(
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
        <input type="email" placeholder="enter your email id" onChange={handleChange} value={emailId} style={{ 
                border: 'none',
                borderRadius:'2em',
                padding:'.5em',
                width:"50%",
                textAlign:'center'
         }}></input>
        <br/>
        <br/>
        <button onClick={onsubmit} style={{ 
                border: 'none',
                borderRadius:'.5em',
                color:'white',
                padding:'.5em',
                backgroundColor:"green",
                textAlign:'center'
         }}>Submit</button>
    </form>
    </div>
  )
}
export default Email;