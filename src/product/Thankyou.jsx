import React from 'react'
import { Link } from 'react-router-dom'


const Thankyou = ({title,desc}) => {
  return (
    
    <div className='container section-marginY ' style={{padding:10}}>
    <div className='row'>
        <div className='col-md-12' style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <a href='#/'><img src='images/thanku2.png' alt="404" style={{ maxHeight: 450, maxWidth: 500,width:'70%',margin:'0 auto'  }}></img></a>
            <br></br>
            <h4>{title}</h4>
            <span>{desc}</span>
            <br></br>

            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center',justifyContent:'center',gridGap:10 }}>
                <Link to='/MyOrders' className="themeButton" style={{
                    width: 200,
                }}>Track your order</Link>
                <a href="#/" className="white-themeButton" style={{
                    width: 200,
                }}>Go to home</a>
            </div>
            {/* <button className='themeButton' style={{ width: '100%', marginTop: 20 }}>Go back home</button> */}
        </div>
    </div>
</div>

  )
}

export default Thankyou