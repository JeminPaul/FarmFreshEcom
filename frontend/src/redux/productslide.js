import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
const initialState = {
  productlist: [],
  cartitem: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setDataproduct: (state, action) => {
      // console.log(action);
      state.productlist = [...action.payload];
    },
    addcartitem: (state, action) => {
      const Check = state.cartitem.some((el) => el.id === action.payload.id);
      console.log(Check);
      if (Check) {
        toast("Already Item in Cart");
      } else {
        toast("Item Added Succesfully")
        const total = action.payload.price;
        state.cartitem = [
          ...state.cartitem,
          { ...action.payload, qty: 1, total: total },
        ];
      }
    },
    deletecartitem: (state, action) => {
      console.log(action.payload);
      toast("Item will be deleted");
      const index = state.cartitem.findIndex((el) => el.id === action.payload);
      state.cartitem.splice(index, 1);
      console.log(index);
    },
    increaseQty: (state, action) => {
      const index = state.cartitem.findIndex((el) => el.id === action.payload);
      let qty = state.cartitem[index].qty;
      const qtyinc= ++qty
      state.cartitem[index].qty =qtyinc;

      const price=state.cartitem[index].price

      const total=price*qtyinc

      state.cartitem[index].total=total
    },
    decreaseQty: (state, action) => {
      const index = state.cartitem.findIndex((el) => el.id === action.payload);
      let qty = state.cartitem[index].qty;
      if (qty > 1) {
        const qtyDec=--qty
        state.cartitem[index].qty =qtyDec ;

        const price=state.cartitem[index].price

        const total=price*qtyDec
  
        state.cartitem[index].total=total
      }
    },
  },
});

export const {
  setDataproduct,
  addcartitem,
  deletecartitem,
  increaseQty,
  decreaseQty,
} = productSlice.actions;

export default productSlice.reducer;
