import React, { useEffect, useState } from 'react'
import "./Home.scss"
import Hero from '../../components/Hero/Hero'
import Category from '../../components/Category/Category'
import Product from '../../components/Product/Product'
import { axiosClient } from '../../utils/axiosClient'
import {useSelector} from "react-redux";

function Home() {
  const  categories = useSelector(state => state.categoryReducer.categories);
  const [topProducts,setTopProducts]=useState(null);

    async function fetchData(){
      const topProductsResponse=await axiosClient.get('/products?filters[isTopPick][$eq]=true&populate=image'); 
      setTopProducts(topProductsResponse.data.data);
    }

    useEffect(()=>{
      fetchData();
    },[])

  return (
    <div className='Home'>
      <Hero/>
      <section className='collection container'>
          <div className="info">
            <h2 className="heading">Shop By Categories</h2>
            <p className="subheading">
            Shop from the best, our File and TV Posters Collection.
            </p>
          </div>

          <div className="content">
                {categories?.map(item => <Category key={item.id} category={item}/>)}
          </div>
      </section>
      <section className='collection container'>
          <div className="info">
            <h2 className="heading">Our Top Picks</h2>
            <p className="subheading">
            All New Designs, Same Old Details
            </p>
          </div>

          <div className="content">
                {topProducts?.map(item => <Product key={item.id} product={item} />)}
          </div>
      </section>
    </div>
  )
}

export default Home