import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: ""
  })
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = new URL("http://localhost:5000/fetchuser");
    const params = {
      email: loginInfo.email,
      password: loginInfo.password
  };
  // Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email:loginInfo.email,password: loginInfo.password})
    })
    const data = await response.json();
    console.log(data);
    if(data.success === true){
      localStorage.setItem("authToken", data.authToken );
      console.log(data.authToken);
      navigate('/');
    }
    else{
      alert("incorrect email or password");
    }
    
  }
  const handleChange = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  }
  return (
    <>
      <div className="container">
      <div style={{display: "flex", alignItems: "center", justifyContent:"center"}}>
                <h1>Login</h1>
            </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' value={loginInfo.email} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' value={loginInfo.password} onChange={handleChange} />
          </div>
          <button type="submit" className="m-3 btn btn-primary">Submit</button>
          <Link to="/signup" className="m-3 btn btn-danger">New user? Register here</Link>
        </form>
      </div>
    </>
  )
}
