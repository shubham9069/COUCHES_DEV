import React,{useEffect,useState,useContext,useRef, useMemo, useCallback} from 'react'
import History from '../Homepage/History'
import { Link,useParams,useNavigate,useLocation} from 'react-router-dom'
import { AuthContext } from '../AuthProvider'
import Toast from '../Toast'
import axios from '../axios';
import { Add_to_cart,remove_cart ,update_to_cart} from '../Function'
import Loader from '../pages/Loader'



const ProductDetails = () => {
  const navigate =useNavigate()
  const location = useLocation()
  const {cart,userToken,dispatch} = useContext(AuthContext)
  const [isLoading,setIsLoading] = useState(true);
  const {id} = useParams()
  const [productDetails, setProductDetails] = useState([]);
  const [imgstate,setImageState]=useState("")



  const get_details = async (url,type) => {
    
    try {
      const response = await axios({
        method: "get",
        url: url,
      });

      if (response.status === 200) {
        const data = response?.data;
        if(type=="product"){
          setProductDetails(data?.product)
          setImageState(data?.product?.images?.length &&(data?.product?.images[0]) )
          
        }
        // else{
        //   setHomepage((p)=>({...p,["Recommended"]:data?.products}))
        // }
       

        //   Toast(data.message,response.status)
      }
    } catch (err) {
      const error = err?.response?.data;
      Toast(error?.message);
    }
    finally{
      setIsLoading(false);
    }
  };


  useEffect(()=>{
    get_details(`/get_product?product_id=${id}`,'product')
    // !Recommended?.length? get_details('/get_recommanded_products'):setIsLoading(false)
    
  },[id])

  

  const cart_section =()=>{
    
    var cartdata =cart
    var arr =[]
    var data = cartdata?.find((element)=>{return element?.product?.product_id == productDetails?.product_id})
    
    if(data==undefined ){
       arr.push( 
       <div  style={{display:'flex',margin:'1rem 0 ',gridGap:20}}>

       <div className="cart-update between-div ">
       <i class="bi bi-dash"></i>
       <p>0</p>
       <i class="bi bi-plus"  onClick={(e)=>{e.preventDefault();Add_to_cart(productDetails,navigate,location,userToken,dispatch)}}></i>
       </div>
   
   
   {/* icon section wishlist and cart  */}
       <div className='center-div cart-icon' style={{width: '50px', height: '50px',border:' 1px solid #4747472d'}} >
   <i class="bi bi-heart"></i>
   </div>
   
       <div className='center-div cart-icon' style={{width: '50px', height: '50px',border:' 1px solid #4747472d'}} onClick={(e)=>{e.preventDefault();Add_to_cart(productDetails,navigate,location,userToken,dispatch)}}>
   <i class="bi bi-cart"></i>
   </div>
   
   
       </div>

       )
    }else{
      arr.push( 
        <div  style={{display:'flex',margin:'1rem 0 ',gridGap:20}}>
 
        <div className="cart-update between-div ">
        <i class="bi bi-dash" onClick={()=>update_to_cart(productDetails?.product_id,-1,userToken,dispatch)}></i>
        <p>{data?.qty}</p>
        <i class="bi bi-plus" onClick={()=>update_to_cart(productDetails?.product_id,1,userToken,dispatch)}></i>
        </div>
    
    
    {/* icon section wishlist and cart  */}
        <div className='center-div cart-icon' style={{width: '50px', height: '50px',border:' 1px solid #4747472d'}} >
    <i class="bi bi-heart"></i>
    </div>
    
        <div className='center-div cart-icon' style={{width: '50px', height: '50px',border:' 1px solid #4747472d'}} onClick={(e)=>{e.preventDefault();remove_cart(productDetails,userToken,dispatch)}}>
    <i class="bi bi-cart-fill"></i>
    </div>
    
    
        </div>
 
        )
    }

    return arr

  }

  const ratingCalculate = useCallback((star)=>{
    console.log(star)
    var total = productDetails?.reviews?.reduce((a,b)=>{
      if(b.rating==star){

        return a+Number(b?.rating)
      }
    },0)

    console.log(total)
    
   
  },[])
  
  const getstar =(rating) => {
    var total = 5
    var star =[]
    for(var i=0; i<Math.floor(rating);i++){
        star.push(<div 
            style={{clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)', 
            background:"#fed001",
            height:15,
            width:15
            
            }}>

            </div>)
    }
    for(var i=0; i<total-rating;i++){
        star.push(<div 
            style={{clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)', 
            background:'#D9D1D1',
            height:15,
            width:15
            
            }}>

            </div>)
    }
    return star
}

  const carthtml = useMemo(cart_section,[cart,id,productDetails])
  return (
    <>
      {isLoading && (<Loader />)}    
      <div className="product-details-top " style={{padding:'1.5rem',background:'rgba(226, 226, 226, 0.3)'}}>

      <p className="normal-text" style={{marginBottom:'2rem'}}><i class="bi bi-house-door-fill" ></i> &nbsp; /  &nbsp; All product &nbsp; / &nbsp; <span style={{color:'#02a89e'}}>{id}</span></p>
      </div>

      {/*------------------- product details start  ----------------------*/}
      <div className="product-details-container  max-width-2000px  mx-auto ">

        <div className="product-details-left">
          <img src={imgstate } style={{margin:'0 auto',width:'60%',maxWidth:'400px'}}></img>

          <div  style={{ display:'flex',gridGap:10}}>
          {productDetails?.images?.map((element)=>{

            return     <img src={element}
    style={{width:60,margin:'0.5rem 1rem',boxShadow:' rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px'}}
   loading="lazy"></img>
          })}
  

    
  

  </div>
        </div>
        <div className="product-details-right">

        <h2 className="" style={{textAlign:'left'}}> {productDetails?.name}</h2>
        <p className="" style={{fontSize:20,color:'grey'}}>&#x20B9; {productDetails?.price}</p>
        <p className='product-box-desc normal-text'style={{height:'200px',overflow: 'auto',padding:'0 1rem'}} dangerouslySetInnerHTML={{__html: productDetails?.description }}></p>

        <p className="dark-text" >{productDetails?.short_description}</p>

        <div >
    <span>Available in 8/9 weeks</span>

{/* cart buttton section  */}

{carthtml}
   

    {/* cart update end  */}

    <button className="themeButton" style={{width:'100%'}} onClick={()=>navigate('/checkout-SingleProduct' ,{state:{data:[{product:productDetails}]}} )}>BUY NOW</button>


    {/* rating section excellence  */}
    <div className="star-section center-div" style={{gridGap:'10px',padding:10}}>
      <h1 className="section-subheading" style={{margin:0}} > Excellence </h1>
      <div className=" center-div" style={{gridGap:'5px'}}>
          {getstar(productDetails?.reviews?.reduce((a,b)=>a+Number(b?.rating),0)/productDetails?.reviews?.length)}
      </div>
      <span  style={{fontSize:14}}>{productDetails?.reviews?.length} Review on </span>
      <span style={{fontSize:14,fontWeight:700}}>Trust Pilot </span>
    </div>

    {/* excellence end  */}


        </div>
        </div>
      </div>
      {/* ----------------product details end -------------- */}

     
      <p className="normal-text" style={{marginBottom:'2rem',textAlign:'center'}}>Description &nbsp; /  &nbsp; Review </p>
      <div className='product-details-bottom d-flex section-paddingX container' style={{gridGap:30,padding:'1rem 0',flexWrap:'wrap-reverse'}}>

    <div className='product-details-bottom-left ' style={{flex:1}}>
    {productDetails?.reviews?.length ? 
    productDetails?.reviews?.map((element)=>{

      return  <div className='product-details-review'>
        <img src={element?.avatar}></img>
        
        <div>
        <p style={{fontSize:16,fontWeight:600,marginBottom:6}}>{element?.customer_name}</p>
        <div style={{display:'flex',gridGap:5,marginBottom:6}}>{getstar(Number(element?.rating))}</div>
        <p style={{fontSize:12}}>{element?.review}</p>
        </div>
      </div>
    })
    :<div className='product-details-review'>
        
        <p style={{fontSize:16,fontWeight:600,marginBottom:6}}>no Review Found</p>
     </div>   
    }
    
     
    </div>
    <div className='product-details-bottom-right' style={{flex:0.4}}>
      <h6>What About to say</h6>
      <div>
    <p style={{fontSize:12,fontWeight:500,color:'#939393'}}>{productDetails?.reviews?.length} Review | {productDetails?.reviews?.reduce((a,b)=>a+Number(b?.rating),0)} rating</p>
    {[...Array(5)]?.map((element,index)=>{

      return  <div className="d-flex align-items-center" style={{gridGap:10,fontSize:13}}>
      {index+1}
      <div 
            style={{clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)', 
            background:"#fed001",
            height:15,
            width:15
            
            }}>

            </div>

      <div style={{ height: 5, width: 160, backgroundColor: '#C4C4C4', margin: '0px 5px', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', borderRadius: 5, }}>
      <div style={{width:(productDetails?.reviews?.filter((a)=> Number(a.rating) == index+1 )?.length/(productDetails?.reviews?.length))*20,height:5, borderRadius: 5,backgroundColor: index == 3 ? '#EC8F5A' : index == 4 ? '#F55936' : '#34A853',}}></div>
       
    </div>
    {productDetails?.reviews?.filter((a)=> Number(a.rating) == index+1 ).length} rating
    </div>
    })}
   


      </div>
    </div>
      </div>
      
    </>
  )
}

export default ProductDetails