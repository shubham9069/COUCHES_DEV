import React from 'react'
import { Link } from 'react-router-dom'


const Footer = () => {
  return (
    <div className="" style={{background:'rgb(63, 63, 63)'}}>
<div  className="Footer section-padding ">

<div>
    <p className="section-subheading">ShowRoom</p>

    <a className="normal-text link-a"><span className="Footer-icon"><i class="bi bi-house-door-fill "></i></span>3rd Floor , Rana Tower, New Palam Vihar, Phase I, Gurugram, Haryana 122016, India</a>

    <a className="normal-text link-a"><span className="Footer-icon" ><i class="bi bi-house-door-fill "></i></span>P.IVA: 01686270842</a>

    <a className="normal-text link-a"><span className="Footer-icon"><i class="bi bi-telephone-fill "></i></span>(+91) 8178924823
</a>

    <a className="normal-text link-a"><span className="Footer-icon"><i class="bi bi-envelope-fill "></i></span>
    info@techninza.in</a>


{/* ----icon --------------- */}
<div style={{display:'flex',gridGap:10}}>
<a className="social-link"><i class="bi bi-instagram"></i></a>
<a className="social-link"><i class="bi bi-twitter "></i></a>
<a className="social-link"><i class="bi bi-facebook "></i></a>
<a className="social-link"><i class="bi bi-whatsapp "></i></a>
<a className="social-link"><i class="bi bi-linkedin "></i></a>
</div>
</div>

<div>
    <p className="section-subheading">Quick Link </p>

    <Link to="/about-us" className="normal-text link-a">About Us</Link>
    <a className="normal-text link-a">Our Story</a>
    <Link to="/editprofile" className="normal-text link-a">My Account </Link>
    <Link to="/Allproduct" className="normal-text link-a">Product </Link>

   
</div>
<div>
    <p className="section-subheading">Contact Us  </p>

    <Link to="/contact-us" className="normal-text link-a">Contact Us </Link>
    <a href="tel:555-555-5555" className="normal-text link-a">Call us </a>
    <a href = "mailto: abc@example.com" className="normal-text link-a">Mail us </a>
   
  

   
</div>
<div>
    <p className="section-subheading">Information</p>

    <a className="normal-text link-a">Privacy & policy </a>
    <a className="normal-text link-a">Terms & Condition </a>
    <a className="normal-text link-a">Terms & Condition </a>
    <a className="normal-text link-a">Terms & Condition </a>
    <a className="normal-text link-a">Terms & Condition </a>



   
</div>
<div>
    <p className="section-subheading">Payment methode </p>

    <a className="normal-text link-a">Privacy & policy </a>
    <a className="normal-text link-a">Terms & Condition </a>
    <a className="normal-text link-a">My Account </a>
    <a className="normal-text link-a">Product </a>
    <a className="normal-text link-a">Terms & Condition </a>
    <a className="normal-text link-a">My Account </a>
    <a className="normal-text link-a">Product </a>

   
</div>

</div>
<div className="footer-copyright-section center-div" style={{borderTop:'1px solid #4d4d4d',padding:'1rem'}}>
    <p className='normal-text' style={{color: 'white'}}>Copyright © 2023 - All rights reserved. Powered by Carnova</p>
</div>
  </div>
  )
}

export default Footer