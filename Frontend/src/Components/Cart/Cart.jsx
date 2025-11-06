import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeCart, updateQuantity } from "../Redux/Slice/CartSlice";
import { Tag, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const Cart = useSelector((state) => state.Cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [subtotal, setSubtotal] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [discountPercent, setDiscountPercent] = useState(0);
  const deliveryFee = 15;

  useEffect(() => {
    const totalOriginal = Cart.reduce(
      (acc, item) => acc + item.price * (item.quantity || 1),
      0
    );

    const totalDiscounted = Cart.reduce(
      (acc, item) =>
        acc + (item.discount || item.price) * (item.quantity || 1),
      0
    );

    const discountAmount = totalOriginal - totalDiscounted;
    const percent =
      totalOriginal > 0 ? ((discountAmount / totalOriginal) * 100) : 0;

    setSubtotal(totalOriginal);
    setTotalDiscount(discountAmount);
    setDiscountPercent(percent);
  }, [Cart]);

  const finalTotal = subtotal - totalDiscount + deliveryFee;

  return (
    <div className="cart-conatiner">
      <div className="border bg-[#0000001a] opacity-50 w-full max-w-[324px] lg:max-w-[1220px] h-[1px] mt-[25px] mx-auto lg:ml-[100px]"></div>
      <div className="cart-route mt-[30px] px-5 lg:px-0 lg:ml-[100px]"></div>
      <div className="cart-heading w-auto lg:w-[259px] h-auto lg:h-[48px] mt-[30px] px-5 lg:px-0 lg:ml-[100px]">
        <p className="font-bold font-[IntegralCF] text-[28px] sm:text-[32px] lg:text-[40px] leading-[36px] sm:leading-[42px] lg:leading-[48px] text-[#000000]">
          YOUR CART
        </p>
      </div>
      <div className="cart-main-conatiner mt-[25px] px-5 lg:px-0 lg:ml-[100px] flex flex-col lg:flex-row gap-[20px]">
        <div className="cart-items w-full lg:w-[715px] h-fit rounded-[20px] flex flex-col gap-[24px]">
          {Cart.length === 0 ? (
            <>
              <div className="empty-cart flex flex-col gap-[10px] justify-center items-center">
                <p className="w-auto lg:w-[225px] h-auto lg:h-[32px] font-[Satoshi] font-bold text-[20px] sm:text-[22px] lg:text-[24px] leading-[28px] sm:leading-[30px] lg:leading-[32.4px] text-[#000000] text-center">
                  Your Cart is empty...
                </p>
                <button
                  className="w-auto lg:w-[180px] h-[48px] rounded-[62px] px-[38px] py-[13px] flex gap-[12px] bg-[#000000] hover:bg-[#333333] transition-colors"
                  onClick={() => navigate("/")}
                >
                  <p className="text-[#FFFFFF] w-auto lg:w-[100px] h-[22px] font-[Satoshi] font-medium text-[16px] sm:text-[17px] lg:text-[18px] leading-[22.6px] whitespace-nowrap">
                    Go to Shop
                  </p>
                </button>
              </div>
            </>
          ) : (
            Cart.map((e) => (
              <>
                <div className="w-full lg:w-[667px] h-auto lg:h-[124px] flex flex-col sm:flex-row gap-[16px] justify-between">
                  <img
                    src={e.image_url}
                    alt="item_image"
                    className="w-full sm:w-[124px] h-[200px] sm:h-[124px] rounded-[8.66px] object-cover"
                  />

                  <div className="w-full sm:w-[227px] h-auto sm:h-[118px] flex flex-col justify-between gap-[12px] sm:gap-0">
                    <div className="productr-title w-full sm:w-[227px] h-auto sm:h-[27px]">
                      <p className="font-[Satoshi] font-bold text-[18px] sm:text-[20px] leading-[24px] sm:leading-[27px] text-[#000000]">
                        {e.title}
                      </p>
                    </div>
                    <div className="w-auto sm:w-[112px] h-[19px] flex gap-[10px]">
                      <p className="font-[Satoshi] font-normal text-[16px] sm:text-[18px] leading-[18.9px] text-[#000000]">
                        Size :
                      </p>
                      <p className="font-[Satoshi] font-normal text-[16px] sm:text-[18px] leading-[18.9px] text-[#00000066]">
                        {e.selectedSize || "—"}
                      </p>
                    </div>
                    <div className="w-auto sm:w-[105px] h-[19px] flex gap-[10px] items-center">
                      <p className="font-[Satoshi] font-normal text-[16px] sm:text-[18px] leading-[18.9px] text-[#000000]">
                        Color :
                      </p>
                      <div
                        className="w-[20px] h-[20px] rounded-[50%] border border-gray-300"
                        style={{
                          background: e.selectedColor,
                        }}
                        title={e.selectedColor}
                      ></div>
                    </div>
                    <div className="w-[54px] h-[32px]">
                      <p className="font-[Satoshi] font-bold text-[20px] sm:text-[24px] leading-[28px] sm:leading-[32.4px] text-[#000000]">
                        ${e.price}
                      </p>
                    </div>
                  </div>

                  <div className="flex sm:flex-col justify-between sm:justify-between items-end sm:items-end">
                    <Trash2
                      className="w-[24px] h-[24px] text-[#FF3333] sm:ml-[102px] hover:cursor-pointer hover:text-[#cc0000] transition-colors"
                      onClick={() => dispatch(removeCart(e._id))}
                    />
                    <div className="flex w-[126px] h-[44px] rounded-[62px] py-[12px] px-[20px] gap-[20px] bg-[#F0F0F0]">
                      <button
                        onClick={() => {
                          const newQty = (e.quantity || 1) - 1;
                          if (newQty > 0)
                            dispatch(
                              updateQuantity({ id: e._id, quantity: newQty })
                            );
                        }}
                        className="hover:opacity-70 transition-opacity"
                      >
                        <p className="w-[20px] h-[20px] text-[#000000] leading-[18px] text-[28px]">
                          -
                        </p>
                      </button>
                      <p className="w-[9px] h-[19px] font-[Satoshi] font-medium text-[14px] leading-[25.9px] text-[#000000]">
                        {e.quantity || 1}
                      </p>
                      <button
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: e._id,
                              quantity: (e.quantity || 1) + 1,
                            })
                          )
                        }
                        className="hover:opacity-70 transition-opacity"
                      >
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

        {/* Order Summary */}
        <div className="cart-checkout cart-items w-full lg:w-[505px] h-auto lg:h-[450px] rounded-[20px] flex flex-col gap-[24px] border border-[#0000001a] p-[24px] bg-white">
          <div className="w-auto lg:w-[179px] h-[32px] font-[Satoshi] font-bold text-[20px] sm:text-[22px] lg:text-[24px] leading-[28px] sm:leading-[30px] lg:leading-[32.4px] text-[#000000]">
            <p>Order Summary</p>
          </div>

          <div className="cart-price-section w-full lg:w-[457px] h-auto lg:h-[193px] flex flex-col gap-[20px]">
            <div className="sub-total w-full lg:w-[457px] h-[27px] flex justify-between">
              <p className="text-[#00000099] text-[16px] sm:text-[18px]">Subtotal</p>
              <p className="text-[#000000] font-bold text-[16px] sm:text-[18px]">${subtotal.toFixed(2)}</p>
            </div>

            <div className="sub-total w-full lg:w-[457px] h-[27px] flex justify-between">
              <p className="text-[#00000099] text-[16px] sm:text-[18px]">
                Discount({parseInt(discountPercent)}%)
              </p>
              <p className="text-[#FF3333] font-bold text-[16px] sm:text-[18px]">
                -${totalDiscount.toFixed(2)}
              </p>
            </div>

            <div className="sub-total w-full lg:w-[457px] h-[27px] flex justify-between">
              <p className="text-[#00000099] text-[16px] sm:text-[18px]">Delivery Fee</p>
              <p className="text-[#000000] font-bold text-[16px] sm:text-[18px]">${deliveryFee}</p>
            </div>

            <div className="border bg-[#0000001a] opacity-50 w-full lg:w-[457px] h-[1px]"></div>

            <div className="sub-total w-full lg:w-[457px] h-[27px] flex justify-between">
              <p className="text-[#000000] text-[18px] sm:text-[20px]">Total</p>
              <p className="text-[#000000] font-bold text-[18px] sm:text-[20px]">
                ${finalTotal.toFixed(2)}
              </p>
            </div>

            <div className="w-full lg:w-[457px] h-auto lg:h-[48px] flex flex-col sm:flex-row gap-[12px] sm:gap-[20px]">
              <div className="flex-1 w-full sm:w-[322px] h-[48px] rounded-[62px] py-[13px] px-[20px] bg-[#F0F0F0] flex gap-[12px]">
                <Tag className="w-[18px] h-[18px] text-[#00000066] mt-[4px]" />
                <input
                  type="text"
                  placeholder="Add promo code"
                  className="bg-transparent outline-none font-[Satoshi] font-normal text-[14px] sm:text-[16px] leading-[21.6px] text-[#000000] placeholder:text-[#00000066] w-full"
                />
              </div>
              <button className="w-full sm:w-[115px] h-[48px] rounded-[62px] py-[13px] px-[38px] bg-[#000000] hover:bg-[#333333] transition-colors">
                <p className="text-[#FFFFFF] text-[14px] sm:text-[16px]">Apply</p>
              </button>
            </div>
          </div>

          <button 
            className="w-full lg:w-[457px] h-[56px] rounded-[62px] px-[50px] py-[16px] gap-[12px] bg-[#000000] hover:bg-[#333333] transition-colors disabled:bg-[#cccccc] disabled:cursor-not-allowed"
            disabled={Cart.length === 0}
          >
            <p className="font-[Satoshi] font-medium text-[14px] sm:text-[16px] leading-[21.6px] text-[#FFFFFF]">
              Go to Checkout
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;