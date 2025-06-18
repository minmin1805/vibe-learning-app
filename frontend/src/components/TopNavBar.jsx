import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

function TopNavBar({user}) {

    const linkElements = [
        {name: "Dashboard", path: "/dashboard"},
        {name: "Upload Content", path: "/upload"},
        {name: "My Lessons", path: "/lessons"},
        {name: "Journal", path: "/journal"}
    ]


    console.log(user);
    

  return (

    
    <div>
      
      <div className='flex justify-between items-center p-4 w-full h-16 bg-white shadow-md'>
        <div>
            <h2 className="text-2xl font-bold text-blue-800">Vibe Learning</h2>
        </div>

        <div className='flex gap-4'>
            {linkElements.map((eachElement, index) => (
                <Link key={index} to={eachElement.path} className='text-blue-800 font-semibold'>{eachElement.name}</Link>
            ))}
        </div>

        <div>
            <h2 className='text-white font-bold rounded-full bg-blue-800 px-4 py-2 w-10 h-10 flex items-center justify-center'>MD</h2>
        </div>
      </div>
    </div>
  )
}

export default TopNavBar
