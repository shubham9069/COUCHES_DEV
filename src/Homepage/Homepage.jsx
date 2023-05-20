import React ,{useContext} from 'react'

import Banner from './Banner'
import Aboutus from './Aboutus'
import CategoryBox from './CategoryBox'
import Collection from './Collection'
import DiscoverNow from './DiscoverNow'
import History from './History'
import Footerbox from './Footerbox'
import Footer from './Footer'
import { AuthContext } from '../AuthProvider'



const Homepage = () => {
  const {CategoryData,All_Product_Page} = useContext(AuthContext)


    var discover1={
        title:"CATEGORY" ,
        desc:"Discover all the new products and design furniture presented at the Salone del Mobile 2022.",
        sub_green:"DEO SALOON",
        sub_text:"2023"
      }
      var discover2={
        title:"IN STOCK" ,
        desc:"Discover the selection of thousands of products Ready for Shipping at Discounted Prices",
        sub_green:"READY",
        sub_text:"TOP PRODUCTS"
      }
      
      var history1={
        title:"HISTORY OF A PASSION",
        sub_green:"EXPANSION",
        sub_text:"IN FULL SWING"
      }
      var history2={
        title:"INTERIOR DESIGN SERVICE",
        sub_green:"NO CHALLENGE",
        sub_text:"IS TOO DIFFICULT FOR US"
      }

      var Aboutus1={
        title:"ABOUT US" ,
        desc:"Over the past 30 years we have reinvented the definition of furniture store. We strive to make our clients experience a personal one, from the moment they walk through the door appointing them to an experienced interior designer. Making all clients feel welcome and assisting them every step of the way is what has distinguished our business from the rest.Benvenuti in Italia!",
        sub_green:"MILIVA",
        sub_text:" LIVING HOME"
      }
      var Aboutus2={
        title:"LIGITING" ,
        desc:"Over the past 30 years we have reinvented the definition of furniture store. We strive to make our clients experience a personal one, from the moment they walk through the door appointing them to an experienced interior designer. Making all clients feel welcome and assisting them every step of the way is what has distinguished our business from the rest.Benvenuti in Italia!",
        sub_green:"PROJECTING ",
        sub_text:"AND CONSULTING"
      }


  return (
    <>
    <Banner />
<DiscoverNow content={discover1} dataArr={CategoryData} />
<History content={history1}/>
<Collection />
<DiscoverNow content={discover2} dataArr={All_Product_Page} type={"product"} row={"row"} />
<Aboutus content={Aboutus2} row={"row-reverse"}/>
<DiscoverNow content={discover2} dataArr={All_Product_Page} type={"product"} row={"row-reverse"}  />
<History content={history2}/>
<CategoryBox />
<Aboutus content={Aboutus1} row={"row"}/>
<Footerbox />


    </>
  )
}

export default Homepage