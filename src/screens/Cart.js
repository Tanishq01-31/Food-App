import React from 'react'
import { useCart, useDispatchCart } from '../components/ContextReducer'
import { useNavigate } from 'react-router-dom'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete'

export default function Cart() {
    const navigate = useNavigate();
    let data = useCart();
    let dispatch = useDispatchCart();
    if (data.length === 0) {
        return (
            <div className='m-5 w-100 text-center text-info fs-3'>The Cart is Empty!</div>
        )
    }
    let totalPrice = data.reduce((total, food) => total + food.price, 0);

    const handleClick = async (e) =>{
        const usrEmail = localStorage.getItem('userEmail');
        console.log(usrEmail);
        const url = new URL("http://localhost:5000/createOrder");
        const response = await fetch(url, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email:usrEmail,order_data: data,order_date: new Date().toDateString()})
    })
    const ordrData = await response.json();
    console.log(ordrData);
    if(ordrData.success === true){
      dispatch({type: 'DROP'});
      navigate('/');
    }
    else{
      alert("An error occured while checking out!");
    }
    }

    return (
        <div>
            <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
                <table className='table table-hover'>
                    <thead className='thead-dark fs-4'>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Quantity</th>
                            <th scope='col'>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((food, index) => (
                            <tr>
                                <th scope='row'>{index + 1}</th>
                                <td>{food.name}</td>
                                <td>{food.qty}</td>
                                <td>{food.size}</td>
                                <td>{food.price}</td>
                                <td><IconButton aria-label="delete" onClick={()=>{dispatch({type: "REMOVE", index: index})}}>
                                    <DeleteIcon />
                                </IconButton>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
                <div>
                    <button className='btn bg-info mt-5' onClick={handleClick}>Check Out</button>
                </div>
            </div>
        </div>
    )
}
