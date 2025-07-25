import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {


  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);

    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const res = await auth.login({email, password});
      localStorage.setItem("token", res.data.token)
      localStorage.setItem("user", JSON.stringify(res.data.user));
    
      navigate("/dashboard", {state: {user: res.data.user}});
    } catch (error) {
      console.log(error);
      alert("Invalid credentials");
    }
    
  }


  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#e4fbf8]">
      <div className="bg-white rounded-lg p-10">
        <h1 className="text-2xl font-bold text-[#02C6B3] text-center">Login</h1>


        <form className=" w-[500px]" onSubmit={handleSubmit}>
          <div className="flex flex-col ">
            <label className="text-sm font-bold mt-5">Email</label>
            <input required onChange={(e) => setEmail(e.target.value)} className="mt-2 border-2 border-gray-300 rounded-md p-2" type="email" placeholder="Enter your email" />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-bold mt-5">Password</label>
            <input required onChange={(e) => setPassword(e.target.value)} className="mt-2 border-2 border-gray-300 rounded-md p-2" type="password" placeholder="Enter your password" />
          </div>

          <button className="bg-[#02C6B3] text-white rounded-md p-2 mt-5 w-full hover:bg-blue-600 transition-all duration-300 cursor-pointer font-bold ">Login</button>

        </form>

        <p className="text-sm text-center mt-5">Don't have an account? <Link to="/signup"><span className="text-[#02C6B3]">Register</span></Link></p>
      </div>
    </div>
  );
}

export default Login;
