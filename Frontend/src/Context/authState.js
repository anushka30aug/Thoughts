import React, { useState } from "react";
import authContext from "./authcontext";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';;
const host = process.env.REACT_APP_HOST;

function AuthState(props) {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [userInfo, setUserInfo] = useState({ name: '', email: '', password: '' })
    const [userState, setUserState] = useState(true);
    const [otp, setOtp] = useState('');
    const [emailId, setEmailId] = useState('');
    const [password,setPassword]=useState('')
    const navigate = useNavigate();

    const login = async () => {
        const data = await fetch(`${host}/api/auth/login`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials)
            })
        const response = await data.json();
        if (response.errors) {
            toast.error('enter valid credentials');
            return;
        }
        else if (response.notFound) {
            toast.error('user not found \n signup required');
            return;
        }
        else if (response.error) {
            toast.error('unexpected error occured..... please try again later');
            return;
        }
        localStorage.setItem('token', response.token);
        setUserState(true);
        toast('Welcome back!', {
            icon: '👏',
        });
        setCredentials({ email: '', password: '' });
        navigate('/')

    }

    const signup = async () => {
        const data = await fetch(`${host}/api/auth/signup`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userInfo)
            })
        const response = await data.json();
        if (response.errors) {
            toast.error('enter valid credentials');
            return;
        }
        else if (response.alreadyExist) {
            toast.error('user already exists');
            return;
        }
        else if (response.error) {
            toast.error('unexpected error occured..... please try again later');
            return;
        }
        localStorage.setItem('token', response.token);
        setUserState(true);
        setUserInfo({ name: '', email: '', password: '' });
        toast('Welcome!', {
            icon: '👏',
        });
        navigate('/')

    }

    const verifyEmailId = async () => {
        
        const data = await fetch(`${host}/api/forgetpassword/verifyEmail`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({emailId})
            }
        )

        const response = await data.json();
        if (response.err) {
            toast.error('unexpected error occured..... please try again later');
            return;
        }
        else if (response.notFound) {
            toast.error('user not found \n signup required');
            return;
        }
        else if (response.errors) {
            toast.error('enter valid EmailId');
            return;
        }
        console.log(emailId);
        sendMail();
        navigate('/forget');

    }

    const sendMail = async()=>{
        const data = await fetch(`${host}/api/forgetpassword/sendmail`,
        {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({emailId})

        })
        const response = await data.json();
        if(response.error)
        {
            toast.error('unexpected error occured..... please try again later');
            return; 
        }
        setOtp(response.otp);
        setTimeout(()=>{
          setOtp('')
        },60000);
    }

    const setNewPassword=async()=>{
        const data = await fetch(`${host}/api/forgetpassword/setpassword`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json', 
            },
            body: JSON.stringify({emailId,password})
        })

        const response = await data.json();
        if(response.error)
        {
            toast.error(`error occured!!couldn't update`)
        }
        localStorage.setItem('token', response.token);
        toast('Welcome!', {
            icon: '👏',
        });
        setUserState(true)
        setEmailId('');
        setPassword('');
        navigate('/')

    }


    return (
        <authContext.Provider value={{
            credentials, setCredentials, login, userInfo, setUserInfo,
            signup, userState, setUserState, otp, setOtp, emailId, setEmailId, verifyEmailId, password,setPassword,setNewPassword,sendMail
        }} >
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            { props.children }
        </authContext.Provider>
    )
}
export default AuthState;
