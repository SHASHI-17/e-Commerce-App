import { createSlice } from "@reduxjs/toolkit";

const cartSlice=createSlice({
    name:'cartSlice',
    initialState :{
        cart:[]
    },
    reducers:{
        addToCart : (state,action)=>{
            const product=action.payload.attributes;
            const curItem=product ? {
                title:product.title,
                key:product.key,
                price:product.price,
                image:product.image.data.attributes.url
            } :  action.payload;
            
            const index=state.cart.findIndex(item => item.key === curItem.key); 
            if(index===-1){
                state.cart.push({...curItem,quantity:1});
                // object k andar nexting na ho toh rest operator use krte hai
            }else{
                state.cart[index].quantity+=1;
            }
        },
        removeFromCart :(state,action)=>{
            const curKey=action.payload?.attributes?.key || action.payload.key ;
            
            const index=state.cart.findIndex(item => item.key === curKey);
            if(index===-1) return;
            if(state.cart[index].quantity === 1){
                     state.cart=state.cart.filter(item => item.key !==curKey);
            }else{
                state.cart[index].quantity-=1;
            }
        },
        resetCart : (state,action)=>{
            state.cart=[]
        },reset : (state,action) =>{
            // const index=state.cart.includes(item => item.key === action.payload.key);  // findindex ya includes indexof
            //     state.cart.splice(index,1);
            state.cart=state.cart.filter(item => item.key !==action.payload.key);
            }
    }
})

 export default cartSlice.reducer
 export const {addToCart,removeFromCart ,resetCart,reset} = cartSlice.actions 