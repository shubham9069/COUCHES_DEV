import React, { useContext,useState,useEffect } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import { AuthContext } from '../AuthProvider'
import axios from '../axios';
import Toast from '../Toast';

const Banner = () => {
  const {homepage,setHomepage} = useContext(AuthContext)
  const {Banner} = homepage
  const [isLoading,setIsLoading] =useState(false)
  
  const get_all= async(url,type) =>{

    try{
      setIsLoading(true)
      const response= await axios({
        method: "get",
       url:url,
       })
       
       if(response.status===200){
        const data = response.data;
        
          setHomepage((p)=>({...p,["Banner"]:data?.banners}))
         

        }
        
      //   Toast(data.message,response.status)
       
     }
     catch(err){
      const error = err.response.data
      Toast(error.message);
      


     }
     finally{
      setIsLoading(false)
     }
    }

    useEffect(()=>{
     !Banner.length? get_all('/get_all_banners','banner'):setIsLoading(false)
      
     
    },[])
  return (
    <>
  <Carousel fade indicators={false} style={{marginBottom:'2.5rem'}} >

  {Banner?.map((element)=>{
    return<Carousel.Item>
        <img
          className="d-block w-100"
       
          alt="First slide"
         
          srcset={`images/login.png 500w,
          ${element?.image} 800w`}
 
        />
     
      </Carousel.Item>
    

  })}
   
     
    
    </Carousel>


    </>
  )
}

export default Banner