import React ,{useContext, useState} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {AuthContext} from '../AuthProvider'
import axios from '../axios'
import Toast from '../Toast'
import Loader from '../pages/Loader'





const Login = () => {
    const {setUserToken,setUserData} = useContext(AuthContext)
    let navigate = useNavigate();
    const location =useLocation();
  const from = location?.state?.from?.pathname

    const [selected, setSelected] = useState(true);
    const [isLoading, setIsLoading] = useState(false)
    const [users, setUsers] = useState({
        email: "",
        password: ""

    });
    const { email, password } = users;
    const onchange = e => {
        // setErrorMsg('')
        setUsers(users => ({ ...users, [e.target.name]: e.target.value }));
    }
    const login = async(e)=>{
        e.preventDefault()
    
         if(!email || !password ) return Toast("please fill properly")
        
         try{
          setIsLoading(true)
          const response= await axios({
            method: "post",
           url:'/login',
            data:{
              email,password
            },
            headers: {
              "Content-Type": "application/json",
              
            },
           })
           
           if(response.status===200){
            const data = response.data
            setUserToken(data.accessToken);
            setUserData(data.Customer)
            window.localStorage.setItem('userToken', JSON.stringify(data.accessToken));
            window.localStorage.setItem('userData', JSON.stringify(data.Customer));
            Toast(data.message,response.status)
            navigate(from || '/')
           }
         }
         catch(err){
          const error = err.response.data
        //   console.log(error.status)
          if(error?.status==403){
    // console.log('hello')
            resendotp();
           
            
            Toast(error.message);
            return 
          }
          Toast(error.message);
         
          
          
    
    
         }
         finally{
          setIsLoading(false)
         }
      }
    
      const resendotp=async(e)=>{
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
              navigate('/verifyotp',{state:{email}})
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
                
<h1 className="section-heading" style={{textAlign: 'left',}}>welcome to Beab Bag</h1>
<span className='normal-text'> Log in and go to the Home</span>
<form style={{margin:'1rem 0'}} onSubmit={login}>
<div className="labelAndInput">
                            <label> Email </label>
                            <input type='email' placeholder="Enter email" name="email" value={users.email} onChange={e => onchange(e)}></input>
                           
                        </div>
                        <div className="labelAndInput">
                            <label> Password </label>
                            <input type='password' placeholder="Password" name="password" value={users.password} onChange={e => onchange(e)}></input>
                           
                        </div>
<div className='row justify-content-between'>
                            <div className='col-md-6' style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1.5px solid #aaa', height: 20, width: 20, borderRadius: 3, marginRight: 10, cursor: 'pointer' }}
                                    onClick={() => setSelected(!selected)}>
                                    {selected ?
                                        <i class="bi bi-check-lg" style={{ color: '#56BDBD' }}></i>
                                        : null}
                                </div>
                                <p className="normal-text" style={{marginBottom:0}}>Remember me</p>
                            </div>
                            <div className='col-md-6' style={{ justifyContent: 'flex-end', display: 'flex' }}>
                                <Link to='/forgetpassword' className='link-a normal-text' style={{fontWeight:600,color:'#757373b0'}}>Forgot password ?</Link>
                            </div>
                        </div>

<div className="labelAndInput " style={{marginTop:'1rem'}}>
       <button  type='submit' className="themeButton">Login</button>                     
</div> 
</form>

<p  className="normal-text" style={{letterSpacing: '-0.017em',textAlign:'center',fontWeight:'500' }}>Don't have an account? <Link to="/Signup" className='link-a' style={{color: '#56BDBD'}}>Sign up</Link></p>
            </div>
        </div>
    </>
  )
}

export default Login