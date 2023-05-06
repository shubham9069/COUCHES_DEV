import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../AuthProvider'
import axios from '../axios'
import Toast from '../Toast'
import Loader from '../pages/Loader'




const Verify = () => {
    const {setUserToken,setUserData} = useContext(AuthContext)
    let navigate = useNavigate()
    const location = useLocation();
    const email = location?.state?.email
    const [errors] = useState();
    const [isLoading, setIsLoading] = useState(false)

    const [users, setUsers] = useState({
        otp1: "",
        otp2: "",
        otp3: "",
        otp4: "",
    });
    
    const { otp1, otp2, otp3, otp4 } = users;
    function focusInput(e){
      
          
        // keycode 8 for backspace 
        if(e.keyCode == 8 && e.target.value.length ==0 &&  e.target.previousElementSibling !==null){
        e.target.previousElementSibling.focus()
       
  
        }if( e.target.value.length >=e.target.maxLength && e.target.nextElementSibling !==null){
          e.target.nextElementSibling.focus()
        }
        
  
      }

      const checkotp=async(e)=>{
        e.preventDefault()
        
        if(!otp1 || !otp2 || !otp3 || !otp4){
            var otpbox = document.querySelectorAll('.otpInput');
            // console.log(otpbox)
            otpbox?.forEach((element,index)=>{
                // console.log(element..length)
                if(element.value?.length<=0){
                    element.style.borderBottom= "2px solid red"
                    console.log('hello')
                }
            })

            return Toast('plz filled otp');
        }

        const otp = otp1+otp2+otp3+otp4
        console.log(email,otp)
        try{
          setIsLoading(true)
            const response= await axios({
              method: "post",
             url:'/verify-otp',
              data:{
                email,otp
              },
              headers: {
                "Content-Type": "application/json",
                
              },
             })
             
             if(response.status===200){
              const data = response.data;
              setUserToken(data.accessToken);
              setUserData(data.Customer)
              window.localStorage.setItem('userToken', JSON.stringify(data.accessToken));
              window.localStorage.setItem('userData', JSON.stringify(data.Customer));
              Toast(data.message,response.status);
              navigate('/')
             }
           }
           catch(err){
            const error = err.response.data
            Toast(error.message)
      
           }
           finally{
            setIsLoading(false)
           }
    }
    const resendotp=async(e)=>{
        e.preventDefault()
        try{
          setIsLoading(true)
            const response= await axios({
              method: "post",
             url:'/resend-otp',
              data:{
                email
              },
              headers: {
                "Content-Type": "application/json",
                
              },
             })
             
             if(response.status===200){
              const data = response.data
              Toast(data.message,response.status)
             }
           }
           catch(err){
            const error = err.response.data
            Toast(error.message)
      
           }
           finally{
            setIsLoading(false)
           }
    }
    
  return (
    <>
    {isLoading ?<Loader />:null}
    <div className="login center-div section-padding" style={{height:'100%'}}>

    <div className="login-left" style={{flex:1}}>
        <img src="images/login.png"></img>
    </div>
    <div className="login-right section-paddingX " style={{flex:0.75}}>
        
<h1 className="section-heading" style={{textAlign: 'left',}}>Enter verification code</h1>
<span className='normal-text'> We have just sent a verification code to <br/>{email}</span>
<form style={{margin:'1rem 0'}}  onSubmit={checkotp}>
<div className="labelAndInput">
                            <label>Enter verification code </label>
                            <div className='otpWrapper'>
                                <input  className="otpInput" type='text' placeholder="1" name="otp1"
                                    value={otp1} maxLength={1}
                                    // style={{ borderColor: errors.otp1 ? 'red' : '#C4C4C4' }}
                                    onChange={(e) => {
                                        setUsers({ ...users, otp1: e.target.value })
                                    }}
                                    onFocus={(e)=>e.target.style.borderBottom= "2px solid #ddd"}
                                    onKeyUp={e => focusInput(e)}
                                    tabIndex={1}
                                    autoComplete="off"
                                >
                                </input>
                                <input  className="otpInput" type='text' placeholder="2" name="otp2"
                                    value={otp2} maxLength={1}
                                    // style={{ borderColor: errors.otp2 ? 'red' : '#C4C4C4' }}
                                    onChange={(e) => {
                                        setUsers({ ...users, otp2: e.target.value })
                                        // e.target.value ? ref3.current.focus() : ref1.current.focus()
                                    }}
                                    onKeyUp={e => focusInput(e)}
                                    onFocus={(e)=>e.target.style.borderBottom= "2px solid #ddd"}
                                    tabIndex={2}
                                    autoComplete="off">
                                </input>
                                <input  className="otpInput" type='text' placeholder="3" name="otp3"
                                    value={otp3} maxLength={1}
                                    // style={{ borderColor: errors.otp3 ? 'red' : '#C4C4C4' }}
                                    onChange={(e) => {
                                        setUsers({ ...users, otp3: e.target.value })
                                        // e.target.value ? ref4.current.focus() : ref2.current.focus()
                                    }}
                                    onKeyUp={e => focusInput(e)}
                                    onFocus={(e)=>e.target.style.borderBottom= "2px solid #ddd"}
                                    tabIndex={3}
                                    autoComplete="off">
                                </input><input  className="otpInput" type='text' placeholder="4" name="otp4"
                                    value={otp4} maxLength={1}
                                    // style={{ borderColor: errors.otp4 ? 'red' : '#C4C4C4' }}
                                    onChange={(e) => {
                                        setUsers({ ...users, otp4: e.target.value })
                                    }}
                                    onKeyUp={e => focusInput(e)}
                                    onFocus={(e)=>e.target.style.borderBottom= "2px solid #ddd"}
                                    tabIndex={4}
                                    autoComplete="off">
                                </input>
                            </div>
                            </div>

<br></br>
                        <p><a onClick={resendotp} className='link-a' style={{fontWeight:500,fontSize:14}}>Resend OTP</a></p>
                        <p style={{ color: '#000',fontWeight:500,fontSize:14 }}>Log In using <Link to="/login" className='link-a' style={{color:'#56BDBD'}}>Password</Link></p>
                        <p style={{ color: '#000',fontWeight:500 ,fontSize:14 }}>Having trouble in logging in? <a href="#" className='link-a'  style={{color:'#56BDBD'}}>Get Help</a></p>
                        <br></br>

<div className="labelAndInput " style={{marginTop:'1rem'}}>
<button type='submit' className="themeButton">Verify</button>                     
</div> 
</form>


    </div>
</div>
</>
  )
}

export default Verify