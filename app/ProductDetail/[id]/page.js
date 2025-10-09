
"use client";

import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/components/Store/Poststore";

const ProductDetail = () => {
  const product = useStore((state) => state.selectedProduct);
  const { token } = useStore();
  const { decode } = useStore();
  const tryAddToCart = useStore((state) => state.tryAddToCart);
  const removeFromCartStore = useStore((state) => state.removeFromCart);
  const router = useRouter();

  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [cartId, setCartId] = useState(null);
  const [cartItemId, setCartItemId] = useState(null);

  if (!product) return <div>Product not found</div>;

  const addToCartAPI = async () => {
    if (!token) {
      alert("Please login first");
      router.push("/Register");
      return;
    }

    const added = tryAddToCart({ ...product, quantity });
    if (!added) {
      alert("Item is already in the cart.");
      return;
    }

    try {
      const postData = {
        productId: product.id,
      };
      const response = await axios.post(
        "http://172.16.29.53:4040/api/cartItems/item/add",
        postData,
        {
          headers: {
            Authorization: `Bearer ${decode}`,
          },
        }
      );

      console.log("API response:", response.data);
      setCartId(response.data.cartId);
      setCartItemId(response.data.cartItemId);

      alert("Item added to cart successfully");
      setAddedToCart(true);
    } catch (error) {
      console.error("Error adding item to cart:", error.response?.data || error.message);
      alert("You are not Registered.");
      router.push("/Register");
    }
  };

  const removeFromCartAPI = async () => {
    if (!cartId) {
      alert("Cart ID is not available.");
      return;
    }

    try {
      const response = await axios.delete(
        `http://172.16.29.53:4040/api/cartItems/item/delete/${cartId}/${product.id}`,
        {
          headers: {
            Authorization: `Bearer ${decode}`,
          },
        }
      );

      alert("Item removed from cart");
      console.log("Deleted item response:", response.data);

      removeFromCartStore(product.id);
      setAddedToCart(false);
      setQuantity(1);
      setCartId(null);
      setCartItemId(null);
    } catch (error) {
      console.error("Error removing item from cart", error);
      alert("Something went wrong while removing item from cart.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-28 p-6 bg-white rounded-lg shadow-lg">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-96 object-cover rounded-lg"
      />

      <h2 className="text-3xl font-bold mt-4">{product.name}</h2>
      <p className="text-gray-600 mt-2">{product.description}</p>
      <p className="text-blue-500 mt-1">Type: {product.type}</p>
      <p className="text-green-600 text-2xl font-semibold mt-2">
        Rs. {product.productPrice}
      </p>

      <div className="flex items-center gap-4 mt-4">
        <button
          className="bg-gray-300 px-3 py-1 rounded"
          onClick={() => setQuantity((q) => Math.max(q - 1, 1))}
          disabled={quantity <= 1}
        >
          -
        </button>
        <span className="text-lg font-semibold">{quantity}</span>
        <button
          className="bg-gray-300 px-3 py-1 rounded"
          onClick={() => setQuantity((q) => q + 1)}
        >
          +
        </button>
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={addToCartAPI}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          disabled={addedToCart}
        >
          Add to Cart
        </button>

        <button
          onClick={removeFromCartAPI}
          className={`px-6 py-2 rounded-lg ${
            addedToCart
              ? "bg-red-600 text-white hover:bg-red-700"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
          disabled={!addedToCart}
        >
          Remove from Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;

