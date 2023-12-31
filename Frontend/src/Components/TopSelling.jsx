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
    <div className="component_1">
      <span className="title">TOP SELLING</span>
      <div className="con-New_Arrival">
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
        <button className="view_btn" onClick={Click_Handler}>
          <span className="View_text">{isfull ? `View Less` : `View All`}</span>
        </button>
      </div>
    </div>
  );
};

export default TopSelling;
