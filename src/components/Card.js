import React, { useEffect, useRef, useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

export default function Card(props) {
  let dispatch = useDispatchCart();
  let data = useCart();
  let options = props.foodOptions;
  let priceOptions = Object.keys(options);
  const [quant, setQuant] = useState(1);
  const [size, setSize] = useState("");
  const ref = useRef();
  useEffect(() => {
    setSize(ref.current.value);
  }, []);

  const handleAddToCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;
        break;
      }
    }
    if (food != []) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: props.foodItem._id,
          price: Price,
          qty: quant,
        });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: props.foodItem._id,
          name: props.foodItem.name,
          price: Price,
          qty: quant,
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
      price: Price,
      qty: quant,
      size: size,
      img: props.foodItem.img,
    });

    // console.log(data);
  };

  let Price = quant * parseInt(options[size]);

  return (
    <div className="card mt-3 card-style" style={{ width: "18rem" }}>
      <img
        className="card-img-top"
        src={props.foodItem.img}
        alt="Card cap"
        style={{ height: "180px", objectFit: "fill" }}
      />
      <div className="card-body">
        <h5 className="card-title">{props.foodItem.name}</h5>
        {/* <p className="card-text">Example Text</p> */}
        <select
          className="m-2 h-100 bg-succes w-10"
          onChange={(e) => setQuant(e.target.value)}
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
          className="m-2 h-100 bg-succes"
          ref={ref}
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
        <div className="d-inline h-100 ms-4 price">{Price}/-</div>
        <button
          className="btn card-btn justify-center w-100"
          onClick={handleAddToCart}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}
