import React from "react";
import { NavLink } from "react-router-dom";

function TopNavBar({ user }) {
  const linkElements = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Upload Content", path: "/upload" },
    { name: "My Lessons", path: "/my-lessons" },
    { name: "Journal", path: "/journal" },
  ];

  const userInitials = user?.name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("");

  return (
    <div>
      <div className="flex justify-between items-center p-4 w-full h-16 bg-white shadow-md">
        <div>
          <h2 className="text-2xl font-bold text-blue-800">Vibe Learning</h2>
        </div>

        <div className="flex gap-4">
          {linkElements.map((eachElement, index) => (
            <NavLink
              key={index}
              to={eachElement.path}
              className={({ isActive }) =>
                `font-semibold ${isActive ? "text-blue-800" : "text-black"}`
              }
            >
              {eachElement.name}
            </NavLink>
          ))}
        </div>

        <div>
          <h2 className="text-white font-bold rounded-full bg-blue-800 px-4 py-2 w-10 h-10 flex items-center justify-center">
            {userInitials}
          </h2>
        </div>

      </div>
    </div>
  );
}

export default TopNavBar;
