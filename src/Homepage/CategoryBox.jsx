import React, { useContext,useState } from 'react'
import { AuthContext } from '../AuthProvider'
import { Link,useParams,useNavigate,useLocation} from 'react-router-dom'
import { Add_to_cart,remove_cart } from '../Function'




const CategoryBox = () => {
  const {All_Product_Page,cart,userToken,dispatch} = useContext(AuthContext)
  
  const navigate =useNavigate()
  const location = useLocation()

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

  return (
    <>
  
    <div className=" section-padding category-container" >

    {/* //left div  */}
    <div className='category-left'>
    <Link to={All_Product_Page?.length && ("/productDetails/" + All_Product_Page[0]?.product_id)} className="category-hover link-a" style={{position:'relative',padding:'1rem 0'}}>
    <div className='container-icon'  >
    
    {cart?.some(element=>element?.product?.product_id == All_Product_Page[0].product_id)
    ?
    <div className='icon-product' onClick={(e)=>{e.preventDefault();remove_cart(All_Product_Page[0],userToken,dispatch)}}>

  <i class="bi bi-bag-fill"></i>
  </div>
  :
  <div className='icon-product' onClick={(e)=>{e.preventDefault();Add_to_cart(All_Product_Page[0],navigate,location,userToken,dispatch)}}>

  <i class="bi bi-bag" ></i>
  </div>
    }
  

  {/* <div className='icon-product'  >
  <i class="bi bi-heart"></i>
  </div> */}
</div>
<a className="link-a">
<img src={All_Product_Page?.length && All_Product_Page[0]?.images?.length ? All_Product_Page[0].images[0]:null} loading="lazy" decoding="async" id="product_img"></img> 
</a>
<div className='between-div m-3 ' >
<p style={{fontWeight: '600',margin:0,}}>{All_Product_Page?.length && (All_Product_Page[0]?.name)}<span style={{color:'grey',fontSize:14}}>(9)</span></p>
<span style={{color:' #02a89e'}}>&#x20B9; {All_Product_Page?.length && (All_Product_Page[0]?.price)}</span>
</div>
<p className='product-box-desc normal-text'style={{height:'80px',overflow: 'auto',padding:'0 1rem'}} dangerouslySetInnerHTML={{__html: All_Product_Page?.length && (All_Product_Page[0]?.description) }} >

</p>
</Link>
    </div>


   {/* right div   */}
    <div className='category-right '>
    {All_Product_Page?.slice(1,7)?.map((element, index) =>{


return <Link to={"/productDetails/" + element?.product_id} className="category-hover link-a" style={{position:'relative'}}>
<div className='container-icon'  >

  
{cart?.some(item=>item?.product?.product_id == element.product_id)
    ?
    <div className='icon-product' onClick={(e)=>{e.preventDefault();remove_cart(element,userToken,dispatch)}}>

  <i class="bi bi-bag-fill"></i>
  </div>
  :
  <div className='icon-product'  onClick={(e)=>{e.preventDefault();Add_to_cart(element,navigate,location,userToken,dispatch)}}>

  <i class="bi bi-bag"></i>
  </div>
    }
  
  {/* <div className='icon-product'  >
  <i class="bi bi-heart"></i>
  </div> */}
</div>

<a key={index} className="link-a ">

<img src={element?.images.length ? element.images[0]:null} loading="lazy" decoding="async" id="product_img"></img> 
</a>

<p className='normal-text' style={{marginBottom:'0.2em'}}>&#8377; {element?.name} </p>
<p style={{color:'#02a89e',textAlign:'center',marginBottom:'0.7rem',fontSize:'14px'}}>&#8377; {element?.price}</p>


  <div className="d-flex" style={{gridGap:7}}>{getstar(3)} <span style={{color: 'grey',fontSize:'600',fontSize:14}}>(11)</span></div>

{/* <p className='product-box-desc' dangerouslySetInnerHTML={{__html: `${element?.description}`}}></p> */}

</Link>

})}

    </div>
    </div>
   </>
    
  )
}

export default CategoryBox