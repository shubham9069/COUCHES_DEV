import React,{useContext,useState} from 'react'
import { AuthContext } from '../AuthProvider'
import axios from '../axios'
import Toast from '../Toast'
import Loader from './Loader'
import validator from 'validator'


const EditProfile = () => {
    const [isLoading,setIsLoading] = useState(false)
const {userData,setUserData,userToken} = useContext(AuthContext)    
const [oldPassword,setoldPassword] = useState("")
const [newPassword,setnewPassword] = useState("")
const [images,setimages] = useState("")
    const [users, setUsers] = useState({
        name: userData?.name,
        email: userData?.email,
        mobile: userData?.mobile,
        

    });
    const { name, email, mobile } = users;
    const onchange = e => {
        // setErrorMsg('')
        setUsers({ ...users, [e.target.name]: e.target.value });
    }
    const edit_profile = async(e)=>{
        e.preventDefault()
        
         
         if( !validator.isEmail(email)) return Toast("email is not valid")
         if( !/^[0]?[789]\d{9}$/.test(mobile)) return Toast("mobile no  is not valid")
        var form = new FormData()
        form.append('name',name)
        form.append('email',email)
        form.append('mobile',mobile)
        form.append('images',images)
         try{
          setIsLoading(true)
          const response= await axios({
            method: "post",
           url:'/edit_profile',
            data: form
            ,
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization:`Bearer ${userToken}`,
             
              
            },
           })
           
           if(response.status===200){
            const data = response.data
           
            setUserData(data.Customer)
            window.localStorage.setItem('userData', JSON.stringify(data.Customer));
        
            Toast(data.message,response.status)
           
           }
         }
         catch(err){
          const error = err.response.data
          Toast(error.message);
          
    
    
         }
         finally{
          setIsLoading(false)
         }
      }
    
      const Change_passowrd= async(e)=>{
        e.preventDefault()
    
         if(!newPassword ) return Toast("please fill new password")
         if( !validator.isStrongPassword(newPassword)) return Toast("password is not strong")
        var formdata = new FormData()
        formdata.append("new_psw",newPassword)
        formdata.append("old_psw",oldPassword)
        
         try{
          setIsLoading(true)
          const response= await axios({
            method: "post",
           url:'/change-password',
            data:formdata,
            headers: {
              Authorization:`Bearer ${userToken}`,
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
          Toast(error.message);
          
    
    
         }
         finally{
          setIsLoading(false)
         }
      }
   
  return (
    <>
        {isLoading && (<Loader />)}
        <div className="d-flex section-paddingY edit-profile-container container" >
        <div className='edit-profile-container-left'>
            <img src={userData.avatar}style={{marginBottom: '18px',objectFit:'contain'}} ></img>
            <div className='center-div'>
            <input  className="imageinput" type='file'  name="images"  onChange={e => setimages(e.target.files[0])}></input>
            </div>
            <h1 className="section-subheading" style={{marginBottom:0}}>{userData?.name}</h1>
            <p className="normal-text" style={{textAlign: 'center'}}>{userData?.email}</p>
        </div>
        <div className="edit-profile-container-right">

            <div className='editprofile-input'>
                <label>Name</label>
                <input  type='name' placeholder="Enter full name" name="name" value={name} onChange={e => onchange(e)}/>
            </div>
            <div className='editprofile-input'>
                <label>mobile</label>
                <input  type='Number' placeholder="Enter Mobile no " name="mobile" value={mobile} onChange={e => onchange(e)}/>
            </div>
            <div className='editprofile-input'>
                <label>email</label>
                <input  type='email' placeholder="Enter Email" name="email" value={email} onChange={e => onchange(e)}/>
            </div>

            <button className='themeButton' style={{    margin:' 1rem 0 1rem auto'}} onClick={edit_profile}>Save Changes</button>

            <h1 className="section-subheading" style={{textAlign:'left',marginTop:30}}> Chnage Password</h1>
            <div className='editprofile-input'>
                <label>Old Password</label>
                <input  type='text' placeholder="old Passowrd "  value={oldPassword} onChange={e =>setoldPassword(e.target.value)} />
            </div>
            <div className='editprofile-input'>
                <label>New Password</label>
                <input type='text' placeholder="new passowrd "  value={newPassword} onChange={e => setnewPassword(e.target.value)} />
            </div>
            <button className='themeButton' style={{    margin:' 1rem 0 1rem auto'}}  onClick={Change_passowrd}>Change Password</button>
        </div>




        </div>
        </>
   
  )
}

export default EditProfile