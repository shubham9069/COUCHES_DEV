import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../AuthProvider'
import axios from '../axios'
import Toast from '../Toast'
import Loader from '../pages/Loader'
import { Link, useLocation } from 'react-router-dom'





const Orders = () => {
    const location = useLocation()
    const {userToken}=useContext(AuthContext)
    const [isLoading,setIsLoading]=useState(true)
    const [AllOrder,setAllOrder] = useState([])

    const payment_type =
    {
        "order Failed_0": "images/cancelled.png",
        "order pending_3": "images/ordered.png",
        "order success_2": "images/delivered.png",
        
        
    }
    const get_order= async(e)=>{
        
      
        try{
         setIsLoading(true)
         const response= await axios({
           method: "get",
          url:`/get-orders`,
           
           headers: {
             Authorization:`Bearer ${userToken}`,
             "Content-Type": "application/json",
             
           },
          })
          
          if(response.status===200){
           const data = response.data
           setAllOrder(data?.orders.reverse())
        //    Toast(data.message,response.status)
          
          }
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

   get_order();
},[])
   
  return (
    <>
        {isLoading &&(<Loader />)}
        <div className="product-details-top " style={{padding:'1.5rem',background:'rgba(226, 226, 226, 0.3)'}}>

      <p className="normal-text" style={{marginBottom:'2rem'}}><i class="bi bi-house-door-fill" ></i> &nbsp; /  &nbsp; {location?.pathname?.slice(1)} </p>
      </div>
{!AllOrder?.length ? 
    <div className='container section ' style={{display:'flex', flexDirection: 'column',alignItems:'center',justifyContent:'center',gridGap:'30px', paddingTop:'2rem' }}>
    <img src="images/no-order.png" alt="no-item" style={{ maxHeight: 250, maxWidth: 250,textAlign:'center',width:'100%' }}></img>
    <h6 style={{fontSize: '22px',color:'#fb7676'}}> Empty</h6>
    <p style={{color: '#C4C4C4', fontSize:'18px'}}> Look like you haven’t made 
your choice yet..</p>
</div>
:


<div className='container section-padding' style={{ display: 'flex', flexDirection: 'column' }}>

              
<h5 style={{ marginBottom: 20 }}>All Orders</h5>
{AllOrder?.map((element)=>{

return   <div  style={{
        boxShadow: "0px 3px 12px rgba(0, 0, 0, 0.15)",
        borderRadius: 8,
        marginBottom: 15,
        padding: 10,
    }}>

   <div style={{ display: 'flex', }}>
            <img src={element?.status==0 ?payment_type["order Failed_0"]:element?.status==2 ?payment_type["order success_2"]:payment_type["order pending_3"]} style={{ marginRight: 10, width: 33, height: 33, objectFit: 'contain' }} />
            <div>
                <span style={{ color: '#000', fontWeight: 500 }}>{element?.order_id}</span>
                <br></br>
                <span style={{ fontSize: 12 }}>{element?.order_date}</span>
            </div>
          
        </div>
        <hr class="dropdown-divider" style={{ margin: "10px 0px 20px 0px", backgroundColor: "#aaa" }}></hr>



        <div className='rowAlign between-div' style={{ padding: '0px 10px', marginBottom: 5 }}>
            <span style={{ color: '#000' }}>Product item</span>
            <span style={{ color: '#B8B7B7' }}>{element?.products?.length}</span>
        </div>
        <div className='rowAlign between-div' style={{ padding: '0px 10px', marginBottom: 5 }}>
            <span style={{ color: '#000' }}>Payment status</span>
            <span> ({element?.payment_mode==0 ? "Prepaid" : "COD"}) {element?.payment_status==1 ?<span style={{ color: 'green'  }}>Payment Success </span>:<span style={{ color: 'red'  }}>Payment pending</span>} </span>
           
        </div>
        <div className='rowAlign between-div' style={{ padding: '0px 10px', marginBottom: 5 }}>
            <span style={{ color: '#000' }}> Total Amount</span>
            <span style={{ color: '#B8B7B7' }}>₹{element?.total_amount}</span>
        </div>
        <div className='rowAlign between-div' style={{ padding: '0px 10px', marginBottom: 5 }}>
            <span style={{ color: '#000' }}>Bill Amount</span>
            <span style={{ color: '#B8B7B7' }}>₹{element?.amount}</span>
        </div>
        <hr class="dropdown-divider" style={{ margin: "20px 0px 5px 0px", backgroundColor: "#aaa" }}></hr>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center',justifyContent:'flex-end',gridGap:20 }}>
           

            <Link to={'/orderDetails/'+element?.id}
               className="themeButton" style={{
                    width: 150, height: 40
                }}>Details</Link>
        </div>
    </div>

})}

  


</div>


}
    </>
  )
}

export default Orders