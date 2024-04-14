import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Star, ArrowLeft } from "lucide-react";
import { Loader } from "../component/Loader";
import { generateAddonPrice } from "../utils/generateaddonprice";
import { useDispatch, useSelector } from "react-redux";
import { updateArrOfItems } from "../features/cart/cartSlice";

export function ProductDetail() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const cartArr = useSelector((state) => state.cartArr?.value);
  const { id } = useParams();

  const [productDetail, setProductDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  async function getProductDetailById() {
    try {
      setIsLoading(true);
      let item = cartArr?.find((elem) => elem?.id == id);
      if (item) {
        setProductDetail(item);
      } else {
        let { data } = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        console.log("data --- ", data);
        setProductDetail(data);
      }
    } catch (error) {
      console.error("Error -- ", error);
      throw new Error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getProductDetailById();
  }, []);

  function increamentCounter(item) {
    item = { ...item, count: ( item?.count || 0 )+ 1 };
    setProductDetail(item);
    dispatch(updateArrOfItems({ item }));
  }
  function decreamentCounter(item) {
    item = { ...item, count: item.count - 1 };
    setProductDetail(item);
    dispatch(updateArrOfItems({ item }));
  }

  return (
    <>
      {isLoading ? (
        <Loader height="79vh" />
      ) : (
        <section className="overflow-hidden">
          <div className="mx-auto max-w-5xl px-5 py-20">
            <button
              type="button"
              className="rounded-full bg-black px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div className="mx-auto flex flex-wrap items-center lg:w-4/5">
              <img
                alt={productDetail.title || "Product image"}
                className="h-64 w-full rounded object-cover lg:h-96 lg:w-1/2"
                src={productDetail.image}
              />
              <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-10">
                <h2 className="text-sm font-semibold tracking-widest text-gray-500">
                  {productDetail?.category?.toUpperCase()}
                </h2>
                <h1 className="my-4 text-3xl font-semibold text-black">
                  {productDetail.title}
                </h1>
                <div className="my-4 flex items-center">
                  <span className="flex items-center space-x-1">
                    {[
                      ...Array(Math.floor(productDetail?.rating?.rate || 0)),
                    ].map((_, i) => (
                      <Star key={i} size={16} className="text-yellow-500" />
                    ))}
                    <span className="ml-3 inline-block text-xs font-semibold">
                      {Math.floor(productDetail?.rating?.rate || 0)}
                    </span>
                  </span>
                </div>
                <h2 className="text-sm font-semibold tracking-widest text-gray-500">
                  {productDetail.rating?.count}+ brought in past month
                </h2>
                <p className="leading-relaxed">{productDetail.description}</p>
                <div className="flex items-center justify-between">
                  <span className="title-font text-xl font-bold text-gray-900">
                    $ {productDetail.price} &nbsp;
                    <span className="font-segoe pl-2 text-sm text-gray-400 line-through md:text-base lg:text-lg xl:text-xl">
                      ${generateAddonPrice(productDetail.price)}
                    </span>
                  </span>
                </div>

                {!productDetail?.count ? (
                  <button
                    type="button"
                    className="w-full mt-2 rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    onClick={() => increamentCounter(productDetail)}
                  >
                    Add to Cart
                  </button>
                ) : (
                  <div className="mt-4 w-full flex items-center justify-between">
                    <button
                      type="button"
                      className="w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                      onClick={() => decreamentCounter(productDetail)}
                    >
                      -
                    </button>
                    <span className="mx-4">{productDetail?.count}</span>
                    <button
                      type="button"
                      className="w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                      onClick={() => increamentCounter(productDetail)}
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
