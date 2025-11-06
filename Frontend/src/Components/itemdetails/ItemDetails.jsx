import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getDataById, getData } from "../Data/Data";
import Card from "../Card";
import { useSelector, useDispatch } from "react-redux";
import { addCart, removeCart } from "../Redux/Slice/CartSlice";
import { useNavigate } from "react-router-dom";
import { increment, decrement } from "../Redux/Slice/CounterSlice";
import Rating from "./Elements/Rating";
import Product_Info from "./Elements/Product_Info";
import Faqs from "./Elements/Faqs";

const ItemDetails = () => {
  const Cart = useSelector((state) => state.Cart);
  const Count = useSelector((state) => state.Counter);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [items, SetItems] = useState({});
  const [posts, setPosts] = useState([]);

  // added state for selected color and size
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const [ratingComp, setRatingComp] = useState([
    { name: "Product Details", isActive: false },
    { name: "Rating & Reviews", isActive: true },
    { name: "FAQs", isActive: false },
  ]);

  const clickHandler = (index, setfun, fun) => {
    const updatedRatingComp = fun.map((item, i) => ({
      ...item,
      isActive: i === index,
    }));
    setfun(updatedRatingComp);
  };

  const navigate = useNavigate();
  const count_handler = () => {
    dispatch(increment());
  };
  const ref = useRef();

  const handleClick = () => {
    if (ref.current.style.border) {
      ref.current.style.border = "";
    } else {
      ref.current.style.border = "1px solid #000000";
    }
  };
  const count_handler_minus = () => {
    return dispatch(decrement());
  };

  // 🟩 Updated: Add selected color and size to item before adding to cart
  const addToCartHandler = () => {
    if (!selectedColor || !selectedSize) {
      alert("Please select both color and size before adding to cart!");
      return;
    }

    const itemToAdd = {
      ...items,
      selectedColor,
      selectedSize,
      quantity: Count > 0 ? Count : 1,
    };

    dispatch(addCart(itemToAdd));
    navigate("/cart");
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    getDataById(id)
      .then((data) => {
        SetItems(data.items);
      })
      .catch((err) => {
        console.log(err);
      });
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    getData()
      .then((data) => setPosts(data))
      .catch((err) => console.log(err));
  }, []);

  let discount = items.discount;
  let price = items.price;
  const color = ["#000000", "#EE2222", "#35A6D0"];
  const size = ["Small", "Medium", "Large", "X-Large"];

  return (
    <div className="page_details_con">
      <div className="routes_text"></div>
      <div className="product_detail_con justify-center flex flex-col lg:flex-row mt-[5%] sm:mt-[7%] gap-[25px] lg:gap-[45px] px-5 lg:px-0">
        <div className="product_detail_images flex flex-col sm:flex-row">
          <div className="small_images flex flex-row sm:flex-col gap-[12px] sm:gap-[18px] overflow-x-auto sm:overflow-visible">
            <img
              ref={ref}
              src={items.image_url}
              className="sm_img hover:cursor-pointer w-[80px] h-[80px] sm:w-[111px] sm:h-[106px] rounded-[10px] sm:rounded-[20px] object-cover flex-shrink-0"
              onClick={handleClick}
            />
            <img
              src={items.image_url}
              className="sm_img hover:cursor-pointer w-[80px] h-[80px] sm:w-[111px] sm:h-[106px] rounded-[10px] sm:rounded-[20px] object-cover flex-shrink-0"
              onClick={handleClick}
            />
            <img
              src={items.image_url}
              className="sm_img hover:cursor-pointer w-[80px] h-[80px] sm:w-[111px] sm:h-[106px] rounded-[10px] sm:rounded-[20px] object-cover flex-shrink-0"
              onClick={handleClick}
            />
          </div>
          <div className="big_image ml-0 sm:ml-[20px] mt-[15px] sm:mt-0">
            <img
              src={items.image_url}
              className="w-full sm:w-[400px] lg:w-[444px] h-[300px] sm:h-[450px] lg:h-[530px] rounded-[15px] sm:rounded-[20px] object-cover"
            />
          </div>
        </div>

        <div className="product_detail_content flex flex-col gap-[14px] sm:gap-[16px] w-full lg:w-auto">
          <div className="w-full lg:w-[600px] h-auto">
            <p className="item-title w-full lg:w-[600px] h-auto text-[24px] sm:text-[32px] lg:text-[40px] leading-[32px] sm:leading-[40px] lg:leading-[48px] font-bold">
              {items.title}
            </p>
          </div>

          <div className="rating">
            <p className="w-auto lg:w-[38px] h-[22px] font-Satoshi font-normal text-sm sm:text-base leading-[21.6px]">
              {items.rating}/5
            </p>
          </div>
          <div className="price flex gap-[10px] items-center">
            {!!discount && <div className="discount-price text-[20px] sm:text-[24px] lg:text-[32px] font-bold">${discount}</div>}
            {!discount && <div className="discount-price text-[20px] sm:text-[24px] lg:text-[32px] font-bold">${price}</div>}
            {!!price && !!discount && (
              <div className="original-price text-[18px] sm:text-[20px] lg:text-[24px] line-through text-gray-400">${price}</div>
            )}
          </div>
          <div className="w-full lg:w-[493px] h-auto">
            <p className="font-Satoshi font-normal text-sm sm:text-base leading-[20px] sm:leading-[22px] text-left text-[#00000099]">
              {items.description}
            </p>
          </div>

          <div className="border bg-[#0000001a] opacity-50 w-full lg:w-[590px] h-[1px] mt-[5px]"></div>

          <p className="w-auto lg:w-[93px] h-[11px] font-Satoshi font-normal text-sm sm:text-base leading-[21.6px] text">
            Select Colors
          </p>
          <div className="item-colors flex gap-2 sm:gap-1 mt-[5px]">
            {color.map((item, id) => (
              <div
                key={id}
                onClick={() => setSelectedColor(item)}
                className={`color border-2 w-[35px] h-[35px] sm:w-[30px] sm:h-[30px] rounded-full hover:cursor-pointer ${
                  selectedColor === item ? "border-black border-4" : "border-gray-300"
                }`}
                style={{ backgroundColor: item }}
              ></div>
            ))}
          </div>

          <div className="border bg-[#0000001a] opacity-50 w-full lg:w-[590px] h-[1px] mt-[5px]"></div>

          <p className="w-auto lg:w-[93px] h-[11px] font-Satoshi font-normal text-sm sm:text-base leading-[21.6px] text">
            Choose Sizes
          </p>
          <div className="w-full lg:w-[420px] h-auto flex flex-wrap gap-[10px] sm:gap-[12px] mt-[5px]">
            {size.map((item, id) => (
              <button
                key={id}
                onClick={() => setSelectedSize(item)}
                className={`size_btn border px-3 sm:px-4 py-2 rounded-[20px] text-sm sm:text-base whitespace-nowrap ${
                  selectedSize === item
                    ? "bg-black text-white"
                    : "text-[#00000099] bg-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="border bg-[#0000001a] opacity-50 w-full lg:w-[590px] h-[1px] mt-[5px]"></div>

          <div className="cart-count flex flex-col sm:flex-row gap-[10px] mt-[13px] w-full">
            <div className="counter flex w-full sm:w-[170px] h-[52px] py-4 px-5 justify-between items-center rounded-[62px] bg-[#F0F0F0]">
              <button
                className="minus w-[24px] h-[70px] text-[28px] sm:text-[35px]"
                onClick={count_handler_minus}
              >
                <p>-</p>
              </button>
              <div className="counter-count text-base sm:text-lg font-medium">{Count < 0 ? 0 : Count}</div>
              <button
                className="plus w-[24px] h-[70px] text-[28px] sm:text-[35px]"
                onClick={count_handler}
              >
                <p>+</p>
              </button>
            </div>

            <div className="cart-button flex w-full sm:flex-1 lg:w-[400px] h-[52px] py-[16px] px-[30px] sm:px-[54px] justify-center items-center gap-[12px] rounded-[62px] bg-[#000000] hover:bg-[#333333] transition-colors hover:cursor-pointer">
              {Cart == undefined ? (
                <button className="text-[#FFFFFF] text-sm sm:text-base">Add to Cart</button>
              ) : Cart.some((e) => e._id == id) ? (
                <button
                  className="text-[#FFFFFF] text-sm sm:text-base"
                  onClick={() => dispatch(removeCart(id))}
                >
                  Remove from Cart
                </button>
              ) : (
                <button className="text-[#FFFFFF] text-sm sm:text-base" onClick={addToCartHandler}>
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="Rating-raviews flex flex-col justify-center items-center mt-[40px] px-5 lg:px-0">
        <div className="Rating-raviews-btn flex flex-wrap justify-center gap-[10px] sm:gap-[15px]">
          {ratingComp.map((rate, index) => (
            <React.Fragment key={index}>
              <button
                onClick={() => clickHandler(index, setRatingComp, ratingComp)}
                className={`${rate.isActive ? "active" : ""} px-4 sm:px-6 py-2 text-sm sm:text-base whitespace-nowrap`}
              >
                {rate.name}
              </button>
            </React.Fragment>
          ))}
        </div>

        <div className="w-full">{ratingComp[0].isActive ? <Product_Info /> : ""}</div>
        <div className="w-full">{ratingComp[1].isActive ? <Rating /> : ""}</div>
        <div className="w-full">{ratingComp[2].isActive ? <Faqs /> : ""}</div>
      </div>

      <div className="items-container flex flex-col justify-center items-center px-5 lg:px-0">
        <span className="title mt-[30px] text-[24px] sm:text-[28px] lg:text-[32px] font-bold text-center">
          YOU MIGHT ALSO LIKE
        </span>
        <div className="posts-container flex flex-wrap justify-center gap-[15px] sm:gap-[20px] lg:gap-[30px] mt-[30px] w-full">
          {posts.items?.slice(0, 4).map((item) => (
            <Card
              key={item._id}
              id={item._id}
              title={item.title}
              price={item.price}
              rating={item.rating}
              image={item.image_url}
              discount={item.discount}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;