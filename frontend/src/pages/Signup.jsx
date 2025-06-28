import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../services/api';
import { useNavigate } from 'react-router-dom';

function Signup() {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [name, setName] = useState("");



  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, email, password);

    if (!name || !email || !password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const res = await auth.signup({name, email, password});
      localStorage.setItem("token", res.data.token)
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard", {state: {user: res.data.user}});

    } catch (error) {
      console.log(error);
      alert("Error signing up");
    }
    
  }


  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#e4fbf8]">
      <div className="bg-white rounded-lg p-10">
        <h1 className="text-2xl font-bold text-[#02C6B3] text-center">Signup</h1>


        <form className=" w-[500px]" onSubmit={handleSubmit}>

          <div className="flex flex-col">
            <label className="text-sm font-bold mt-5">Name</label>
            <input required onChange={(e) => setName(e.target.value)} className="mt-2 border-2 border-gray-300 rounded-md p-2" type="text" placeholder="Enter your name" />
          </div>


          <div className="flex flex-col ">
            <label className="text-sm font-bold mt-5">Email</label>
            <input required onChange={(e) => setEmail(e.target.value)} className="mt-2 border-2 border-gray-300 rounded-md p-2" type="email" placeholder="Enter your email" />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-bold mt-5">Password</label>
            <input required onChange={(e) => setPassword(e.target.value)} className="mt-2 border-2 border-gray-300 rounded-md p-2" type="password" placeholder="Enter your password" />
          </div>

          <button className="bg-[#02C6B3] text-white rounded-md p-2 mt-5 w-full hover:bg-blue-600 transition-all duration-300 cursor-pointer font-bold ">Signup</button>

        </form>

        <p className="text-sm text-center mt-5">Already have an account? <Link to="/login"><span className="text-[#02C6B3]">Login</span></Link></p>
      </div>
    </div>
  );
}

export default Signup
