import React,{useContext,useState,useEffect} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {AuthContext} from '../AuthProvider'
import Logout from '../Form/Logout'



const Navbar = () => {
  const location = useLocation()
  const logout = Logout();
  const {userToken,userData,CategoryData,All_Product_Page,cart} = useContext(AuthContext)
  const navigate = useNavigate();

const [SearchArr,setSearchArr] = useState([])
const [searchShow,setSearchShow] = useState(false)

const handleSearch=(inputvalue)=>{
 
  setSearchShow(true)
  inputvalue = inputvalue.toLowerCase()
  var PaintingArr = All_Product_Page?.filter((element=>{
    var lowercase = element.name.toLowerCase().split(" ").join("");
    
    
    return lowercase.includes(inputvalue) || element.name.toLowerCase().includes(inputvalue) 
  }))
console.log(PaintingArr)
  
setSearchArr([...PaintingArr])
}

  
const debounce = (func, delay) => {
  let timer
  return (...args) => {
      clearTimeout(timer)
      timer = setTimeout(() => {
          func(...args)  // func.apply(null,args)     
      }, delay)
  }
}
useEffect(() => {

  setSearchShow(false)
},[location?.pathname])
 


const filerSearch = debounce((inputvalue) => handleSearch(inputvalue), 300)


  return (
    <div className="navigation-bar">
    <div id="topbar">
    <div className="container">
      <p >TAKE ADVANTAGE OF <strong>15%</strong> OFF ON ALL PRODUCTS |<strong> VOUCHER: SPRING15 </strong> | MORE INFO</p>
    </div>
    </div>
    <div className=" between-div section-paddingX section-paddingY" style={{gridGap:15}}>
    <div className="" style={{ flex: '0 1 250px'}}>
    {/* <img style={{cursor: 'pointer'}} src="https://www.miliashop.com/themes/leo_cool_stuff/img/modules/appagebuilder/images/logo-new-milia.png" id="logo" onClick={()=>navigate('/')}></img>
     */}
     <p style={{margin:0,fontSize:30, fontWeight:900,textTransform:'uppercase',color:'#383838'}}>Couchette</p>
    </div>

    <div className=" d-flex flex-auto " style={{gridGap:15,flexWrap:'wrap',flex:1}} id='navigation-item'>
    <a style={{padding:'0 5px' }} onClick={()=>setSearchShow(!searchShow)} className='center-div'><i className="bi bi-search" id="searchButton"></i></a>
   

    {searchShow ?
      <div style={{maxWidth:'300px',width:'100%',position:'relative', display:'flex'}} >
 <input type="text" className="form-control" id="search" placeholder="Search bar "
  style={{backgroundColor: 'transparent',border: '1px solid #cccccc'}}
    onChange={(e)=>filerSearch(e.target.value)}
    
    autocomplete="off"
  />
    {searchShow && (  <div className="searchdropdown" >
        {SearchArr.length ?  SearchArr?.map((element)=>{
  
    return <div onClick={()=>navigate("/productDetails/" + element.product_id)}>
      <img src={element.images.length ? element.images[0]:null}></img>
      <p>{element.name}</p>
      <p>&#x20B9; {element?.price}</p>
    </div>}):<div>no product found</div>}
    </div>)}
  </div>
  :
  <>
  <Link to='/Allproduct' className="link-a" style={{fontWeight:700}}>ALL PRODUCT</Link>

      
     {CategoryData?.map((element)=>{


      return <Link to={"/Category/"+element?.id}  className="link-a">{element?.name}
      {element?.sub_categories?.length ?
      <div className="nav-item-hover">

      <div>
      <h1 className='section-subheading'>{element?.name}</h1>
      <div className="d-flex" style={{flexWrap:'wrap',gridGap:30}}>

      { element?.sub_categories?.map((item)=>{

        return <Link to={"/Category/"+element?.id} className="normal-text link-a">{item?.name}</Link>
      })}
     
      </div>
      </div>
  </div>
  :null}
      </Link>
    })} 
    </>
    }
      
      

    </div>


    <div className=" d-flex navbar-icon  " style={{gridGap:10}}>

      {!userToken ?
        <Link to='/login'><i className="bi bi-person"></i></Link>
        :
        <a  className="dropdown">
      
      <i className="bi bi-person dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"></i>
      
      <ul className="dropdown-menu navbardropdown">
     <li> <img style={{height:50,width:50,borderRadius:'50%',margin:'10px auto'}} src={userData?.avatar}></img></li>
    <li><Link to="/editprofile" className="dropdown-item" href="#"> <i className="bi bi-person-lines-fill "></i> Edit Profile</Link></li>
    <li><Link to="/MyOrders" className="dropdown-item" ><i className="bi bi-bag"></i>my orders</Link></li>
    <li onClick={logout}><a className="dropdown-item" href="#"> <i className="bi bi-list" ></i>Logout</a></li>
  </ul>
      </a>

      }
    
   


      <a><i className="bi bi-telephone"></i></a>
      <Link to="/cart"><i className="bi bi-cart position-relative" >
      <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill " style={{backgroundColor:"#02a89e",padding:'3px 5px',fontSize:12}}>
    {cart.length ? cart.length :0}
    <span class="visually-hidden">unread messages</span>
  </span>
      </i></Link>
    

    </div>
    <div className=" d-flex navbar-icon  " id='hamburger' style={{gridGap:10,height:30,width:30}} data-bs-toggle="collapse" data-bs-target="#navigation-item-show" aria-expanded="false" aria-controls="navigation-item-show">
      <a style={{ }} ><i className="bi bi-list"></i></a>
     
    

    </div>
    
    </div>
    <div className=" flex-auto center-div collapse " style={{gridGap:15,flexWrap:'wrap',padding:'1rem'}} id='navigation-item-show'  >
    <a style={{padding:'0 5px' }} onClick={()=>setSearchShow(!searchShow)} className='center-div'><i className="bi bi-search" id="searchButton"></i></a>
   

    {searchShow ?
      <div style={{maxWidth:'300px',width:'100%',position:'relative', display:'flex'}} >
 <input type="text" className="form-control" id="search" placeholder="Search bar "
  style={{backgroundColor: 'transparent',border: '1px solid #cccccc'}}
    onChange={(e)=>filerSearch(e.target.value)}
    
    autocomplete="off"
  />
    {searchShow && (  <div className="searchdropdown" >
        {SearchArr.length ?  SearchArr?.map((element)=>{
  
    return <div onClick={()=>navigate("/productDetails/" + element.product_id)}>
      <img src={element.images.length ? element.images[0]:null}></img>
      <p>{element.name}</p>
      <p>&#x20B9; {element?.price}</p>
    </div>}):<div>no product found</div>}
    </div>)}
  </div>
  :
  <>
  <Link to='/Allproduct' className="link-a" style={{fontWeight:700}}>ALL PRODUCT</Link>

      
     {CategoryData?.map((element)=>{


      return <Link to={"/Category/"+element?.id} className='link-a'>{element?.name}
      <div className="nav-item-hover">

      <div>
      <h1 className='section-subheading'>subCategory</h1>
      <div className="d-flex" style={{flexWrap:'wrap',gridGap:30}}>

      {element?.sub_categories?.map((element)=>{

        return <a className="normal-text link-a">{element?.name}</a>
      })}
     
      </div>
      </div>
  </div>
      </Link>
    })} 
    </>
    }

    </div>
    </div>
  )
}

export default Navbar