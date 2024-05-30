import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function MyOrders() {
    const [orderData, setOrderData] = useState("");
    const fetchMyOrder = async()=>{
        const response = await fetch("http://localhost:5000/myorders", {
            // credentials: 'include',
            // Origin:"http://localhost:3000/login",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                email:localStorage.getItem('userEmail')
            })
        })
        const text = response.text();
        console.log("text:",text);
        const data = JSON.parse(text);
        setOrderData(data);
        console.log("data:",data);
        // console.log("fetch:",fetch)
    }
    useEffect(()=>{
        fetchMyOrder();
    },[])
    console.log("orderData:",orderData);
    return (
        <div>
            <div>
                <Navbar />
            </div>
            <h1>My Orders</h1>
            <div className='container'>
                <div className='row'>
                    {orderData != {} ? Array(orderData).map(data => {
                        return (
                            data.orderData ?
                                data.orderData.orderData.slice(0).reverse().map((item) => {
                                    return (
                                        item.map((arrayData) => {
                                            return (
                                                <div>
                                                    {arrayData.Order_date ? <div className='m-auto mt-5'>
                                                        {data = arrayData.Order_date}
                                                        <hr />
                                                    </div> :
                                                        <div className='col-12 col-md-6 col-lg-3'>
                                                            <div className='card mt-3' style={{ width: "16rem", maxHeight: "360px" }}>
                                                                <div className='card-body'>
                                                                    <h5 className='card-title'>{arrayData.name}</h5>
                                                                    <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                        <span className='m-1'>{arrayData.qty}</span>
                                                                        <span className='m-1'>{arrayData.size}</span>
                                                                        <span className='m-1'>{data}</span>
                                                                        <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                                                            ₹{arrayData.price}/-
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        }
                                                        </div>
                                            )
                                        })
                                                    )
                                }): ""
                                                    )
                    }):""}
                                                </div>
            </div>

                <div>
                    <Footer />
                </div>
            </div>
            )
}
