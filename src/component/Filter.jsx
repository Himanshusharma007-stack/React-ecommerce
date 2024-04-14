import { useEffect, useState } from "react";
import axios from "axios";

export function Filter(props) {
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState();

  async function getCategories() {
    try {
      let { data } = await axios.get(
        "https://fakestoreapi.com/products/categories"
      );
      console.log("data --- ", data);
      setCategories(data);
    } catch (error) {
      console.error("Error -- ", error);
      throw new Error(error);
    }
  }

  function changeCat(event) {
    console.log("event.target --- ", event.target.value);
    setSelectedCat(event.target.value);
    if (event.target.value) {
      props.getProductsByCategory(event.target.value);
    } else {
      props.getData();
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="w-full md:w-1/3 my-5">
      <select
        className="block appearance-none w-full bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 focus:outline-none focus:border-indigo-500 focus:ring-indigo-500"
        value={selectedCat}
        onChange={changeCat}
      >
        <option value="">No Category Selected</option>
        {categories.map((elem, index) => {
          return (
            <option value={elem} key={index}>
              {elem.toUpperCase()}
            </option>
          );
        })}
      </select>
    </div>
  );
}
