"use client";
import React from "react";
import { useStore } from "@/components/Store/Poststore";
import { Trash2, Plus, Minus } from "lucide-react";

const MyIcon = () => {
  const Cart = useStore((state) => state.cartdata || []);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const updateQuantity = useStore((state) => state.updateQuantity);

  const handleIncrement = (item) => {
    const newQty = (item.quantity || 1) + 1;
    updateQuantity(item.id, newQty);
  };

  const handleDecrement = (item) => {
    const newQty = (item.quantity || 1) - 1;
    if (newQty < 1) return;
    updateQuantity(item.id, newQty);
  };

  return (
    <div className="flex flex-wrap justify-center p-6 bg-gray-100 h-auto mt-40 gap-6">
      {Cart.length === 0 ? (
        <p className="text-lg font-semibold text-center w-full mt-10">
          Nothing in Cart
        </p>
      ) : (
        Cart.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="w-64 bg-white rounded-xl shadow-md p-4 flex flex-col items-center hover:shadow-lg transition relative"
          >
            <img
              src={item.imageUrl || item.image}
              alt={item.name || item.title}
              className="w-32 h-40 object-contain mb-4"
            />
            <h3 className="text-md font-semibold text-center mb-1 h-16 overflow-hidden">
              {item.name || item.title}
            </h3>

            <div className="flex items-center gap-3 my-2">
              <button
                onClick={() => handleDecrement(item)}
                className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded text-lg"
              >
                <Minus size={16} />
              </button>
              <span className="text-md font-medium">{item.quantity || 1}</span>
              <button
                onClick={() => handleIncrement(item)}
                className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded text-lg"
              >
                <Plus size={16} />
              </button>
            </div>

            {/* Delete Icon */}
            <button
              onClick={() => removeFromCart(item.id)}
              className="absolute top-2 right-2 text-red-600 hover:text-red-800"
              title="Remove from cart"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default MyIcon;
