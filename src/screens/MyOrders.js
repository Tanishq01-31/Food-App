import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MyOrders() {
  const [orderData, setOrderData] = useState(null);
  const fetchMyOrder = async () => {
    try {
      const response = await fetch("http://localhost:5000/myorders", {
        // credentials: 'include',
        // Origin:"http://localhost:3000/login",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("userEmail"),
        }),
      });
      console.log("respopnse:", response);
      const text = await response.text();
      console.log("text:", text);
      const data = JSON.parse(text);
      setOrderData(data);
      console.log("data:", data);
      // console.log("fetch:",fetch)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchMyOrder();
  }, []);
  console.log("orderData:", orderData);
  if (!orderData) {
    return <p>Loading...</p>; // Handle the case where data is still being fetched
  }

  const orders = orderData.order_data || []; // Default to empty array if undefined

  return (
    <div>
      <Navbar />
      <h1>My Orders</h1>
      <div className="container">
        <div className="row">
          {orders.length > 0 ? (
            orders.map((data, index) => (
              <div key={index}>
                <div className="m-auto mt-5">
                  <strong>Order Date:</strong>{" "}
                  {new Date(data.Order_date).toDateString()}
                  <hr />
                </div>
                {data.map((order, orderIndex) => (
                  <div key={orderIndex} className="col-12 col-md-6 col-lg-3">
                    <div
                      className="card mt-3"
                      style={{
                        width: "16rem",
                        maxHeight: "360px",
                      }}
                    >
                      <img
                        src={order.img}
                        className="card-img-top"
                        alt={order.name}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{order.name}</h5>
                        <div
                          className="container w-100 p-0"
                          style={{ height: "38px" }}
                        >
                          <span className="m-1">{order.qty}</span>
                          <span className="m-1">{order.size}</span>
                          <div className="d-inline ms-2 h-100 w-20 fs-5">
                            ₹{order.price}/-
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <p>No orders available</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
