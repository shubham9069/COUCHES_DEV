import React ,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../axios'
import  Toast  from '../Toast'
import validator from 'validator';
import Loader from '../pages/Loader';


const Signup = () => {
    let navigate = useNavigate()
    const [selected, setSelected] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    const [users, setUsers] = useState({
        name: "",
        email: "",
        mobile: "",
        password: ""

    });
    const {name,email,mobile,password} = users
    
  const onchange=(e)=>{
    
    const name = e.target.name;              
   const value = e.target.value;
 

    setUsers({...users,[name]:value})
  }

  const signup = async(e)=>{

    e.preventDefault()
  
     if(!name || !email || !mobile  || !password) return Toast("please fill properly")
     if( !validator.isEmail(email)) return Toast("email is not valid")
     if( !/^[0]?[789]\d{9}$/.test(mobile)) return Toast("mobile no  is not valid")
     if( !validator.isStrongPassword(password)) return Toast("password is not strong")
    //  if( password !== confirmpassword ) return Toast("password and confirm is not match")
     if( selected===false) return Toast("plz read terms & condition ")

     try{
      setIsLoading(true)
      const response= await axios({
        method: "post",
       url:'/signup',
        data:{
          name,email,password,mobile
        },
        headers: {
          "Content-Type": "application/json",
          
        },
       })
       
       if(response.status===200){
        const data = response.data
        Toast(data.message,response.status)
        navigate('/verify',{state:{email}})
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
<span className='normal-text'> Signup and go to the Home</span>
<form style={{margin:'1rem 0'}} onSubmit={signup}>

<div className="labelAndInput">
                            <label> Name </label>
                            <input type='name' placeholder="Enter name" name="name" value={name} onChange={e => onchange(e)}></input>
                            
                        </div>
                        <div className="labelAndInput">
                            <label> Email </label>
                            <input type='email' placeholder="Enter email" name="email" value={email} onChange={e => onchange(e)}></input>
                          
                        </div>
                        <div className="labelAndInput">
                            <label> Mobile </label>
                            <input type='Number' placeholder="Enter mobile" name="mobile" value={mobile} onChange={e => onchange(e)}></input>
                           
                        </div>
                        <div className="labelAndInput">
                            <label> Password </label>
                            <input type='password' placeholder="Password" name="password" value={password} onChange={e => onchange(e)}></input>
                          
                        </div>
<div className='row justify-content-between'>
                <div className='col-md-6' style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1.5px solid #aaa', height: 20, width: 20, borderRadius: 3, marginRight: 10, cursor: 'pointer' }}
                        onClick={() => setSelected(!selected)}>
                        {selected ?
                            <i class="bi bi-check-lg" style={{ color: '#56BDBD' }}></i>
                            : null}
                    </div>
                    <p className="normal-text" style={{marginBottom:0,fontWeight:500}}>I agree to the <span style={{}}>Terms & Conditions </span></p>
                </div>
                
            </div>

<div className="labelAndInput " style={{marginTop:'1rem'}}>
<button type='submit'  className="themeButton">Create Your Account</button>                     
</div> 
</form>

<p  className="normal-text" style={{letterSpacing: '-0.017em',textAlign:'center',fontWeight:'500' }}>Are you already a member ?  <Link to="/login" className='link-a' style={{color: '#56BDBD'}}>Login</Link></p>
</div>
</div>





   </>
  )
}

export default Signup