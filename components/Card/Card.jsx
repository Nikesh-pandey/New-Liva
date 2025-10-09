"use client"
import axios from "axios";
import React, { useEffect, useState } from 'react'
import { useStore } from "@/components/Store/Poststore";
import { useRouter } from 'next/navigation';
const Card = () => {
    const [ Data, setData]= useState([]);
    const [ filteredItems, setFilterItems]= useState([]);
    const {Cart,  RemoveProduct, HandleAdd, isLoggedin}=useStore();
    const Router= useRouter();

    useEffect(()=>{
        const fetchdata= async()=>{
            const response= await axios.get("https://fakestoreapi.com/products");
            console.log("this is data",response);
            setData(response.data);
        }
        fetchdata();
    },[])

    const HandleClick = (item) => {
      const isproductincart = Cart.some((product) => product.id === item.id);
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    
      console.log("isLoggedIn", isLoggedIn);
    
      if (isproductincart) {
        RemoveProduct(item);
      } else if (!isLoggedIn) {
        Router.push('/Register');
      } else {
        HandleAdd(item);
      }
    };
    
//     const HandleAdd=(item)=>{
// // console.log(item);
// let exist=false;
// for( let i=0;i<Cart.length;i++){
//   if(Cart[i].id===item.id)
//   {
//     exist=true;
//     break;
//   }
// }
// if(!exist){
//   setCart((Cart)=>[...Cart, item]);
  
//   // console.log(`Cart has ${Cart.length} items.`);
// }
// else
// {
//   console.log(`Product ${item.id} is already in cart`);
// }
// }
// useEffect(()=>{
//   console.log(`Cart has ${Cart.length} items.`);

// },[Cart]);

// const Removeproduct=(item)=>{
//   setCart((Cart)=> Cart.filter((product)=> item.id!== product.id)) // changes
//   console.log(`Cart has ${Cart.length} items.`);
// };

// const Removeproduct=(item)=>{
//   setCart((Cart)=> Cart.filter((product)=> item.id!== product.id))
//   console.log(`Cart has ${Cart.length} items.`);
// };

  useEffect(()=>{console.log(Cart)},[Cart]);


  
  const filterData=(value)=>{
    
    const filterdatass = Data.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
  );
  console.log(filterdatass)
  
  setFilterItems(filterdatass)
}
useEffect(()=>{
  filterData("");
},[])
    return(




  <div className="flex flex-wrap p-6 bg-gray-100 min-h-screen mt-20">



<div className="m-1 top-0">

            <input
            type="text"
            placeholder="Searchss..."
            className="px-4 py-2 rounded-md text-black-100 w-48 mt-20"
            onChange={(e) => filterData(e.target.value)}
            />  
                {filteredItems.map((item) => (
              <div key={item.id} className="p-4 border rounded-md mb-2">    
                <div
    key={item.id}
    className="w-64 bg-white rounded-xl shadow-md p-4 flex flex-col items-center hover:shadow-lg transition"
    >
<img
  src={product.image}
  alt={product.title}
  width={500}
  height={500}
/>

        
      <h3 className="text-md font-semibold text-center mb-3 h-16 overflow-hidden">
        {item.title}
      </h3>
             <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-950 transition"
      onClick={()=>{HandleClick(item)}}>
Add to button      </button>
    </div>  
    </div>
            ))}
</div>
        <div className="flex flex-wrap gap-6 justify-center p-6 bg-gray-100 min-h-screen mt-16">

  {Data.map((item) => (
    <div
    key={item.id}
    className="w-64 bg-white rounded-xl shadow-md p-4 flex flex-col items-center hover:shadow-lg transition"
    >
      <img
        src={item.image}
        alt={item.title}
        className="w-32 h-40 object-contain mb-4"

        />
        
      <h3 className="text-md font-semibold text-center mb-3 h-16 overflow-hidden">
        {item.title}
      </h3>              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-950 transition"
      onClick={()=>{HandleClick(item)}}>
Add to Cart      </button>
    </div>
  ))}
</div>
<div className="flex flex-wrap  justify-center p-6 bg-gray- h-10 mt-16">
{Cart.map((item) => (
  <div
  key={item.id}
  className="w-64 bg-white rounded-xl shadow-md p-4 flex flex-col items-center hover:shadow-lg transition"
  >
    <img
      src={item.image}
      alt={item.title}
      className="w-32 h-40 object-contain mb-4"
      />
    <h3 className="text-md font-semibold text-center mb-3 h-16 overflow-hidden">
      {item.title}
    </h3>
    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-950 transition"
    onClick={()=>{HandleClick(item)}}>
Remove From Cart    </button>
  </div>
))}
</div>
</div>
  
)
}

export default Card
// in line no 9( setData(response.data); this code response.data is the actual data i want where response holds all the data include header staus and all 
//in line 32 we passed argument as item as argument holds data always where as params always get reference of that so onClick={()=>{HandleAdd(item)}}> so we passed original data from here and after passing arg we pass value to params and using that value or params means just printing it inside function 
// simply we start assuming that we have made the item is not in array 





