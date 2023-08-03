import React, { useEffect, useState } from 'react'
import "./Collections.scss"
import Product from '../../components/Product/Product'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { axiosClient } from '../../utils/axiosClient';
  

function Collections() {

  const navigate =useNavigate();
  const params=useParams();
  const [categoryId,setCategoryId]=useState('');
  const [products,setProducts]=useState([]);
 
  const sortOptions=[
    {
        value:'Price - Low To High',
        sort:'price'
    },
    {
        value:'Newest First',
        sort :'createdAt'
    }
]
const [sortBy,setSortBy]=useState(sortOptions[0].sort);

  const  categories = useSelector(state => state.categoryReducer.categories);

  function updateCategory(e){
      navigate(`/category/${e.target.value}`);
  }   

  async function fetchProducts(){
    const url =params.categoryId  ? `/products?filters[category][key][$eq]=${params.categoryId}&populate=image&sort=${sortBy}` 
                    :  `/products?populate=image&sort=${sortBy}`
         const response = await axiosClient.get(url);
         setProducts( response.data.data);
  }

  useEffect(()=>{
    setCategoryId(params?.categoryId);  
    fetchProducts();
  },[params,sortBy]);


  return (
    <div className='Categories'>
      <div className="container">
      <div className="header">
          <div className="info">
            <h2>Explore All Print and Artwork</h2>
            <p>India's largest collection of wall posters for bedrooms, living rooms, kids rooms, kitchen
            and posters and art prints at highest quality lowest price guaranteed.</p>
          </div>
          <div className="sort-by">
            <div className="sort-by-container">
              <h3 className="sort-by-text">Sort By</h3>
              <select className='select-sort-by' name="sort-by" id="sort-by"
                      onChange={(e)=>{setSortBy(e.target.value)}}    >
                {
                  sortOptions.map((item)=> <option key={item.sort} value={item.sort}>{item.value}</option>)
                }
              </select>
            </div>
          </div>
        </div>
        <div className="content">
                <div className="filter-box">
                  <div className="category-filter">
                          <h3>Category</h3>
                          {categories.map(item=> <div key={item.id} className="filter-radio">
                             <input name='category' value={item.attributes.key} type="radio" id={item.id} onChange={updateCategory} checked={item.attributes.key === categoryId} />
                             <label htmlFor={item.id} >{item.attributes.title}</label>
                          </div>)}
                  </div>
                </div>
                <div className="product-box">
                    {products.map(item => <Product key={item.id} product={item} />)}
                </div>
        </div>
      </div>
    </div>
  )
}

export default Collections