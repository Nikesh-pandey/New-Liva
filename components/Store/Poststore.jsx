// import { create } from 'zustand';

// export const useStore = create((set, get) => ({
//   cartdata: [],
//   userData: null,
//   formData: null,
//   selectedProduct: null,
//   token: null,
//   decode: null,
// const tryAddToCart = useStore((state) => state.tryAddToCart);

//   setSelectedProduct: (product) => set({ selectedProduct: product }),
//   setUserData: (data) => set({ userData: data }),
//   setItemData: (data) => set({ formData: data }),
//   setToken: (newToken) => set({ token: newToken }),
//   setDecode: (newDecode) => set({ decode: newDecode }),
//   clearToken: () => set({ token: null }),

//   addTocart: (item) => set((state) => ({ cartdata: [...state.cartdata, item] })),

//   tryAddToCart: (item) => {
//     const { cartdata } = get();
//     const exists = cartdata.some((cartItem) => cartItem.id === item.id);
//     if (exists) return false; // item already exists, don't add
//     set({ cartdata: [...cartdata, item] });
//     return true; // item added successfully
//   },

//   removeFromCart: (id) =>
//     set((state) => ({
//       cartdata: state.cartdata.filter((item) => item.id !== id),
//     })),

//   updateQuantity: (id, quantity) =>
//     set((state) => ({
//       cartdata: state.cartdata.map((item) =>
//         item.id === id ? { ...item, quantity } : item
//       ),
//     })),
// }));

import { create } from 'zustand';

export const useStore = create((set, get) => ({
  cartdata: [],
  userData: null,
  formData: null,
  selectedProduct: null,
  token: null,
  decode: null,

  setSelectedProduct: (product) => set({ selectedProduct: product }),
  setUserData: (data) => set({ userData: data }),
  setItemData: (data) => set({ formData: data }),
  setToken: (newToken) => set({ token: newToken }),
  setDecode: (newDecode) => set({ decode: newDecode }),
  clearToken: () => set({ token: null }),

  // Use this only to prevent duplicates
  tryAddToCart: (item) => {
    const { cartdata } = get();
    const exists = cartdata.some((cartItem) => cartItem.id === item.id);
    if (exists) return false;
    set({ cartdata: [...cartdata, item] });
    return true;
  },

  removeFromCart: (id) =>
    set((state) => ({
      cartdata: state.cartdata.filter((item) => item.id !== id),
    })),

  updateQuantity: (id, quantity) =>
    set((state) => ({
      cartdata: state.cartdata.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    })),
}));
