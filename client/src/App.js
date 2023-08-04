import {Route,Routes} from "react-router-dom";
import Home from "./pages/home/Home";
import Collections from "./pages/collections/Collections";
import ProductDetails from "./pages/home/productDetails/ProductDetails";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { useEffect } from "react";
import {useDispatch} from "react-redux";
import { fetchCategories } from "./redux/categorySlice";  
import Payments from "./components/payments/Payments";

function App() {

  const dispatch=useDispatch();

  useEffect(()=>{
      dispatch(fetchCategories());
  },[])

  return (
    <div className="App">
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/category/:categoryId?" element={<Collections/>}></Route>
          <Route path="/product/:productId" element={<ProductDetails/>}></Route>
          <Route path="/payments/:status" element={<Payments/>}></Route>
        </Routes>
      <Footer/>
    </div>
  );
}

export default App;
