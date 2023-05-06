
import axios from "./axios"
import { AuthContext } from "./AuthProvider"
import { useContext } from "react"
import Toast from "./Toast"
import {useLocation} from "react-router-dom"



//  ----------------------------add to cart --------------------

export const Add_to_cart= async(product,navigate,location,token,dispatch) =>{

 
    if(!token) return navigate('/Login',{state:{from :location}})
    
    const Form = new FormData()
    Form.append("product_id",product?.product_id)
    Form.append("qty",1)
    try{
     
      const response= await axios({
        method: "post",
       url:'/add-to-cart',
       data:Form,
       headers:{
        Authorization:`Bearer ${token}`,
        "Content-Type": "multipart/form-data",
        
       }
       })
       
       if(response.status===200){
        const data = response.data;
        var obj={
          cart_id:data?.cart_id,
          qty:1,
          product:product

        }
        dispatch({type:'addtocart',value:obj})
        Toast(data.message,response.status)
       }
     }
     catch(err){
      const error = err.response.data
      Toast(error.message);
      
  
  
     }
    
    
     
    }
      //REMOVE CART 
    
    export  const remove_cart= async(product,token,dispatch) =>{
        
        try{
          
          const response= await axios({
            method: "post",
           url:'/remove-cart',
           data:{product_id:product?.product_id},
           headers:{
            Authorization:`Bearer ${token}`
           }
           })
           
           if(response.status===200){
            const data = response.data;
            dispatch({type:'removecart',value:product?.product_id})
           Toast(data.message,response.status)
           }
         }
         catch(err){
          const error = err.response.data
          Toast(error.message);
          
    
    
         }
         
        }
        
//  ----------------------------add to cart --------------------

export const update_to_cart= async(id,qty,token,dispatch) =>{

    
    const Form = new FormData()
    Form.append("product_id",id)
    Form.append("qty",qty)
    try{
     
      const response= await axios({
        method: "post",
       url:'/add-to-cart',
       data:Form,
       headers:{
        Authorization:`Bearer ${token}`,
        "Content-Type": "multipart/form-data",
        
       }
       })
       
       if(response.status===200){
        const data = response.data;
        dispatch({type:'updatecart',value:{id,qty}})
        Toast(data.message,response.status)
       }
     }
     catch(err){
      const error = err.response.data
      Toast(error.message);
      
  
  
     }
    
    
     
    }
    