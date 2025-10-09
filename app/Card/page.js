  // "use client"
  // import axios from "axios";
  // import React, { useEffect, useState } from 'react'
  // import { useStore } from "@/components/Store/Poststore";
  // import { useRouter } from 'next/navigation';
  // import Newsection from "@/components/Newsection/Newsection";
  // const Card = () => {

  //     const [ Data, setData]= useState([]);
  //     const [ filteredItems, setFilterItems]= useState([]);
  //     const [isLoggedIn, setIsLoggedIn] = useState(false);
  //     const {Cart,  RemoveProduct, HandleAdd, isLoggedin}=useStore();
  //     const Router= useRouter();
  //   const{token,HandleClick}=useStore();

  //   function onAddToCartClick(item, decode) {
  //   HandleClick(item, decode);
  // }
  // console.log("This is the Card token",token)

  // console.log("checking the data",Data);


  // //   const fetchdata = async () => {
  // //     try {
  // //       const response = await axios.get("http://10.13.173.3:4040/api/product", {
  // //         headers: {
  // //           Authorization: `Bearer ${token}`,
  // //         },
  // //       });
  // //       console.log("Fetched products:", response.data);
  // //       setData(response.data);
  // //     } catch (error) {
  // //       console.error("Error fetching products:", error);
  // //     }
  // //   };
  // //   fetchdata();
  // // }, []);

      

  // useEffect(() => {
  //   const fetchdata = async () => {
  //     try {
  //       const productResponse = await axios.get("http://10.13.173.3:4040/api/product/all", {
  //         headers: {
  //         },
  //       });

  // console.log("I am sending this token to backend",token);
  //       const product = productResponse.data;
  //       console.log("This is product",product);
  //       const Data = await Promise.all(
  //         product.map(async (product) => {
  //           try {
  //             const imageRes = await axios.get(`http://10.13.173.3:4040/api/image/${product.imageName}`, {
  //               responseType: 'blob', 
  //             });
  //             console.log("this is for image",imageRes)
  //             const imageUrl = URL.createObjectURL(imageRes.data);
  //             return { ...product, imageUrl }; 
  //           } catch (err) {
  //             console.error(`Failed to fetch image for ${product.imageName}`, err);
  //             return { ...product, imageUrl: null };
  //           }
  //         })
  //       );

  //       setData(Data);
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //     }
  //   };

  //   fetchdata();
  // }, []);


  //     return(

  // <>
  // <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 mt-28">
  //   {Data.slice().reverse().map((item) => (
  //     <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
  //     <img src={item.imageUrl} alt={item.name} className="w-full h-48 object-cover" />

  //       <div className="p-6 space-y-2">
  //         <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
  //         <p className="text-gray-600 text-sm">{item.description}</p>
  //         <p className="text-sm text-blue-500 font-medium">Type: {item.type}</p>
  //         <p className="text-lg font-semibold text-green-600">Rs. {item.productPrice}</p>
  //         <a href=""
  //           onClick={() => onAddToCartClick(item,decode)}
  //           className="mt-3 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
  //         >
  // View Product   
  // </a>
  //       </div>
  //     </div>
  //   ))}
  // </div>
  // </>

  // )
  // }

  // export default Card


  // // in line no 9( setData(response.data); this code response.data is the actual data i want where response holds all the data include header staus and all 
  // //in line 32 we passed argument as item as argument holds data always where as params always get reference of that so onClick={()=>{HandleAdd(item)}}> so we passed original data from here and after passing arg we pass value to params and using that value or params means just printing it inside function 
  // // simply we start assuming that we have made the item is not in array 



"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useStore } from "@/components/Store/Poststore";
import { useRouter } from "next/navigation";

const Card = () => {
  const [Data, setData] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const { token ,setSelectedProduct} = useStore();
  const Router = useRouter();
console.log(Data)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await axios.get("http://172.16.29.53:4040/api/product/all");

        const productList = productResponse.data;

        const DataWithImages = await Promise.all(
          productList.map(async (product) => {
            try {
              const imageRes = await axios.get(`http://172.16.29.53:4040/api/image/${product.imageName}`, {
                responseType: "blob",
              });
              const imageUrl = URL.createObjectURL(imageRes.data);
              return { ...product, imageUrl };
            } catch (err) {
              console.error(`Failed to fetch image for ${product.imageName}`, err);
              return { ...product, imageUrl: null };
            }
          })
        );

        setData(DataWithImages);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
    
    };

    if (token) {
      fetchCart();
    }
  }, [token]);

const addToCartAPI = async (item) => {
  try {
    const postData = {
      "productId": item.id,
      "quantity": 1,
    };

    console.log("Sending to API:", postData);

    const response = await axios.post("http://172.16.29.53:4040/api/cartItems/item/add", postData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("API response:", response.data);
    alert("Item added to cart successfully");
  } catch (error) {
    console.error("Error adding item to cart:", error.response?.data || error.message || error);
    alert("You are not Registered.");
    Router.push("/Register")
  }
};



  const removeFromCartAPI = async (itemId) => {
    try {
await axios.delete(
  'http://10.13.173.3:4040/api/cartItems/item/delete/{cartId}/{productId}',
 
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);


      alert("Item removed from cart");
      console.log("The reduced item is",itemId);
      setCartItems((prev) => prev.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error("Error removing item from cart", error);
    }
  };

  const onAddToCartClick = async (item) => {
    const alreadyInCart = cartItems.some((cartItem) => cartItem.id === item.id);
    if (alreadyInCart) {
      alert("Item already in cart");
    } else {
      await addToCartAPI(item);
      setCartItems((prev) => [...prev, item]);
    }
  };

  return (
    <>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 mt-28">
      {Data.slice().reverse().map((item) => (
        <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
          <img src={item.imageUrl} alt={item.name} className="w-full h-48 object-cover" />
          <div className="p-6 space-y-2">
            <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
            <p className="text-gray-600 text-sm">{item.description}</p>
            <p className="text-sm text-blue-500 font-medium">Type: {item.type}</p>
            <p className="text-lg font-semibold text-green-600">Rs. {item.productPrice}</p>
<button
  onClick={() => {
    setSelectedProduct(item);
    Router.push(`/ProductDetail/${item.id}`);
  }}
  className="mt-3 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
>
  View Product
</button>

          </div>
        </div>
      ))}
    </div>

  
    </>
  );
};


export default Card;
