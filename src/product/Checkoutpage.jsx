import React,{useContext, useState,useEffect, useMemo} from 'react'
import {useLocation,useNavigate} from 'react-router-dom'
import { Modal } from 'react-bootstrap';
import Toast from '../Toast'
import axios from '../axios'
import { AuthContext } from '../AuthProvider';
import Address from '../pages/Address'
import Payment from '../Payment';


const Checkoutpage = ({type}) => {
  const payWithRazorpay = Payment()
  const {userToken,dispatch}  = useContext(AuthContext)
    const location = useLocation();
    const navigate = useNavigate();
    const data = location?.state?.data
    console.log(data)
    const [show, setShow] = useState(false);
    const [showAddress, setShowAddress] = useState(false);
    const [coupon ,setCoupon] = useState([]);
    const [couponFilter ,setCouponFilter] = useState("");
    const [AddressId ,setAddressId] = useState("");
    const [couponprice ,setCouponPrice] = useState("");
    const [isLoading,setIsLoading] = useState(false);
    const [searchCoupon,setSearchCoupon] = useState("")
    const [Delivery,setDelivery] = useState(false)
    // Delivery= true cash on delivery
    // delivery = false "prepaid"
    
    
    const coupen =(e,coupenData)=>{

      if(e.target.checked){
          Toast("Applied successfully",200)
          setCouponPrice(coupenData)
          setShow(false)
      }
      else{
          setCouponPrice("")
      }

  } 



  const coupenSearch =(e)=>{
      
      var arr =coupon?.filter((element)=>{
        
        
          return element?.coupon_code == searchCoupon
         
      })
      
      if(arr.length){
        Toast("Applied successfully",200)
        setCouponPrice(...arr)
          setCouponFilter(arr)
      }
      else{
        Toast("Invalid Coupon ")
          setCouponFilter("")
      }
      
  }

  
  const get_all= async(url,type) =>{

    try{
      setIsLoading(true)
      const response= await axios({
        method: "get",
       url:url,
       headers:{
        Authorization:`Bearer ${userToken}`
       }
       })
       
       if(response.status===200){
        const data = response.data;

        switch(type){
          case 'coupon': 
          setCoupon(data?.coupons)
          break;
          
        }
      //   Toast(data.message,response.status)
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
      
      get_all('/get-coupons','coupon')
      
    },[])

    const discount = useMemo(()=>{
      var arr = [...data]
      var discount=0
      var total = arr?.reduce((a,b)=>a+(b?.product?.price * (b?.qty || 1)),0)
      
      if(couponprice?.type==1){
        discount =(couponprice?.discount)
        
      }
      if(couponprice?.type==2){
         discount=((couponprice?.discount/total)*'100')
      }
      return Math.ceil(discount)

    },[couponprice])
   

    const place_order = async(e)=>{
      e.preventDefault()
    
      if(!AddressId) return Toast("plz choose address first ")  
       try{
        setIsLoading(true)
        const response= await axios({
          method: "post",
         url:'/create-order',
          data:{
           address_id:AddressId?.id,
           coupon_id:couponprice?.id,
           payment_mode:Delivery ? 1:0,
           shiping_charges:124
          },
          headers: {
            Authorization:`Bearer ${userToken}`,
            "Content-Type": "application/json",
            
          },
         })
         
         if(response.status===200){
          const data = response.data
          if(Delivery == true){
            dispatch({type:"reset"})
            navigate("/thankyou")
          }else{

            payWithRazorpay(data?.order,"cart")
          }
          
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
    const single_order = async(e)=>{
      e.preventDefault()
    
      if(!AddressId) return Toast("plz choose address first ")  
       try{
        setIsLoading(true)
        const response= await axios({
          method: "post",
         url:'/create-checkout-order',
          data:{
           address_id:AddressId?.id,
           coupon_id:couponprice?.id,
           payment_mode:Delivery ? 1:0,
           shiping_charges:124,
           product_id: data?.length ? data[0]?.product?.product_id : "",
           qty:1
          },
          headers: {
            Authorization:`Bearer ${userToken}`,
            "Content-Type": "application/json",
            
          },
         })
         
         if(response.status===200){
          const data = response.data
          if(Delivery == true){
            
            navigate("/thankyou")
          }else{

            payWithRazorpay(data?.order,"single")
          }
          
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
  return (
    <div className='section-padding ' style={{backgroundColor:'#ededed8a'}}>
    
        <div className="checkout max-width-2000px mx-auto">
        <h1 className="section-heading">SHOPPING-CART SUMMARY</h1>
<div className="between-div section-paddingY" style={{gridGap:30,flexWrap:'wrap'}}>
  
        {data?.map((element)=>{

return<div className="d-flex" style={{gridGap:20,flex:'1 1 200px',justifyContent:'space-between'}}>
<div className=" d-flex cart-left" style={{gridGap:20,width:'fit-content'}} >
{/* -left---- */}
<div>
<img src ={typeof element?.product?.images == "string" ? element?.product?.images : element?.product?.images[0]} style={{width:150,height:150}}></img>
</div>

{/* -----mid-------- */}
<div>
<h6>{element?.product?.name}</h6>


<p className="normal-text" style={{margin:0,fontSize:12}}>SKU :{element?.product?.product_id}</p>
<p className="normal-text" style={{fontSize:12}}>Type : {element?.product?.style} {element?.product?.size} {element?.product?.medium}</p>
<p className="normal-text" style={{fontSize:12,fontWeight:600}}>&#8377; {element?.product?.price} X {element?.qty || 1} </p>
</div>
</div>




</div>

})}

</div>
<div style={{display:'flex',flexDirection:'column',alignItems:'flex-end'}}>
<input type="checkbox" className='toggle' checked={Delivery} onChange={()=>setDelivery(!Delivery)}></input>
<p className='normal-text'><span style={{fontSize:11,fontWeight:600}}>(by default its prepaid)</span> Cash on Delivery </p>

</div>


<div class=" d-flex  checkout-bottom section-paddingY" style={{gridGap:30,justifyContent:'space-between'}}>

    <div className='checkout-coupen  d-flex '>
      <div>
    <h1 className="section-subheading" style={{textAlign: 'left',marginBottom:'1rem'}} >Apply Coupon <span className='normal-text' onClick={()=>setShow(true)} style={{cursor:'pointer',fontWeight:600,float: 'right',color:"#02a89e",fontSize:12}}>Select</span></h1>

    <div className="d-flex">
    <input type="text" placeholder='Enter Coupon' style={{border: '1px solid #c2c1c194 ',padding:'10px 25px'}} value={searchCoupon} onChange={(e)=>setSearchCoupon(e.target.value)}></input>
  <button className='themeButton' onClick={coupenSearch}>Go</button>
    </div>
 
 {couponprice ?
  <div class="coupon-card">
                <img src="https://i.postimg.cc/KvTqpZq9/uber.png" class="logo"/>
                <h3 className='normal-text' style={{fontWeight:600,fontSize:12}}>Save {couponprice?.type==1 && (couponprice?.discount)+" Rs" || couponprice?.type==2 && (couponprice?.discount)+" %" } off on Product price <br/>Congratulation !!!</h3>
                <div class="coupon-row">
                    <span id="cpnCode" className="normal-text">{couponprice?.coupon_code}</span>
                    
                </div>
               
                <div class="circle1"></div>
                <div class="circle2"></div>
            </div>
      
      :
      <p style={{marginTop:20,color:'#e2bc3f',fontSize:13}}>Please Select Coupon</p> }
    
</div>

<div>
    <h1 className="section-subheading" style={{textAlign: 'left',marginBottom:'1rem'}} >CHOOSE ADDRESS<span className='normal-text' onClick={()=>setShowAddress(true)} style={{cursor:'pointer',fontWeight:600,float: 'right',color:"#02a89e",fontSize:12}}>Select</span></h1>

  {AddressId ? 
  <div>
    <p style={{fontSize:13,marginBottom:10}}><span style={{fontWeight:500}}>Name : </span> {AddressId?.name}</p>
    <p style={{fontSize:13,marginBottom:10}}><span style={{fontWeight:500}}>Mobile : </span> {AddressId?.mobile}</p>
    <p style={{fontSize:13,marginBottom:10}}><span style={{fontWeight:500}}>Type : </span> {AddressId?.Type==1 ? "Home" : AddressId?.Type==2 ? "Work" :"Other" }</p>
    <p style={{fontSize:13,marginBottom:10}}><span style={{fontWeight:500}}>Street : </span> {AddressId?.street} , {AddressId?.landmark}</p>
    <p style={{fontSize:13,marginBottom:10}}><span style={{fontWeight:500}}>City : </span> {AddressId?.city} , {AddressId?.pin_code} , {AddressId?.state}</p>
  </div>
  
  :<p style={{marginTop:20,color:'#e2bc3f',fontSize:13}}>Please Select Address</p> 
  
  }
  
   

    
</div>
     
    </div>

    <div className='cart-price d-flex  section-paddingX flex-column' style={{paddingBottom:'2rem'}} >

 
    <div className="between-div" style={{width:'300px'}} >
    <p className='normal-text' style={{fontWeight:600}}> Total Price</p>
    <p className='normal-text' style={{fontWeight:500}}> &#8377; {type=="cart" ? data?.reduce((a,b)=>a+(b?.product?.price * b?.qty),0):data?.reduce((a,b)=>a+(b?.product?.price * 1),0)} </p>
    </div>
    <div className="between-div" style={{width:'300px'}} >
    <p className='normal-text' style={{fontWeight:600}}> Shipping </p>
    <p className='normal-text' style={{fontWeight:500}}> &#8377; 500</p>
    </div>
    
    <div className="between-div" style={{width:'300px'}} >
    <p className='normal-text' style={{fontWeight:600}}> Coupon Off</p>
    <p className='normal-text' style={{fontWeight:500}}> &#8377; {discount}</p>
    </div>

    <div className="between-div" style={{width:'300px'}} >
    <p className='normal-text' style={{fontWeight:600}}> Net</p>
    <p className='normal-text' style={{fontWeight:500}}> &#8377; {type=="cart" ? data?.reduce((a,b)=>a+(b?.product?.price *(b?.qty),0))-discount : data?.reduce((a,b)=>a+(b?.product?.price *1),0)-discount } </p>
    </div>
    
    <div className="between-div" style={{width:'300px'}} >
    <button className="themeButton" style={{width:'100%'}} onClick={type=="cart" ? place_order : single_order} > Pay Now</button>
    </div>
 
    
    </div>
    
</div>
        </div>


        {/* --------------------coupon ----------------------- */}
<Modal show={show} onHide={()=>{setCouponFilter("");setShow(false)}}>
      <Modal.Header closeButton>
       
      </Modal.Header>
      <Modal.Body className='center-div flex-column'>
      <h4>Apply Voucher / Offers</h4>
    
      <div className="coupon">
      
      <div className='d-flex flex-column' style={{gridGap:'20px'}}>
      {(coupon )?.map((element)=>{


  return   <div className="custom-control custom-checkbox d-flex align-items-center"  >
<input type="checkbox" className="custom-control-input" id="customCheck1" value={element} checked={couponprice? element?.coupon_code==couponprice?.coupon_code: false} onClick={(e)=>coupen(e,element)} />
<label className="custom-control-label px-3 coupan-lable" for="customCheck1">
  <p >{element?.coupon_code}</p>
  <pdesc style={{fontSize:'12px', fontWeight:600}}>Save <span style={{color: '#e2bc3f'}}>{element?.type==1 && (element?.discount)+" Rs" || element?.type==2 && (element?.discount)+" %"   } off on Product price </span></pdesc>
</label>
</div>
{/* <p style={{fontSize:'12px',margin: '0.5rem 3rem'}}>save upto a 15% off </p> */}
      
              })}
    
      </div>
      </div>



      </Modal.Body>
    
    </Modal>

    {/* ================Address=========== */}
<Modal show={showAddress} onHide={()=>{setShowAddress(false)}}>
      <Modal.Header closeButton>
       
      </Modal.Header>
      <Modal.Body className='center-div flex-column'>
      <h4>Choose address</h4>
      <Address type={"cart"} setAddressId={setAddressId} addressId={AddressId} setShowAddress={setShowAddress}  />
      </Modal.Body>
    
    </Modal>






    </div>
  )
}

export default Checkoutpage