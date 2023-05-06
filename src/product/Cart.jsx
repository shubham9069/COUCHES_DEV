import React, { useContext } from 'react'
import { AuthContext } from '../AuthProvider'
import { remove_cart,update_to_cart } from '../Function'
import {useNavigate} from 'react-router-dom'


const Cart = () => {
  const navigate = useNavigate()
  const {cart,userToken,dispatch} = useContext(AuthContext)
  console.log(cart)
  return (
    <>
    
  {! cart?.length ? 
    <div className='container section-marginY ' style={{padding:10}}>
    <div className='row'>
        <div className='col-md-12' style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <a href='#/'><img src='images/emptycart.png' alt="404" style={{ maxHeight: 450, maxWidth: 500,width:'70%',margin:'0 auto'  }}></img></a>
            <br></br>
            <h4 style={{color:'#fb7676'}}>Your Cart Is Empty</h4>
            <span></span>
            <br></br>

            
            {/* <button className='themeButton' style={{ width: '100%', marginTop: 20 }}>Go back home</button> */}
        </div>
    </div>
</div>
:
<>
    {cart?.map((element)=>{

        return<div className="section-padding justify-content-between d-flex" style={{gridGap:20}}>
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
</div>
</div>

{/* ----------------right--------- */}
<div className='d-flex ' style={{gridGap:20,height:'fit-content'}} id="cartdetails-right">

    <p className="normal-text" style={{margin:0}}>&#8377; {element?.product?.price}</p>
    <p className="normal-text" style={{margin:0}}>X </p>

    <div className="cart-update between-div ">
    <i class="bi bi-dash" onClick={()=>element?.qty>1 ? update_to_cart(element?.product?.product_id,-1,userToken,dispatch):null}></i>
    <p>{element?.qty}</p>
    <i class="bi bi-plus" onClick={()=>update_to_cart(element?.product?.product_id,1,userToken,dispatch)}></i>
    </div>
    <p className="normal-text" style={{margin:0}}>&#8377;{element?.product?.price * element?.qty} </p>
    <i class="bi bi-trash3" onClick={()=>remove_cart(element?.product,userToken,dispatch)}></i>
</div>

    
</div>
    })}

    <div className='cart-price d-flex align-items-end section-paddingX flex-column' style={{paddingBottom:'2rem'}} >

    {cart?.map((element)=>{

      return  <div className="between-div" style={{width:'300px'}} >
    <p className='normal-text' style={{fontWeight:400,marginBottom:0}}> {element?.product?.name}</p>
    <p className='normal-text' style={{fontWeight:400,marginBottom:0}}> &#8377; {element?.product?.price} X {element?.qty}  </p>
    </div>
    })}

   
    <div className="between-div" style={{width:'300px',marginTop:10}} >
    <p className='normal-text' style={{fontWeight:600}}> GST 18%</p>
    <p className='normal-text' style={{fontWeight:500}}> &#8377; 2500</p>
    </div>

    <div className="between-div" style={{width:'300px'}} >
    <p className='normal-text' style={{fontWeight:600}}> Net</p>
    <p className='normal-text' style={{fontWeight:500}}> &#8377; {cart?.reduce((a,b)=>a+(b?.product?.price * b?.qty),0)} </p>
    </div>
    
    <div className="between-div" style={{width:'300px'}} >
    <button className="themeButton" style={{width:'100%'}} onClick={()=>navigate('/checkout' ,{state:{data:cart}} )}> Procced To Checkout</button>
    </div>
 
    
    </div>
    </>
  }
    </>
  )
}

export default Cart