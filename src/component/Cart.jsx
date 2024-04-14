import { Trash } from "lucide-react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { generateAddonPrice } from "../utils/generateaddonprice";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { updateArrOfItems } from "../features/cart/cartSlice";

export function Cart() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const cartArr = useSelector((state) => state.cartArr?.value);
  const [amountObj, setAmountObj] = useState({
    price: 0,
    totalPrice: 0,
    totalDiscountedPrice: 0,
  });

  function findTotalPrice() {
    let obj = { price: 0, totalPrice: 0, totalDiscountedPrice: 0 };
    let total = 0;
    for (let i = 0; i < cartArr.length; i++) {
      const element = cartArr[i];
      total += element.price * element.count;
    }
    obj.totalPrice = total.toFixed(2);
    obj.price = generateAddonPrice(total);
    obj.totalDiscountedPrice = (obj.price - obj.totalPrice).toFixed(2);
    setAmountObj(obj);
  }
  useEffect(() => {
    findTotalPrice();
  }, [cartArr]);

  function increamentCounter(item) {
    item = { ...item, count: item.count + 1 };
    dispatch(updateArrOfItems({ item }));
  }
  function decreamentCounter(item) {
    item = { ...item, count: item.count - 1 };
    dispatch(updateArrOfItems({ item }));
  }
  function removeItem(item) {
    item = { ...item, count: 0 };
    dispatch(updateArrOfItems({ item }));
  }

  return (
    <div className="mx-auto max-w-7xl px-2 lg:px-0">
      <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Cart items
        </h1>

        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section
            aria-labelledby="cart-heading"
            className="rounded-lg bg-white lg:col-span-8"
          >
            <h2 id="cart-heading">
              {cartArr.length ? (
                "Items in your shopping cart"
              ) : (
                <>
                  {" "}
                  Your cart is empty
                  <Link to="/React-ecommerce/" className="text-blue-500">
                    {" "}
                    click here to go to home.
                  </Link>
                </>
              )}
            </h2>
            <ul role="list" className="divide-y divide-gray-200">
              {cartArr.map((product, productIdx) => (
                <div key={product.id} className="">
                  <Link to={`/React-ecommerce/product/${product.id}`}>
                  <li className="flex py-6 sm:py-6 ">
                    <div className="flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-contain object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                      <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                        <div>
                          <div className="flex justify-between">
                            <h3 className="text-sm">
                              <a
                                href={product.href}
                                className="font-semibold text-black"
                              >
                                {product.title}
                              </a>
                            </h3>
                          </div>
                          <div className="mt-1 flex text-sm">
                            <p className="text-sm text-gray-500">
                              {product.color}
                            </p>
                            {product.size ? (
                              <p className="ml-4 border-l border-gray-200 pl-4 text-sm text-gray-500">
                                {product.size}
                              </p>
                            ) : null}
                          </div>
                          <div className="mt-1 flex items-end">
                            <p className="text-xs font-medium text-gray-500 line-through">
                              $ {generateAddonPrice(product.price)}
                            </p>
                            <p className="text-sm font-medium text-gray-900">
                              &nbsp;&nbsp;$ {product.price}
                            </p>
                            &nbsp;&nbsp;
                            <p className="text-sm font-medium text-green-500">
                              10% off
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  </Link>
                  <div className="mb-2 flex">
                    <div className="min-w-24 flex">
                      <button
                        type="button"
                        className="h-7 w-7"
                        onClick={() => decreamentCounter(product)}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        className="mx-1 h-7 w-9 rounded-md border text-center"
                        value={product.count}
                      />
                      <button
                        type="button"
                        className="flex h-7 w-7 items-center justify-center"
                        onClick={() => increamentCounter(product)}
                      >
                        +
                      </button>
                    </div>
                    <div className="ml-6 flex text-sm">
                      <button
                        type="button"
                        className="flex items-center space-x-1 px-2 py-1 pl-0"
                        onClick={() => removeItem(product)}
                      >
                        <Trash size={12} className="text-red-500" />
                        <span className="text-xs font-medium text-red-500">
                          Remove
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </ul>
          </section>
          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0"
          >
            <h2
              id="summary-heading"
              className=" border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4"
            >
              Price Details
            </h2>
            <div>
              <dl className=" space-y-1 px-2 py-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-800">Price (3 item)</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    $ {amountObj.price}
                  </dd>
                </div>
                <div className="flex items-center justify-between pt-4">
                  <dt className="flex items-center text-sm text-gray-800">
                    <span>Discount</span>
                  </dt>
                  <dd className="text-sm font-medium text-green-700">
                    - $ {amountObj.totalDiscountedPrice}
                  </dd>
                </div>
                <div className="flex items-center justify-between py-4">
                  <dt className="flex text-sm text-gray-800">
                    <span>Delivery Charges</span>
                  </dt>
                  <dd className="text-sm font-medium text-green-700">Free</dd>
                </div>
                <div className="flex items-center justify-between border-y border-dashed py-4 ">
                  <dt className="text-base font-medium text-gray-900">
                    Total Amount
                  </dt>
                  <dd className="text-base font-medium text-gray-900">
                    $ {amountObj.totalPrice}
                  </dd>
                </div>
              </dl>
              <div className="px-2 pb-4 font-medium text-green-700">
                You will save $ {amountObj.totalDiscountedPrice} on this order
              </div>

              {!cartArr.length ? (
                ""
              ) : (
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    onClick={() => navigate("/React-ecommerce/")}
                  >
                    Back to shop
                  </button>
                  <button
                    type="button"
                    className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black" onClick={() => navigate('/React-ecommerce/checkout')}
                  >
                    Checkout
                  </button>
                </div>
              )}
            </div>
          </section>
        </form>
      </div>
    </div>
  );
}
