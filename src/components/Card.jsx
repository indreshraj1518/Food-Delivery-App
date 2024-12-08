import React, { useEffect, useRef, useState } from "react";
import { useDispatchCard, useCard } from "./contextReducer";

export default function Card(props) {
  let options = props.options;
  let priceOptions = Object.keys(options);
  let dispatch = useDispatchCard();
  let data = useCard();
  // let foodItem = props.foodItems;
  let priceRef = useRef();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const handleAddToCard = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;
        break;
      }
    }
    if (food !== null) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: props.foodItem._id,
          price: finalPrice,
          qty: qty,
        });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: props.foodItem._id,
          name: props.foodItem.name,
          price: finalPrice,
          qty: qty,
          size: size,
          img: props.foodItem.img,
        });
        return;
      }
      return;
    }
    await dispatch({
      type: "ADD",
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size,
      img: props.foodItem.img,
    });
    // console.log(data);
  };
  let finalPrice = qty * parseInt(options[size]);
  useEffect(() => {
    setSize(priceRef.current.value);
    console.log(data);
  }, []);

  return (
    <div>
      <div>
        <div className="card" style={{ width: "18rem", maxWidth: "360px" }}>
          <img
            src={props.foodItem.img}
            className="card-img-top"
            alt="..."
            style={{ height: "140px", objectFit: "fill" }}
          />
          <div className="card-body">
            <h5 className="card-title">{props.foodItem.name}</h5>
            <p className="card-text">this is the card text</p>
            <div className="container w-100">
              <select
                name=""
                id=""
                className="m-2 h-100 bg-success rounded"
                onChange={(e) => setQty(e.target.value)}
              >
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </select>
              <select
                name=""
                id=""
                className="m-2 h-100 bg-success rounded"
                ref={priceRef}
                onChange={(e) => setSize(e.target.value)}
              >
                {priceOptions.map((data) => {
                  return (
                    <option key={data} value={data}>
                      {data}
                    </option>
                  );
                })}
              </select>
              <div className="d-inline h-100 fs-5">₹{finalPrice}/-</div>
            </div>
          </div>
          <hr />
          <button
            className="btn btn-success justify-content-center fs-5 mx-5 mb-3 "
            onClick={handleAddToCard}
          >
            add to card
          </button>
        </div>
      </div>
    </div>
  );
}
