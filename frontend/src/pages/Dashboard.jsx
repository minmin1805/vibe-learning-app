import React, { useEffect, useState } from "react";
import TopNavBar from "../components/TopNavBar";
import { auth } from "../services/api";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await auth.getProfile();
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
      } catch (err) {
        console.log(err);
        alert("Error fetching profile");
        navigate("/login");
      }
    }
    fetchProfile();
  }, []);

  return (
    <div className="bg-blue-50 h-screen">
      <TopNavBar user={user} />

      <div className="flex flex-col justify-center m-3">
        <h1 className="text-2xl font-bold mt-8">Welcome, {user?.name}!</h1>
        <p className="text-gray-500 mt-2">
          Continue your journey or start something new
        </p>

        <div className="grid grid-cols-4 gap-4 mt-8 md:grid-cols-3 sm:grid-cols-2">
          <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center flex-col">
            <h2 className="text-2xl font-bold text-blue-800">12</h2>
            <p className="text-gray-500">Lessons Completed</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center flex-col">
            <h2 className="text-2xl font-bold text-blue-800">5</h2>
            <p className="text-gray-500">Days Streak</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center flex-col">
            <h2 className="text-2xl font-bold text-blue-800">85%</h2>
            <p className="text-gray-500">Quiz Accuracy</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center flex-col">
            <h2 className="text-2xl font-bold text-blue-800">8</h2>
            <p className="text-gray-500">Journal Entries</p>
          </div>
        </div>

        
        <div className="flex flex-col mt-8 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-blue-800 mb-4">Quick Upload</h2>

          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pb-3">

            <Link to="/upload">
            <div className="flex flex-col items-center justify-center border-1 p-3 rounded-2xl shadow-md">
              <h2>🔗</h2>
              <h2>Link</h2>
              <p>Upload any web article into a lesson</p>
            </div></Link>

            <Link to="/upload">
            <div className="flex flex-col items-center justify-center border-1 p-3 rounded-2xl shadow-md">
              <h2>📑</h2>
              <h2>PDF</h2>
              <p>Upload documents for AI analysis</p>
            </div></Link>

            <Link to="/upload">
            <div className="flex flex-col items-center justify-center border-1 p-3 rounded-2xl shadow-md">
              <h2>🎥</h2>
              <h2>Youtube</h2>
              <p>Learn from video content</p>
            </div></Link>
          </div>
        </div>

        <div className="flex flex-col mt-8 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-blue-800 mb-4">
            Recent Lessons
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

            <div className="flex flex-col justify-center rounded-2xl shadow-md p-3 bg-amber-200">
              <h2 className="text-xl font-bold text-black">Introduction to Machine Learning</h2>
              <p className="text-gray-500">75% Complete</p>
              <div className="w-full bg-gray-200 rounded-full h-3 mt-2 mb-2">
                <div
                  className="bg-blue-600 h-3 rounded-full"
                  style={{ width: "75%" }}
                ></div>
              </div>
              <p className="text-gray-500 text-sm">Last Updated: 12/06/2025</p>
            </div>

            <div className="flex flex-col justify-center rounded-2xl shadow-md p-3 bg-red-200">
              <h2 className="text-xl font-bold text-black">The history of Quantum Computing</h2>
              <p className="text-gray-500">Completed</p>
              <p className="text-gray-500 text-sm mt-7">Last Updated: 12/06/2025</p>
            </div>

            <div className="flex flex-col justify-center rounded-2xl shadow-md p-3 bg-amber-200">
              <h2 className="text-xl font-bold text-black">Modern Web Development Frameworks</h2>
              <p className="text-gray-500">30% Complete</p>
              <div className="w-full bg-gray-200 rounded-full h-3 mt-2 mb-2">
                <div
                  className="bg-blue-600 h-3 rounded-full"
                  style={{ width: "30%" }}
                ></div>
              </div>
              <p className="text-gray-500 text-sm">Last Updated: 12/06/2025</p>
            </div>

            <div className="flex flex-col justify-center rounded-2xl shadow-md p-3 bg-green-200">
              <h2 className="text-xl font-bold text-black">The Future of AI</h2>
              <p className="text-gray-500">90% Complete</p>
              <div className="w-full bg-gray-200 rounded-full h-3 mt-2 mb-2">
                <div
                  className="bg-blue-600 h-3 rounded-full"
                  style={{ width: "90%" }}
                ></div>
              </div>
              <p className="text-gray-500 text-sm">Last Updated: 12/06/2025</p>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
