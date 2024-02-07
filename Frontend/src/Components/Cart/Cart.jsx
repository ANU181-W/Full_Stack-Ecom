import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "../Redux/Slice/CounterSlice";
import { removeCart } from "../Redux/Slice/CartSlice";
import { Tag, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const count = useSelector((state) => state.Counter);
  const Cart = useSelector((state) => state.Cart);
  const dispatch = useDispatch();
  console.log("Cart" + Cart);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    setTotalAmount(Cart.reduce((acc, curr) => acc + curr.price, 0));
  }, [Cart]);

  let discount = Cart.reduce(
    (acc, curr) => acc + curr.price - curr.discount,
    0
  );
  let discountpercent = Cart.reduce(
    (acc, curr) => acc + (discount / curr.price) * 100,
    0
  );
  return (
    <div className="cart-conatiner">
      <div className="border bg-[#0000001a] opacity-50 w-[324px] lg:w-[1220px] h-[1px]  mt-[25px] ml-[20px] lg:ml-[100px]"></div>
      <div className="cart-route mt-[30px] ml-[100px]"></div>
      <div className="cart-heading w-[259px] h-[48px] mt-[30px] ml-[100px]">
        <p className="font-bold font-[IntegralCF] text-[40px] leading-[48px] text-[#000000] ">
          YOUR CART
        </p>
      </div>
      <div className="cart-main-conatiner mt-[25px] ml-[100px] flex gap-[20px]">
        <div className="cart-items w-[715px] h-fit rounded-[20px] flex flex-col gap-[24px] ">
          {Cart.length == 0 ? (
            <>
              <div className="empty-cart flex flex-col gap-[10px] justify-center items-center">
                <p className="w-[225px] h-[32px] font-[Satoshi] font-bold text-[24px] leading-[32.4px] text-[#000000]">
                  Your Cart is empty...
                </p>
                <button
                  className="w-[180px] h-[48px] rounded-[62px] px-[38px] py-[13px] flex gap-[12px] bg-[#000000] ml-[10px]"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  <p className="text-[#FFFFFF] w-[100px] h-[22px] font-[Satoshi] font-medium text-[18px] leading-[22.6px]">
                    Go to Shop
                  </p>
                </button>
              </div>
            </>
          ) : (
            Cart.map((e) => (
              <>
                <div className="w-[667px] h-[124px] flex gap-[16px] justify-between">
                  <img
                    src={e.image_url}
                    alt="item_image"
                    className="w-[124px] h-[124px] rounded-[8.66px] "
                  />

                  <div className="w-[227px] h-[118px] flex flex-col justify-between ">
                    <div className="productr-title w-[227px] h-[27px]">
                      <p className="font-[Satoshi] font-bold text-[20px] leading-[27px] text-[#000000]">
                        {e.title}
                      </p>
                    </div>
                    <div className="w-[87px] h-[19px] flex gap-[10px]">
                      <p className="font-[Satoshi] font-normal text-[18px] leading-[18.9px] text-[#000000]">
                        Size :
                      </p>

                      <p className="font-[Satoshi] font-normal text-[18px] leading-[18.9px] text-[#00000066]">
                        large
                      </p>
                    </div>
                    <div className="w-[105px] h-[19px] flex gap-[10px]">
                      <p className="font-[Satoshi] font-normal text-[18px] leading-[18.9px] text-[#000000]">
                        Color :
                      </p>

                      <p className="font-[Satoshi] font-normal text-[18px] leading-[18.9px] text-[#00000066]">
                        White
                      </p>
                    </div>
                    <div className="w-[54px] h-[32px]">
                      <p className="font-[Satoshi] font-bold text-[24px] leading-[32.4px] text-[#000000]">
                        ${e.discount ? e.discount : e.price}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between">
                    <Trash2
                      className="w-[24px] h-[24px] text-[#FF3333] ml-[102px] hover:cursor-pointer"
                      onClick={() => dispatch(removeCart(e._id))}
                    />
                    <div className="flex  w-[126px] h-[44px] rounded-[62px] py-[12px] px-[20px] gap-[20px] bg-[#F0F0F0]">
                      <button onClick={() => dispatch(decrement())}>
                        <p className="w-[20px] h-[20px] text-[#000000] leading-[18px] text-[28px]">
                          -
                        </p>
                      </button>
                      <p className="w-[9px] h-[19px] font-[Satoshi] font-medium text-[14px] leading-[25.9px] text-[#000000]">
                        {count < 0 ? 0 : count}
                      </p>
                      <button onClick={() => dispatch(increment())}>
                        <p className="w-[20px] h-[20px] text-[#000000] leading-[18px] text-[28px]">
                          +
                        </p>
                      </button>
                    </div>
                  </div>
                </div>
                <hr />
              </>
            ))
          )}
        </div>
        <div className="cart-checkout cart-items w-[505px] h-[450px] rounded-[20px] flex flex-col gap-[24px]">
          <div className="w-[179px] h-[32px] font-[Satoshi] font-bold text-[24px] leading-[32.4px] text-[#000000]">
            <p>Order Summary</p>
          </div>
          <div className="cart-price-section w-[457px] h-[193px] flex flex-col gap-[20px]">
            <div className="sub-total w-[457px] h-[27px] flex justify-between">
              <p className="w-[72px] h-[27px] font-[Satoshi] font-normal text-[20px] leading-[27px] text-[#00000099]">
                Subtotal
              </p>
              <p className="w-[49px] h-[27px] font-[Satoshi] font-bold text-[20px] leading-[27px] text-right text-[#000000]">
                {totalAmount}
              </p>
            </div>
            <div className="sub-total w-[457px] h-[27px] flex justify-between">
              <p className="w-[72px] h-[27px] font-[Satoshi] font-normal text-[20px] leading-[27px] text-[#00000099]">
                Discount(${parseInt(discountpercent)}%)
              </p>
              <p className="w-[49px] h-[27px] font-[Satoshi] font-bold text-[20px] leading-[27px] text-right text-[#FF3333]">
                {`-$${discount}`}
              </p>
            </div>
            <div className="sub-total w-[457px] h-[27px] flex justify-between">
              <p className="w-[107px] h-[27px] font-[Satoshi] font-normal text-[20px] leading-[27px] text-[#00000099]">
                Delivery Fee
              </p>
              <p className="w-[49px] h-[27px] font-[Satoshi] font-bold text-[20px] leading-[27px] text-right text-[#000000]">
                {`$15`}
              </p>
            </div>
            <div className="border bg-[#0000001a] opacity-50 w-[457px] h-[1px]  "></div>
            <div className="sub-total w-[457px] h-[27px] flex justify-between">
              <p className="w-[107px] h-[27px] font-[Satoshi] font-normal text-[20px] leading-[27px] text-[#000000]">
                Total
              </p>
              <p className="w-[49px] h-[27px] font-[Satoshi] font-bold text-[20px] leading-[27px] text-right text-[#000000]">
                {totalAmount}
              </p>
            </div>
            <div className="w-[457px] h-[48px] flex gap-[12px]">
              <Tag className="absolute ml-[15px] mt-[15px] w-[21px] h-[21px] text-[#00000066]" />
              <input
                type="text"
                placeholder="Add promo code"
                className="w-[326px] h-[48px] rounded-[62px] px-[50px] py-[12px]  bg-[#F0F0F0] text-[#000000]"
              />

              <button className="w-[119px] h-[48px] rounded-[62px] px-[38px] py-[13px] flex gap-[12px] bg-[#000000]">
                <p className="text-[#FFFFFF] w-[42px] h-[22px] font-[Satoshi] font-medium text-[16px] leading-[21.6px]">
                  Apply
                </p>
              </button>
            </div>
            <div>
              <button className="w-[457px] h-[60px] rounded-[62px] px-[54px] pl-[160px] py-[18px] flex gap-[12px] bg-[#000000]">
                <p className="text-[#FFFFFF] w-[114px] h-[22px] font-[Satoshi] font-medium text-[16px] leading-[24.6px]">
                  Go to Checkout
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
