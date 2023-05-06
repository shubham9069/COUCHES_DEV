import React from 'react'

const Aboutus = ({content,row}) => {
  const {title,sub_green,desc,sub_text} = content
   
  return (
    <div className="section-padding">

        <div className="container d-flex Aboutus-homepage" style={{gridGap:30,flexDirection: row}}>
        <div style={{flex:1}}>
        <img  src="https://www.miliashop.com/themes/leo_cool_stuff/img/modules/appagebuilder/images/Sketch_bottom_2.jpg"></img>
        </div>
        <div style={{flex:1}} className='Aboutus-homepage-right'>
        <p className="section-heading " style={{marginBottom:'0.5rem'}}> {title}</p>
        <p className="section-subheading"> <span style={{color: '#02a89e'}}>{sub_green}</span> {sub_text}</p>
      

        <p className='normal-text' style={{lineHeight:'35px'}}>{desc}</p>

        </div>
            
        </div>
    </div>
  )
}

export default Aboutus