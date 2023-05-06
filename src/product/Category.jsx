import React, { useContext, useEffect, useMemo, useState } from "react";
import History from "../Homepage/History";
import { Link,useNavigate,useLocation,useParams } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import Slider from "@mui/material/Slider";

import { Add_to_cart,remove_cart } from '../Function'
import axios from "../axios";
import Toast from "../Toast";


export const Category = () => {
    const [isLoading,setIsLoading] = useState(true);
    const navigate =useNavigate()
    const location = useLocation()
    const {id} = useParams()
    const {Catagory,cart,userToken,dispatch } = useContext(AuthContext);
    const [All_Product_Page,setAll_product_page] = useState([])
    const [range, setRange] = useState([2000, 150000]);
    const [CatagorySort, setCatagorySort] = useState({
      size: [],
      style: [],
      medium: [],
      artists: [],
    });
    const [SortArr, setSortArr] = useState([" "]);
    const item_per_page =8
    const [previndex,setPrevIndex] = useState(0)
    const [nextindex,setNextIndex] = useState(item_per_page);
    const [currentpage,setCurrentPage] = useState(1)
    
  
    // ===========price bar minmax===========
  
    const MinMax = (value) => {
      var updateArr = All_Product_Page;
  
      var min = updateArr[0]?.price;
      var max = updateArr[0]?.price;
  
      updateArr.forEach((element, i) => {
        if (min > element.price) {
          min = element.price;
        }
        if (max < element.price) {
          max = element.price;
        }
      });
      return value == "min" ? min : max;
    };
  
    const debounce = (func, delay) => {
      let timer;
      return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          func(...args); // func.apply(null,args)
        }, delay);
      };
    };
  
    // --------------------filret for price bar ------------------
  
    const getdata = (value) => {
      // setCatagorySort({size:[],style:[],medium:[]})
  
      var updateArr = All_Product_Page;
  
      var data = updateArr?.filter((element) => {
        return (
          value[0] <= Number(element.price) && Number(element.price) <= value[1]
        );
      });
  
      setSortArr(data);
    };
    const HandleRange = (e) => {
      setRange(e.target.value);
      filterByPrice(e.target.value);
    };
  
    const filterByPrice = debounce((value) => getdata(value), 600);
  
    // --------------------onchanage for checkbox -----------
  
    const handleCatagoryChange = (e) => {
      if (e.target.checked) {
        console.log("hello");
        setCatagorySort({
          ...CatagorySort,
          [e.target.name]: [...CatagorySort[e.target.name], e.target.value],
        });
      } else {
        console.log("hjrllo");
        var data = CatagorySort[e.target.name]?.filter((element) => {
          return element != e.target.value;
        });
  
        setCatagorySort({ ...CatagorySort, [e.target.name]: data });
      }
    };
  
    // ------------------filter for  Category --------------
  
    const filterCatagory = () => {
      setRange([2000, 150000]);
      // console.log("hello cdchdccd")
      var updateArr = All_Product_Page;
  
      if (CatagorySort.medium.length) {
        updateArr = updateArr?.filter((element) => {
          // console.log(CatagorySort?.medium +  element?)
          return CatagorySort?.medium.includes(element?.medium.toString());
        });
      }
      if (CatagorySort.size.length) {
        updateArr = updateArr?.filter((element) => {
          return CatagorySort?.size.includes(element?.size.toString());
        });
      }
      if (CatagorySort.style.length) {
        updateArr = updateArr?.filter((element) => {
          return CatagorySort?.style.includes(element?.style.toString());
        });
      }
      if (CatagorySort.artists.length) {
        updateArr = updateArr?.filter((element) => {
          return CatagorySort?.artists.includes(element?.artist_id.toString());
        });
      }
      setSortArr(updateArr);
    };
  
    useEffect(() => {
      if (All_Product_Page?.length) {
        filterCatagory();
      }
    }, [CatagorySort]);

    useEffect(() => {
      setSortArr(All_Product_Page);
    }, [All_Product_Page]);
  
    var history1 = {
      title: "Furniture",
      sub_green: "EXPANSION",
      sub_text: "Are you looking for a piece of design",
    };
  
    
    const paginationPrev =()=>{
  
      if(currentpage>1){
        setCurrentPage(currentpage-1)
      }
  
     
  
    }
    const paginationNext =()=>{
      if(currentpage <Math.ceil(SortArr.length/item_per_page)){
        setCurrentPage(currentpage+1)
      }
      
     
  
    }
  
    const pagination = useMemo(()=>{
      const indexOfLastPost = item_per_page*currentpage
      const indexOfFirstPost = indexOfLastPost - item_per_page;
      
  
  setNextIndex(indexOfLastPost)
  setPrevIndex(indexOfFirstPost)
  
    },[currentpage])

  const get_details = async (url,type) => {
    
    try {
      const response = await axios({
        method: "get",
        url: url,
      });

      if (response.status === 200) {
        const data = response?.data;
        if(type=="category"){
            setAll_product_page(data?.products)
          
          
        }
        // else{
        //   setHomepage((p)=>({...p,["Recommended"]:data?.products}))
        // }
       

        //   Toast(data.message,response.status)
      }
    } catch (err) {
      const error = err?.response?.data;
      Toast(error?.message);
    }
    finally{
      setIsLoading(false);
    }
  };


  useEffect(()=>{
    get_details(`/get_products_by_category?cat_id=${id}`,'category')
    // !Recommended?.length? get_details('/get_recommanded_products'):setIsLoading(false)
    
  },[id])
  
    return (
      <div className="">
        <div className="product-top">
          <History content={history1} />
        </div>
  
        <div className="product-bottom section-padding">
          <div className="product-bottom-left ">
            <h1 className="section-heading" style={{ marginBottom: "1.5rem" }}>
              {" "}
              CATALOG
            </h1>
  
            <div>
              <h2
                className=""
                style={{
                  textAlign: "left",
                  margin: "1rem 0",
                  fontSize: 16,
                  fontWeight: 300,
                }}
              >
                {" "}
                Price Range
              </h2>
              <div className="custom-control custom-checkbox product-filter-input">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <h6>Range</h6>
                  <span
                    style={{ fontSize: 14, fontWeight: 600, color: "#5e5e5e" }}
                  >
                    ₹{MinMax("min")} - ₹{MinMax("max")}
                  </span>
                </div>
                <form className="rangeForm">
                  <Slider
                    getAriaLabel={() => "Temperature range"}
                    value={range}
                    onChange={HandleRange}
                    min={MinMax("min")}
                    max={MinMax("max")}
                  />
                </form>
                <span style={{ fontSize: 14 }}>
                  Upto ₹ {range[0] + "-" + range[1]}
                </span>
              </div>
            </div>
            <div>
              <h2
                className=""
                style={{
                  textAlign: "left",
                  margin: "1rem 0",
                  fontSize: 16,
                  fontWeight: 300,
                }}
              >
                {" "}
                Mediums
              </h2>
              {Catagory?.mediums?.map((element) => {
                return (
                  <>
                    <input
                      type="checkbox"
                      id="vehicle1"
                      
                      name="medium" value={element?.id} onChange={handleCatagoryChange}
                    />
                    <label
                      for="vehicle1"
                      style={{
                        marginLeft: 8,
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#5e5e5e",
                        marginBottom: 3,
                      }}
                    >
                      {element?.medium}{" "}
                    </label>
                    <br />
                  </>
                );
              })}
            </div>
            <div>
              <h2
                className=""
                style={{
                  textAlign: "left",
                  margin: "1rem 0",
                  fontSize: 16,
                  fontWeight: 300,
                }}
              >
                {" "}
                Sizes
              </h2>
              {Catagory?.sizes?.map((element) => {
                return (
                  <>
                    <input
                      type="checkbox"
                      id="vehicle1"
                      name="size" value={element?.id} onChange={handleCatagoryChange}
                    />
                    <label
                      for="vehicle1"
                      style={{
                        marginLeft: 8,
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#5e5e5e",
                        marginBottom: 3,
                      }}
                    >
                      {element?.size}{" "}
                    </label>
                    <br />
                  </>
                );
              })}
            </div>
            <div>
              <h2
                className=""
                style={{
                  textAlign: "left",
                  margin: "1rem 0",
                  fontSize: 16,
                  fontWeight: 300,
                }}
              >
                {" "}
                Style
              </h2>
              {Catagory?.styles?.map((element) => {
                return (
                  <>
                    <input
                      type="checkbox"
                      id="vehicle1"
                      name="style" value={element?.id} onChange={handleCatagoryChange} 
                    />
                    <label
                      for="vehicle1"
                      style={{
                        marginLeft: 8,
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#5e5e5e",
                        marginBottom: 3,
                      }}
                    >
                      {element?.style}{" "}
                    </label>
                    <br />
                  </>
                );
              })}
            </div>
          </div>
          <div className="product-bottom-right">
            <p className="normal-text" style={{ marginBottom: "2rem" }}>
              <i class="bi bi-house-door-fill"></i> &nbsp; / &nbsp; {location?.pathname.slice(1)}
            </p>
            <div className="product-bottom-container">
              {SortArr?.slice(previndex,nextindex)?.map((element) => {
                return (
                  <Link
                    to={"/productDetails/" + element?.product_id}
                    className="link-a"
                  >
                    <div className="product-bottom-img">
                    {cart?.some((item)=>{
                        
                        return element.product_id==item?.product?.product_id
  
                    })
                    ?
                    <div className="product-bottom-hover-icon" onClick={(e)=>{e.preventDefault();remove_cart(element,userToken,dispatch)}}>
                        <i class="bi bi-cart-fill"></i>
                      </div>
                      :
                      <div className="product-bottom-hover-icon" onClick={(e)=>{e.preventDefault();Add_to_cart(element,navigate,location,userToken,dispatch)}}>
                        <i class="bi bi-cart"></i>
                      </div>
                    }
  
                      
                      <img
                        src={element?.images?.length ? element.images[0] : null}
                      ></img>
                    </div>
                    <p className="normal-text" style={{ marginBottom: 5 }}>
                      {element?.name}
                    </p>
                    <p className="normal-text" style={{ fontWeight: 700 }}>
                      &#8377; {element?.price}
                    </p>
                  </Link>
                );
              })}
            </div>
            <div className="product-bottom-right-pagination ">
              <div className="center-div" onClick={paginationPrev}>
                {" "}
                <i class="bi bi-chevron-left" ></i>{" "}
              </div>
              
              {[...Array(Math.ceil(SortArr?.length/item_per_page))]?.map((a,index)=>{
                
                return <div className="center-div" onClick={()=>setCurrentPage(index+1)} 
                style={index+1 == currentpage ? {backgroundColor:' #21bdb2', color:'white',border:'1px solid #21bdb2'}: {color:'rgb(84, 84, 84)'}}
                > 
                {index+1} </div>
              })}
              <div className="center-div" onClick={paginationNext}>
                {" "}
                <i class="bi bi-chevron-right"></i>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
