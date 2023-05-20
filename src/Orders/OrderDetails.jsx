import React, { useContext, useEffect, useMemo, useState } from 'react'
import { AuthContext } from '../AuthProvider';
import axios from '../axios';
import Toast from '../Toast';
import { useParams,useNavigate, Link  } from 'react-router-dom';
import Loader from '../pages/Loader';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';



const OrderDetails = () => {
    const navigate = useNavigate()
    const {userToken} =useContext(AuthContext)
const [isLoading,setIsLoading] = useState(true);
const [orderDetails,setOrderDetails] = useState({})
const {id} = useParams();
const [rating,setRating] = useState("")
const [review_desc , setReview_Desc] = useState("")
const [review_product_id,setReview_Product_Id] = useState()
const [reviewModal,setReviewModal] = useState(false)

  
const get_orderDetails= async(e)=>{
        
      
    try{
     setIsLoading(true)
     const response= await axios({
       method: "get",
      url:`/get-order-detail?id=${id}`,
       
       headers: {
         Authorization:`Bearer ${userToken}`,
         "Content-Type": "application/json",
         
       },
      })
      
      if(response.status===200){
       const data = response.data
       setOrderDetails(data?.order)
       
    
      
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

get_orderDetails();
},[])

const Add_review  = async()=>{
    

  if(!rating) return Toast("choose min 1 star ")
   try{
    setIsLoading(true)
    const response= await axios({
      method: "post",
     url:'/add-review',
      data:{
        rating,product_id:review_product_id?.product_id,review:review_desc
      },
      headers: {
        Authorization:`Bearer ${userToken}`,
        "Content-Type": "application/json",
        
      }
     })
     
     if(response.status===200){
      const data = response.data;
      setReviewModal(false)
      get_orderDetails();
      Toast(data.message,response.status)
     
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
const Updatereview  = async(review_id)=>{
  

  if(!rating) return Toast("choose min 1 star ")
   try{
    setIsLoading(true)
    const response= await axios({
      method: "post",
     url:'/update-review',
      data:{
        rating,review:review_desc,review_id
      },
      headers: {
        Authorization:`Bearer ${userToken}`,
        "Content-Type": "application/json",
        
      }
     })
     
     if(response.status===200){
      const data = response.data;
      setReviewModal(false)
      get_orderDetails();
      Toast(data.message,response.status)
     
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

const update_review =useMemo(() =>{
  if( review_product_id?.reviews.length){

setRating( review_product_id?.reviews[0]?.rating)
setReview_Desc( review_product_id?.reviews[0]?.review)

  }
  else{
      setRating("")
setReview_Desc( "")
  }
 

    

}, [review_product_id]);
  return (
    <>
    {isLoading && (<Loader />)}
      <div className="product-details-top " style={{padding:'1.5rem',background:'rgba(226, 226, 226, 0.3)'}}>

      <p className="normal-text" style={{marginBottom:'2rem'}}><i class="bi bi-house-door-fill" onClick={()=>navigate("/")} ></i> &nbsp; /   &nbsp; <Link to="/MyOrders" className='link-a'>MyOrders</Link> &nbsp;  / &nbsp; {id} </p>
      </div>
      <div className='section-margin'>
      <div className="between-div">
        <h4 >ORDER ID : {orderDetails?.order_id}</h4>
        <div style={{display:'flex',gridGap:10}}>
    <button className="invoice"> <i class="bi bi-file-earmark-medical-fill" style={{color:"rgb(204, 204, 204)"}}></i> invoice</button>
    <button className="trackorder"> <i class="bi bi-geo-alt-fill" style={{color:"white"}}></i> Track order</button>
    </div>
        </div>
      <div className="d-flex" style={{gridGap:10,padding:'18px 0',borderBottom:'1px solid rgb(204, 204, 204)'}}>
        <span style={{color:'#939393', fontSize:13}}>Order Date : {new Date(orderDetails.created_at)?.toLocaleString()}</span>
        <span > | </span>
        <span style={{color:'green',fontSize:13}}>Estimate Date : May 14 2022</span>
       
        </div>

      {orderDetails.products?.map((element)=>{

        return     <div className='orderDetails-chair between-div'>
        <div className='orderDetails-img'>
        <img src={element?.images?.length ? element.images[0]:""} ></img>
        </div>

        <div className='orderDetails-text'>
        <p className='section-subheading' style={{textAlign: 'left',marginBottom:8}}>{element?.name}</p>
        <p className='normal-text' style={{ fontSize:13}}>{element?.medium} | {element?.size} | {element?.style}</p>
        </div>
        <div className='orderDetails-price'>
        <button className="invoice" onClick={()=>{setReview_Product_Id(element);setReviewModal(true)}}>{element?.reviews?.length? 'Edit Review' :'Add review'} </button>
        <p style={{fontSize:16,fontWeight:600,marginBottom:0}}>₹ {element?.price}</p>
        <span style={{color:'#939393',fontSize:13,fontWeight:700}}>qty : {element?.qty}</span>
        
   
        </div>

        </div>
      })}

      <div className='orderDetails-payment'>
        <div>
          <h4>Payment</h4>
          <p className="">{orderDetails?.payment_mode==0 ? "prepaid" : "COD"}</p>
        </div>
        <div>
          <h4>Address</h4>
          
            {orderDetails?.address?.split(",")?.map((e)=>{

              return    <p style={{color:'#939393',fontSize:12,width:100,marginBottom:0}}>{e}</p>
            })}
             
        
         
        </div>
      </div>

      <div className="orderDetails-bottom" style={{flexWrap:'wrap-reverse'}}>
        <div className="orderDetails-help" >
        <h4 style={{marginBottom:'1rem'}}>Need Help</h4>
        <p style={{color:'#939393',fontSize:13}}><i class="bi bi-question-circle-fill" style={{color:'#939393',fontSize:15,marginRight:8}}></i>Need Help ?</p>
        <p style={{color:'#939393',fontSize:13}}><i class="bi bi-truck" style={{color:'#939393',fontSize:15,marginRight:8}}></i>Delivery Info ?</p>
        <p style={{color:'#939393',fontSize:13}}><i class="bi bi-arrow-return-left" style={{color:'#939393',fontSize:15,marginRight:8}}></i>Return  ?</p>

        </div>

        <div className='cart-price d-flex  section-paddingX flex-column' style={{paddingBottom:'2rem'}} >

        <h4 style={{marginBottom:'1rem'}}>Order Summary</h4>
<div className="between-div" style={{width:'300px'}} >
<p className='normal-text' style={{fontWeight:600}}> Total Price</p>
<p className='normal-text' style={{fontWeight:500}}> &#8377; {orderDetails?.total_amount}</p>
</div>
<div className="between-div" style={{width:'300px'}} >
<p className='normal-text' style={{fontWeight:600,marginBottom:7}}> Coupon OFF </p>
<p className='normal-text' style={{fontWeight:500,marginBottom:7}}> &#8377; {orderDetails?.coupon !=null ? orderDetails?.coupon?.discount:0}</p>
</div>

<div className="between-div" style={{width:'300px'}} >
<p className='normal-text' style={{fontWeight:600,marginBottom:7}}> Shipping</p>
<p className='normal-text' style={{fontWeight:500,marginBottom:7}}> &#8377; 54</p>
</div>

<div className="between-div" style={{width:'300px'}} >
<p className='normal-text' style={{fontWeight:600,marginBottom:7}}> Net</p>
<p className='normal-text' style={{fontWeight:500,marginBottom:7}}> &#8377; {orderDetails?.amount} </p>
</div>



</div>
      </div>
    

      </div>

      <Modal show={reviewModal} onHide={()=>setReviewModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{orderDetails?.order_id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        Please Give Us a Feedback
        <div className="section-padding d-flex align-items-center" style={{gridGap:20}}>

        <img src={review_product_id?.images?.length  && (review_product_id?.images[0])} alt
        style={{height: '50px', width: '70px',}}
        ></img>
        <p  style={{fontWeight: 600,margin:0}}>{review_product_id?.name} <br/><span  style={{fontSize: 10}}>{review_product_id?.product_id}</span></p>
        <p style={{fontWeight: 600,margin:0}} >₹{review_product_id?.price}</p>

        </div>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label className="d-flex" style={{gridGap:7}}>{
            [...Array(5)]?.map((element,index)=>{
                let giving_star = index+1
                {/* <i className={giving_star>rating? "bi bi-star px-1": "bi bi-star-fill px-1"} onClick={()=>setRating(giving_star)}></i> */}
                return <div 
                style={{clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)', 
                background:giving_star>rating?'#D9D1D1':"#fed001",
                height:30,
                width:30
                
                }}
                onClick={()=>setRating(giving_star)}>

                </div>
            })
        }</Form.Label>
        <Form.Control as="textarea" rows={5} value={review_desc} onChange={(e)=>setReview_Desc(e.target.value)} />
      </Form.Group>
        </Modal.Body>
        <Modal.Footer>

        { review_product_id?.reviews?.length  ? 
        <button onClick={()=>Updatereview( review_product_id?.reviews[0]?.id.toString())} className="themeButton mx-auto" style={{backgroundColor:"rgb(86, 189, 189)",color:'white'}}>Update Review</button>
        :  <button onClick={Add_review} className="themeButton mx-auto" >Add Review</button>
        }
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default OrderDetails