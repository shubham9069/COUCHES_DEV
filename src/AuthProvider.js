import {createContext,useEffect,useState,useReducer} from "react";
import axios from "./axios";
import Loader from "./pages/Loader";
import Toast from "./Toast";
import { Link,useNavigate,useLocation } from "react-router-dom";


export const AuthContext = createContext({})

const AuthProvider = ({children}) => {
 
    const [userToken, setUserToken] = useState("")
    const [userData, setUserData] = useState("")
    const [All_Product_Page,setAll_Product_Page ] = useState([]);
    const [Catagory,setCatagory ] = useState({mediums:[],styles:[],sizes:[],artists:[]});
    const [homepage,setHomepage] = useState({
      Banner:[],
      offer:[],
      Recommended:[]
    })
   
    const [CategoryData ,setCategoryData] = useState([])
  
    const [isLoading,setIsLoading]=useState(true)

    const reducer = (state, action) => {
      console.log('hello')
      switch (action.type) {
          case 'cartItem': return action.value 
          case 'addtocart': {
            var data =[...state]
              data?.push(action.value)
              return data

          }
          case 'updatecart': {
                var arr=[]
            var data = state?.forEach((element)=>{
              
              if(element?.product?.product_id == action.value?.id){
                var updateqty = element?.qty+action.value.qty

                if(updateqty>0){
                  arr.push({...element,qty:updateqty})
                }

              }else{
                arr.push(element)
              }
             
            })
            return arr
          }
          case 'removecart': {
           return state?.filter(element=>element.product?.product_id !=action.value)

          }
          case 'reset': return []
          default:return state
      }
      
  }
    const [cart, dispatch] = useReducer(reducer, []);



  const get_all= async(url,type) =>{

    try{
      setIsLoading(true)
      const response= await axios({
        method: "get",
       url:url,
       })
       
       if(response.status===200){
        const data = response.data;

        switch(type){
          case 'product': 
          setAll_Product_Page(data.products);
          setCatagory((p)=>({...p,["mediums"]:data.mediums}));
          setCatagory((p)=>({...p,["styles"]:data.styles}));
          setCatagory((p)=>({...p,["sizes"]:data.sizes}));
          setCatagory((p)=>({...p,["artists"]:data.artists}));

          return;
          case 'category':
            setCategoryData(data?.categories)
          return ;
        }
        
      //   Toast(data.message,response.status)
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

    useEffect(()=>{

      get_all('/get_all_products','product')
    
      get_all('/get_all_categories','category')
    },[])







  return (
    <>
    {isLoading&&(<Loader/>)}
  <AuthContext.Provider value={{userToken,setUserToken,cart,dispatch,userData,setUserData,setAll_Product_Page,All_Product_Page,Catagory,CategoryData,homepage,setHomepage}}>
        {children}
        </AuthContext.Provider>

    </>
  )
}

export default AuthProvider