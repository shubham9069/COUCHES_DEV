import React, { useState } from 'react'
import { Link } from 'react-router-dom'


const DiscoverNow = ({content,dataArr,type,row}) => {
  const {title,desc,sub_green,sub_text} = content
  const item_per_Slide=4;
  const [previndex,setprevindex] = useState(0)
  const [nextindex,setnextindex] = useState(item_per_Slide)
  




  const paginationNext=()=>{
    
    var prev= nextindex

if(nextindex+item_per_Slide > dataArr.length){

  setnextindex(nextindex+item_per_Slide);
  setprevindex(dataArr.length-item_per_Slide)
  return 
}else
{
setprevindex(prev)
setnextindex(nextindex+item_per_Slide)
}

  }

  const paginationPrev=()=>{
    
    var next= previndex

if(previndex-item_per_Slide < 0){
console.log("hello ")
setnextindex(item_per_Slide);
setprevindex(0)
  return 
}else{
setprevindex(previndex-item_per_Slide)
setnextindex(next)
}

  }
  return (
    <div className="section-padding ">


    <div className='d-flex discover-container ' style={{flexDirection:row}} >

    <div className="discover-left">
    <div className=" container ">
        <p className="section-heading " style={{marginBottom:'0.5rem'}}> {title}</p>
        <p className="section-subheading"> <span style={{color: '#02a89e'}}>{sub_green}</span> {sub_text}</p>
      

        <p className='normal-text' style={{lineHeight:'35px'}} id="desc-text">{desc}</p>
        
      
        <button className='themeButton ' style={{}}> Discover Now</button>
      </div>
    </div>
    <div className="discover-right d-flex  justify-content-center">

    {dataArr?.slice(previndex,nextindex)?.map((element, i) => {

        return   <Link to={type=="product" ? "/productDetails/" + element?.product_id : "/Category/"+element?.id}  style={{ background:'#f8f8f8'}} className="discover-div link-a">
    <img src={element?.icon || element?.images?.length &&(element?.images[0])} id='discover_img'></img>
    <p style={{ }}>{element?.name} <span style={{fontWeight:500}}>&#8377;{element?.price}</span></p>
        </Link>
    })}
    {/* <div className="discover-navigate-icon">
    <img src="images/slick-left.png" onClick={paginationPrev}></img>
    <img src="images/slick-right.png" onClick={paginationNext}></img>
    </div> */}
       
    </div>





    </div>

    </div>
  )
}

export default DiscoverNow