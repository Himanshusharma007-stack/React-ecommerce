import Card from "../component/Card";
import { useState, useEffect } from "react";
import { Loader } from "../component/Loader";
import { Filter } from "../component/Filter";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateArrOfItems } from "../features/cart/cartSlice";

function Home() {
  const dispatch = useDispatch();
  let [productList, setProductList] = useState([]);
  let [isLoading, setisLoading] = useState(false);
  const cartArr = useSelector((state) => state.cartArr?.value);

  async function getData() {
    try {
      setisLoading(true);
      let { data } = await axios.get("https://fakestoreapi.com/products");
      setProductList(data);
    } catch (error) {
      console.error("Error -- ", error);
      throw new Error(error);
    } finally {
      setisLoading(false);
    }
  }

  async function getProductsByCategory(category) {
    try {
      setisLoading(true);
      let { data } = await axios.get(
        `https://fakestoreapi.com/products/category/${category}`
      );
      setProductList(data);
    } catch (error) {
      console.error("Error -- ", error);
      throw new Error(error);
    } finally {
      setisLoading(false);
    }
  }

  function updateArrOfItem(item) {
    dispatch(updateArrOfItems({ item }));
  }

  function returnCount(obj) {
    let res = cartArr.find((elem) => elem.id == obj.id)
    return res?.count || 0
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="mx-auto px-4 container ">
      <Filter getProductsByCategory={getProductsByCategory} getData={getData} />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex gap-4 flex-wrap ">
          {productList.map((obj, index) => {
            return (
              <Card key={index} data={obj} defaultCount={returnCount(obj)} updateArrOfItem={updateArrOfItem} />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Home;
