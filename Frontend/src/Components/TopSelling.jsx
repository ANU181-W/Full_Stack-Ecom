import { React, useEffect } from "react";
import { useState } from "react";
import { getData } from "./Data/Data.js";
import Card from "./Card";

const TopSelling = () => {
  const [items, setItem] = useState([]);
  const [isfull, setisfull] = useState(false);
  useEffect(() => {
    getData()
      .then((data) => setItem(data.items))
      .catch((err) => console.log(err));
  }, []);
  console.log(items);
  const Click_Handler = () => {
    setisfull(!isfull);
  };
  return (
    <div className="component_1 ">
      <span className="title w-[269px] h-[38px] lg:w-[403px] lg:h-[58px] text-center text-[32px] lg:text-[44px] leading-[38.4px] lg:leading-[57px] lg:ml-[73px]  mr-[20px] lg:mr-0">
        TOP SELLING
      </span>
      <div className="flex flex-wrap gap-[35px] lg:max-w-[1305px] max-w-[324px] ">
        {isfull
          ? items.map((item) => (
              <Card
                key={item._id}
                id={item._id}
                title={item.title}
                price={item.price}
                rating={item.rating}
                image={item.image_url}
                discount={item.discount}
              />
            ))
          : items
              .slice(4, 8)
              .map((item) => (
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
      <div className="view_all_btn">
        <button
          className="view_btn lg:w-[218px] w-[325px]"
          onClick={Click_Handler}
        >
          <span className="View_text">{isfull ? `View Less` : `View All`}</span>
        </button>
      </div>
    </div>
  );
};

export default TopSelling;
