import React,{useState,useEffect} from "react";
import {useNavigate} from "react-router-dom";



const SignUp=()=>{

    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const navigate =useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth)
        {
            navigate('/')
        }
    },[]
    )
    

    const collectData= async()=>{
        
            console.warn(name,email,password);
            
            let result= await fetch('http://localhost:5000/register',{
                method:"post",
                body:JSON.stringify({name,email,password}),
                headers:{
                    'content-type':'application/json'
                }
                
            });

            result = await result.json();

            console.warn(result);
            localStorage.setItem("user",JSON.stringify(result.result))
            localStorage.setItem("token",JSON.stringify(result.auth))

            if(result)
            {
                navigate('/')
            }
        
    }

    return (
        <div className="register">
            <h1>Register </h1>
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)}  className="input_box" placeholder="Enter your name"/>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="input_box" placeholder="Enter your email"/>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="input_box" placeholder="Enter your password"/>
            <button type="button" onClick={collectData} className="appbutton">SignUp</button>

        </div>
    )
}

export default SignUp;