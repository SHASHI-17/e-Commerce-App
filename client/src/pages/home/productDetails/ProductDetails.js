import React, { useEffect, useState } from "react";
import "./ProductDetails.scss";
import { useParams } from "react-router-dom";
import { axiosClient } from "../../../utils/axiosClient";
import Loader from "../../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../../redux/cartSlice";
function ProductDetails() {

    const dispatch=useDispatch();
  const params=useParams();
  const [product,setProduct]=useState(null);
  
  const cart = useSelector(state => state.cartReducer.cart);
  const quantity = cart.find(item => item.key === params.productId)?.quantity || 0; 

  console.log("params",params);

    async function  fetchData(){
        const productResponse=await axiosClient.get(`/products?filters[key][$eq]=${params.productId}&populate=image`)
        console.log("abhi idhar he huin",productResponse.data.data[0]);
        if(productResponse.data.data.length > 0){ // find se puura data aatha hai toh hame sirf pehle index wala chaiye
          //find mein sirf ek aatha udhar np idhar hame first index sirf
          setProduct(productResponse.data.data[0]);
        }
    }

  useEffect(()=>{
    setProduct(null);
    fetchData();
  },[params]);


  if(!product){
    return <Loader/>
  }



  return (
    <div className="ProductDetails">
      <div className="container">
        <div className="product-layout ">
          <div className="product-image center">
            <div className="img-container center">
                  <img src={product?.attributes?.image?.data?.attributes?.url } alt="" />
            </div>
          </div>
          <div className="product-info">
            <h1 className="heading">{product?.attributes?.title }</h1>
            <h3 className="price">₹ {product?.attributes?.price }</h3>
            <p>
            {product?.attributes?.desc }
            </p>
            <div className="cart-options">
              <div className="quantity-selector">
                <span className="btn decrement" onClick={()=>{dispatch(removeFromCart(product))}}>-</span>
                <span className="quantity">{quantity}</span>
                <span className="btn increment" onClick={()=>{dispatch(addToCart(product))}}>+</span>
              </div>
              <button className="btn-primary add-to-cart" onClick={()=>{dispatch(addToCart(product))}}>Add to Cart</button>
            </div>

            <div className="return-policy">
              <ul>
                <li>Contact us within 30 days of receiving your item.</li>
                <li>
                  Provide your order number and the reason for your return.
                </li>
                <li>We will send you a return shipping label.</li>
                <li>Ship the item back to us at your expense.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
