import React from "react";
import email from "../../assets/email.png";
import twitter from "../../assets/twitter.png";
import facebook from "../../assets/facebook.png";
import instagram from "../../assets/instagram.png";
import github from "../../assets/github.png";
import visa from "../../assets/visa.png";
import mastercard from "../../assets/mastercard.png";
import paypal from "../../assets/paypal.png";
import i_pay from "../../assets/i_pay.png";
import g_pay from "../../assets/g_pay.png";
const Footer = () => {
  return (
    <footer className="Footer-main-container">
      <div className="container-1 flex-wrap sm:flex-nowrap lg:max-w-[1240px] max-w-[325px] lg:h-[180px] h-[325px] lg:ml-[136px] ml-[18px]">
        <div className="conatiner-1-text lg:w-[551px] lg:h-[94px] w-[297px] h-[115px]">
          <p className="lg:text-[40px] text-[32px] lg:leading-[45px] leading-[35px]">
            STAY UPTO DATE ABOUT OUR LATEST OFFERS
          </p>
        </div>

        <div className="container-1-contents w-[280px] h-[42px] sm:w-[349px] sm:h-[108px] ml-[-36px] lg:ml-0">
          <div className="email-con w-[280px] lg:w-[349px] ">
            <img src={email} alt="email" className="email-icon" />
            <input
              type="text"
              className="email-input lg:w-[349px] lg:h-[46px] w-[280px] h-[42px]"
              placeholder="Enter your email address"
            />
          </div>
          <div className="subscribe-btn-con lg:max-w-[349px] max-w-[280px] ">
            <button className="subscribe-btn lg:text-[16px] text-[14px] lg:w-[349px] w-[280px] lg:h-[46px] h-[42px]">
              Subscribe to Newsletter
            </button>
          </div>
        </div>
      </div>
      <div className="container-2  w-full lg:h-[266px] h-[640px] lg:flex-nowrap flex-wrap">
        <div className="container-2-sub-con lg:flex-nowrap flex-wrap lg:max-w-[1240px] max-w-[392px] lg:ml-[100px] ml-[28px] ">
          <div className="container-2-content-1">
            <div>
              <span className=" container-logo lg:text-[33px] text-[28.85px]">
                SHOP.CO
              </span>
            </div>
            <div className="desp lg:w-[275px] lg:h-[48px] w-[330px] h-[40px] leading-[20px] lg:leading-[22px]">
              <p>
                We have clothes that suits your style and which you are proud to
                wear. From women to men.
              </p>
            </div>
            <div className="social-media-logos">
              <div className="twitter social-logo">
                <img src={twitter} alt="twitter" />
              </div>
              <div className="facebook social-logo">
                <img src={facebook} alt="facebook" />
              </div>
              <div className="instagram social-logo">
                <img src={instagram} alt="instagram" />
              </div>
              <div className="github social-logo">
                <img src={github} alt="github" />
              </div>
            </div>
          </div>
          <div className="flex lg:gap-[128px] gap-[50px]  max-w-[400px] lg:max-w-[800px] lg:flex-nowrap flex-wrap">
            <div className="container-2-content">
              <div className="container-2-content-title">
                <span>COMPANY</span>
              </div>
              <ul className="container-2-content-elements">
                <li className="container-2-content-element element">About </li>
                <li className="container-2-content-element element">
                  Features
                </li>
                <li className="container-2-content-element element">Works</li>
                <li className="container-2-content-element element">Career</li>
              </ul>
            </div>
            <div className="container-2-content ">
              <div className="container-2-content-title">
                <span>HELP</span>
              </div>

              <ul className="container-2-content-elements">
                <li className="container-2-content-element element">
                  Customer Support
                </li>
                <li className="container-2-content-element element">
                  Delivery Details
                </li>
                <li className="container-2-content-element element">
                  Terms & Conditions
                </li>
                <li className="container-2-content-element element">
                  Privacy Policy
                </li>
              </ul>
            </div>
            <div className="container-2-content">
              <div className="container-2-content-title">
                <span>FAQ</span>
              </div>

              <ul className="container-2-content-elements">
                <li className="container-2-content-element element">
                  Account{" "}
                </li>
                <li className="container-2-content-element element">
                  Manage Deliveries
                </li>
                <li className="container-2-content-element element">Orders</li>
                <li className="container-2-content-element element">
                  Payments
                </li>
              </ul>
            </div>
            <div className="container-2-content lg:w-[104px] w-[159px]">
              <div className="container-2-content-title">
                <span>RESOURCES</span>
              </div>

              <ul className="container-2-content-elements ">
                <li className="container-2-content-element element">
                  Free eBooks
                </li>
                <li className="container-2-content-element element">
                  Development Tutorial
                </li>
                <li className="container-2-content-element element">
                  How to - Blog
                </li>
                <li className="container-2-content-element element">
                  Youtube Playlist
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-line lg:w-[1278px] w-[320px]   lg:mt-[15px] lg:ml-[99px] mt-[370px] ml-[22px]"></div>
        <div className="container-3 lg:max-w-[1288px] max-w-[392px] lg:ml-[92px] ml-[60px] gap-[20px] lg:gap-0 lg:mt-0 mt-[10px] flex-wrap lg:flex-nowrap">
          <div className="container-3-content">
            <span className="container-3-content-text">
              Shop.co © 2000-2023, All Rights Reserved.
            </span>
          </div>
          <div className="payment-logos mt-1">
            <div className="visa">
              <img src={visa} alt="logo" />
            </div>
            <div className="visa">
              <img src={mastercard} alt="logo" />
            </div>
            <div className="visa">
              <img src={paypal} alt="logo" />
            </div>
            <div className="visa">
              <img src={i_pay} alt="logo" />
            </div>
            <div className="visa">
              <img src={g_pay} alt="logo" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
