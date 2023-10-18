import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Login=()=>{

    const [email,setEmail] = React.useState('');
    const [password,setPassword] = React.useState('');
    const navigate = useNavigate();
    
    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth)
        {
            navigate('/');
        }
    },[])

    const handleLogin = async () => {
        console.warn(email,password);
        let result = await fetch('http://localhost:5000/login',{
            method:'POST',
            body:JSON.stringify({email,password}),
            headers:{
                'content-type':'application/json'
            }
        });
        result = await result.json();
        console.warn(result);
        if(result.auth)
        {
            localStorage.setItem("user",JSON.stringify(result.user));
            localStorage.setItem("token",JSON.stringify(result.auth));

            navigate('/');
        }
        else
        {
            alert("please enter correct details")
        }
    }


    return (
        <div className='login'>
            <h1>Login</h1>
            <input type='text' className='input_box' placeholder='enter your email'
            value={email} 
            onChange={(e)=>{setEmail(e.target.value)}}
            />
            <input type='password' className='input_box' placeholder='enter your password' 
            value={password} 
            onChange={(e)=>{setPassword(e.target.value)}}
            />
            <button onClick={handleLogin} type="button" className="appbutton">Login</button>

        </div>
    )
}

export default Login;