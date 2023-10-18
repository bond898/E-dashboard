import React, { useEffect } from 'react';
import {useParams,useNavigate} from 'react-router-dom';

const UpdateProduct =  () => {
    
    const [name,setName] = React.useState('');
    const [price,setPrice] = React.useState('');
    const [category,setCategory] = React.useState('');
    const [company,setCompany] = React.useState('');
    const params = useParams();
    const navigate = useNavigate();


    useEffect(()=>{
        getProductDetails();
    },[])

    const getProductDetails = async () => {
        console.warn(params);
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            headers:{
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }



    const updateproductf= async () => {

            console.warn(name,price,category,company);
            let result = await fetch(`http://localhost:5000/product/${params.id}`,{
                method:"PUT",
                body:JSON.stringify({name,price,category,company}),
                headers:{
                    'content-type':'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`

                }
            });
            result = await result.json();
            console.warn(result);
            navigate('/');       
    }
    
    return (
        <div className='product'>
            <h1>Update product </h1>
            <input type='text' placeholder='Enter product name' className='input_box'
            onChange={(e)=>{setName(e.target.value)}} 
            value={name}
            />
            <input type='text' placeholder='Enter product price' className='input_box'
            onChange={(e)=>{setPrice(e.target.value)}} 
            value={price}
            />
            <input type='text' placeholder='Enter product category' className='input_box'
            onChange={(e)=>{setCategory(e.target.value)}} 
            value={category}
            />
            <input type='text' placeholder='Enter product company' className='input_box'
            onChange={(e)=>{setCompany(e.target.value)}} 
            value={company}
            />
            <button className='appbutton' onClick={updateproductf} >Update Product</button>
        </div>
    )
}

export default UpdateProduct;