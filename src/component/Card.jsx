import { useState } from "react";
import { generateAddonPrice } from "../utils/generateaddonprice";
import { Link } from "react-router-dom";

function Card(props) {
  const [cartItem, setCartItem] = useState(props.defaultCount);

  function addToCartClicked(e) {
    e.preventDefault();
    const newCartItem = cartItem + 1;
    setCartItem(newCartItem);
    props.updateArrOfItem({ ...props.data, count: newCartItem });
  }
  function decreamentIconClicked(e) {
    e.preventDefault();
    const newCartItem = cartItem - 1;
    setCartItem(newCartItem);
    props.updateArrOfItem({ ...props.data, count: newCartItem });
  }

  return (
    <>
      <div className="w-[300px] rounded-md border">
      <Link to={`/React-ecommerce/product/${props.data.id}`}>
        <img
          src={props.data.image}
          className="h-[200px] w-full rounded-t-md object-cover"
        />
        <div className="p-4">
          <h1 className="inline-flex items-center text-lg font-semibold">
            {props.data.title}
          </h1>
          <p className="mt-3 text-sm text-gray-600">
            {/* ₹  */}$ {props.data.price} &nbsp;&nbsp;
            <strike>$ {generateAddonPrice(props.data.price)}</strike>
          </p>

          {cartItem == 0 ? (
            <button
              type="button"
              onClick={addToCartClicked}
              className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Add to cart
            </button>
          ) : (
            <div
              className="mt-4 w-full flex items-center justify-between"
              onClick={(e) => e.preventDefault()}
            >
              <button
                type="button"
                onClick={decreamentIconClicked}
                className="w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                -
              </button>
              <span className="mx-4">{cartItem}</span>
              <button
                type="button"
                onClick={addToCartClicked}
                className="w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                +
              </button>
            </div>
          )}
        </div>
        </Link>
      </div>
    </>
  );
}

export default Card;
