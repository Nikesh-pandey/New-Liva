// "use client";

// import React, { useState } from "react";
// import axios from "axios";
// import { useStore } from '@/components/Store/Poststore';

// const Admin = () => {
//   const [product, setProduct] = useState({
//     name: "",
//     description: "",
//     type: "",
//     productPrice: "",
//   });
//   const{decode}=useStore();
//   console.log("This is Token in Admin:", decode);

//   const [image, setImage] = useState(null);


//   const handleInputChange = (e) => {
//     setProduct({
//       ...product,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };
// console.log("Image file:", image);
// console.log("Product DTO:", product);

//   // const handleSubmit = async (e) => {

//   //   const formData = new FormData();
//   //   formData.append("productDTO", JSON.stringify(product));
//   //   formData.append("imageFile", image);

//   //   try {
//   //     const response = await axios.post(
//   //       "http://10.13.173.3:4040/api/product/add",
//   //       formData,
//   //       {
//   //         headers: {
//   //           Authorization: `Bearer ${decode}`,
//   //         },
//   //       }
//   //     );
//   //     console.log("Product added successfully:", response.data);
//   //   } catch (error) {
//   //     console.error("Error adding product:", error);
//   //   }
//   // };
// const handleSubmit = async (e) => {
//   e.preventDefault();

//   // Ensure type is uppercase (optional)
//   const productToSend = { ...product, type: product.type.toUpperCase() };

//   const formData = new FormData();
//   formData.append("productDTO", JSON.stringify(productToSend));
//   formData.append("imageFile", image);

//   try {
//     const response = await axios.post(
//       "http://10.13.173.3:4040/api/product/add",
//       formData,
//       {
//         headers: {
//           Authorization: `Bearer ${decode}`,
//         },
//       }
//     );
//     console.log("Product added successfully:", response.data);
// alert("Product added successfully");
//     // Reset form after submit
//     setProduct({
//       name: "",
//       description: "",
//       type: "",
//       productPrice: "",
//     });
//     setImage(null);
//   } catch (error) {
//     console.error("Error adding product:", error);
//   }
// };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg space-y-6"
//         encType="multipart/form-data"
//       >
//         <h2 className="text-2xl font-bold text-center text-blue-600">Add New Product</h2>

//         <div>
//           <label className="block text-gray-700 font-medium mb-1">Name</label>
//           <input
//             type="text"
//             name="name"
//             value={product.name}
//             onChange={handleInputChange}
//             placeholder="Product Name"
//             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-gray-700 font-medium mb-1">Description</label>
//           <textarea
//             name="description"
//             value={product.description}
//             onChange={handleInputChange}
//             placeholder="Product Description"
//             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             required
//           ></textarea>
//         </div>
// <div>
//   <label className="block text-gray-700 font-medium mb-1">Type</label>
//   <select
//     name="type"
//     value={product.type}  
//     onChange={handleInputChange}
//     className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//     required
//   >
//     <option value="" disabled>
//       Select Product Type
//     </option>
//     <option value="BEAUTY">BEAUTY</option>
//     <option value="ELECTRONICS">ELECTRONICS</option>
//     <option value="CLOTHING">CLOTHING</option>
//   </select>
// </div>


//         <div>
//           <label className="block text-gray-700 font-medium mb-1">ProductPrice</label>
//           <input
//   type="text"
//   name="productPrice"  
//   value={product.productPrice}
//   onChange={handleInputChange}
//   placeholder="Product Price"
//   className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//   required
// />

//         </div>

//         <div>
//           <label className="block text-gray-700 font-medium mb-1">Image</label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageChange}
//             className="w-full p-2 border border-gray-300 rounded-lg bg-white"
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-200"
//         >
//           Add Product
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Admin;


// "use client";

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useStore } from "@/components/Store/Poststore";
// import { columns } from "@/components/Column"; // your column config
// import { DataTable } from "@/components/data-table"; // shadcn datatable

// const Admin = () => {
//   const [productList, setProductList] = useState([]);
//   const [product, setProduct] = useState({
//     name: "",
//     description: "",
//     type: "",
//     productPrice: "",
//   });

//   const { decode } = useStore();
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState(null);

//   // 🔁 Fetch user's submitted products
//   const fetchMyProducts = async () => {
//     try {
//       const response = await axios.get("http://10.13.173.3:4040/api/product/myproducts", {
//         headers: {
//           Authorization: `Bearer ${decode}`,
//         },
//       });

//       console.log("This is data from kuire",response.data);
//             console.log("This is data from kuire",response.message);

//       setProductList(response.data); 
//     } 
    
//   catch (error) {
//   if (error.response) {
//     console.error("Detail:", error.response.data.detail);
//     console.error("Description:", error.response.data.properties?.description);
//   } else {
//     console.error("Error:", error.message);
//   }
// }

//   };

//   useEffect(() => {
//     fetchMyProducts();
//   }, [decode]);

//   const handleInputChange = (e) => {
//     setProduct({ ...product, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setImage(file);

//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const productToSend = { ...product, type: product.type.toUpperCase() };

//     const formData = new FormData();
//     formData.append("productDTO", JSON.stringify(productToSend));
//     formData.append("imageFile", image);

//     try {
//       await axios.post("http://10.13.173.3:4040/api/product/add", formData, {
//         headers: {
//           Authorization: `Bearer ${decode}`,
//         },
//       });

//       alert("Product added successfully");

//       // 🔁 Re-fetch products after submission
//       fetchMyProducts();

