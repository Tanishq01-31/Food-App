import React,{useState} from 'react'
import {Link} from 'react-router-dom'

export default function Signup() {
    const [userInfo,setUserInfo] = useState({
        name : "",
        email : "",
        password : "", 
        geolocation : ""
    })
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const response = await fetch('http://localhost:5000/createuser',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name:userInfo.name,email:userInfo.email,location:userInfo.geolocation,password:userInfo.password})
        });
        const data = await response.json();
        if(data.success === true){
            window.location.href = '/login';
          }
          else{
            alert("incorrect email or password");
          }
        console.log(data);
    }
    const handleChange = (e)=>{
        setUserInfo({...userInfo,[e.target.name] : e.target.value})
    }
    return (
        <>
            <div className="container">
            <div style={{display: "flex", alignItems: "center", justifyContent:"center"}}>
                <h1>Sign Up</h1>
            </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3" >
                        <label htmlFor="username" className="form-label">Name</label>
                        <input type="text" className="form-control" name='name' value={userInfo.name} onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" name='email' value={userInfo.email} onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="location" className="form-label">Adress</label>
                        <input type="text" className="form-control" name='geolocation' value={userInfo.geolocation} onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" name='password' value={userInfo.password} onChange={handleChange}/>
                    </div>
                    <button type="submit" className="m-3 btn btn-primary">Submit</button>
                    <Link to="/login" className="m-3 btn btn-danger">Already a user</Link>
                </form>
            </div>
        </>
    )
}
