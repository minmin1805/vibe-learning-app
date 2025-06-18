import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login() {


  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");



  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);

    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }
    
  }


  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-100">
      <div className="bg-white rounded-lg p-10">
        <h1 className="text-2xl font-bold text-blue-700 text-center">Login</h1>


        <form className=" w-[500px]" onSubmit={handleSubmit}>
          <div className="flex flex-col ">
            <label className="text-sm font-bold mt-5">Email</label>
            <input required onChange={(e) => setEmail(e.target.value)} className="mt-2 border-2 border-gray-300 rounded-md p-2" type="email" placeholder="Enter your email" />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-bold mt-5">Password</label>
            <input required onChange={(e) => setPassword(e.target.value)} className="mt-2 border-2 border-gray-300 rounded-md p-2" type="password" placeholder="Enter your password" />
          </div>

          <button className="bg-blue-500 text-white rounded-md p-2 mt-5 w-full hover:bg-blue-600 transition-all duration-300 cursor-pointer font-bold ">Login</button>

        </form>

        <p className="text-sm text-center mt-5">Don't have an account? <Link to="/signup"><span className="text-blue-500">Register</span></Link></p>
      </div>
    </div>
  );
}

export default Login;