//       // Reset form
//       setProduct({
//         name: "",
//         description: "",
//         type: "",
//         productPrice: "",
//       });
//       setImage(null);
//       setPreview(null);
//     } catch (error) {
//       console.error("Error adding product:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-4 space-y-10">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded-xl shadow-md max-w-xl mx-auto space-y-6"
//         encType="multipart/form-data"
//       >
//         <h2 className="text-2xl font-bold text-center text-blue-600">Add Product</h2>

//         <input
//           type="text"
//           name="name"
//           value={product.name}
//           onChange={handleInputChange}
//           placeholder="Product Name"
//           className="w-full p-3 border rounded"
//           required
//         />

//         <textarea
//           name="description"
//           value={product.description}
//           onChange={handleInputChange}
//           placeholder="Description"
//           className="w-full p-3 border rounded"
//           required
//         />

//         <select
//           name="type"
//           value={product.type}
//           onChange={handleInputChange}
//           className="w-full p-3 border rounded"
//           required
//         >
//           <option value="">Select Type</option>
//           <option value="BEAUTY">Beauty</option>
//           <option value="ELECTRONICS">Electronics</option>
//           <option value="CLOTHING">Clothing</option>
//         </select>

//         <input
//           type="text"
//           name="productPrice"
//           value={product.productPrice}
//           onChange={handleInputChange}
//           placeholder="Price"
//           className="w-full p-3 border rounded"
//           required
//         />

//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleImageChange}
//           className="w-full p-2 border rounded"
//           required
//         />

//         {preview && (
//           <img src={preview} alt="Preview" className="w-full h-auto rounded mt-2" />
//         )}

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
//         >
//           Add Product
//         </button>
//       </form>

//       {productList.length > 0 && (
//         <div className="bg-white p-4 rounded-xl shadow max-w-5xl mx-auto">
//           <h3 className="text-xl font-semibold mb-4">My Products</h3>
//           <DataTable columns={columns} data={productList} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Admin;

"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import {columns} from "@/components/Column"
import { DataTable } from "@/components/data-table";
import { useStore } from "@/components/Store/Poststore";
import { create } from "zustand";
const Admin = () => {
  const [productList, setProductList] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    type: "",
    productPrice: "",
  });

  const { decode } = useStore(); // auth token
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleInputChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productToSend = { ...product, type: product.type.toUpperCase() };

    const formData = new FormData();
    formData.append("productDTO", JSON.stringify(productToSend));
    formData.append("imageFile", image);

    try {
      await axios.post("http://172.16.29.53:4040/api/product/add", formData, {
        headers: {
          Authorization: `Bearer ${decode}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Product added successfully");
      fetchMyProducts();

      setProduct({
        name: "",
        description: "",
        type: "",
        productPrice: "",
      });
      setImage(null);
      setPreview(null);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };


  // Fetch products from API
  const fetchMyProducts = async () => {
    try {
      const response = await axios.get(
        "http://172.16.29.53:4040/api/product/myproducts",
        {
          headers: {
            Authorization: `Bearer ${decode}`,
          },
        }
      );
      setProductList(response.data);
    } catch (error) {
      if (error.response) {
        console.error(
          "Detail:",
          error.response.data?.detail || "No detail available"
        );
        console.error(
          "Description:",
          error.response.data?.properties?.description || "No description"
        );
      } else if (error.request) {
        console.error("No response from server:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  useEffect(() => {
    if (decode) fetchMyProducts();
  }, [decode]);


// Columns with image rendering
  const columns = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "type",
      header: "Type",
    },
    {
      accessorKey: "productPrice",
      header: "Price",
    },
    {
      accessorKey: "imageName", // this should match the key in your product object containing the image filename
      header: "Image",
      cell: ({ row }) => {
        const imageName = row.getValue("imageName");
        const imageUrl = imageName
          ? `http://172.16.29.53:4040/api/image/${imageName}`
          : "/placeholder-image.png"; 

        return (
          <img
            src={imageUrl}
            alt="Product"
            style={{
              width: 50,
              height: 50,
              objectFit: "cover",
              borderRadius: 6,
            }}
          />
        );
      },
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4 space-y-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md max-w-xl mx-auto space-y-6"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600">
          Add Product
        </h2>

        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleInputChange}
          placeholder="Product Name"
          className="w-full p-3 border rounded"
          required
        />

        <textarea
          name="description"
          value={product.description}
          onChange={handleInputChange}
          placeholder="Description"
          className="w-full p-3 border rounded"
          required
        />

        <select
          name="type"
          value={product.type}
          onChange={handleInputChange}
          className="w-full p-3 border rounded"
          required
        >
          <option value="">Select Type</option>
          <option value="BEAUTY">Beauty</option>
          <option value="ELECTRONICS">Electronics</option>
          <option value="CLOTHING">Clothing</option>
        </select>

        <input
          type="text"
          name="productPrice"
          value={product.productPrice}
          onChange={handleInputChange}
          placeholder="Price"
          className="w-full p-3 border rounded"
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 border rounded"
          required
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-auto rounded mt-2"
          />
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
        >
          Add Product
        </button>
      </form>

      {productList.length > 0 && (
        <div className="bg-white p-4 rounded-xl shadow max-w-5xl mx-auto">
          <h3 className="text-xl font-semibold mb-4">My Products</h3>
          <DataTable columns={columns} data={productList} />
        </div>
      )}
    </div>
  );
};



export default Admin;
