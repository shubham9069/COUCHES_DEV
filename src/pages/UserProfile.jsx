import React,{useState} from 'react'
import EditProfile from './EditProfile'
import Address from './Address'

const UserProfile = () => {
    const [tab,settab] = useState(1)
  return (
    <div className="section-paddingX">
    <div className="d-flex" style={{gridGap:25}}>
        <h6 className="top-button" onClick={()=>settab(1)} style={tab==1 ?{color:'#02a89e'}:{}}>Edit profile </h6>
        <h6 className="top-button" >|</h6>
        <h6 className="top-button"  onClick={()=>settab(2) } style={tab==2 ?{color:'#02a89e'}:{}}>Address</h6>
        </div>
        {tab==1?
            <EditProfile />
            :
            <Address />
        }
        
        </div>
  )
}

export default UserProfile