import React from 'react'

const History = ({content}) => {
  const {title,sub_green,sub_text} = content
  return (
    <div className=" section-padding " style={{background:'#FAFAFA'}} >
      <div className="history " style={{marginBottom:22}}>
        <p className="section-heading" style={{marginBottom:'0.5rem'}}> {title}</p>
        <p className="section-subheading"> <span style={{color: '#02a89e'}}>{sub_green}</span> {sub_text}</p>
      </div>

      <div className="container">
        <p className='normal-text' style={{textAlign: 'center',}}><strong>MILIA</strong> is a modern and dynamic company, specialized in the care of the <strong>interiors</strong> and <strong>exteriors</strong> of the house. With over 10,000 square meters of furniture and interior design ideas, Milia presents a vast catalog of items for <strong>furniture, kitchen, bathroom, office, lighting </strong> and much more. Since we first opened in 1988, we pride ourselves on our standard of excellence. Our success is also based on the careful selection of brands:
<strong>Cassina, B&B Italia, Baxter, Flexform, Poltrona Frau, Vitra, Knoll</strong> and much more.
Making all customers feel welcome and assisting them in every step of the process is what made MILIAshop great!</p>
        
      </div>
      
    </div>
  )
}

export default History