import TopNavBar from '../components/TopNavBar'
import { auth, lesson} from '../services/api'
import React, { useEffect, useState } from 'react'
import LessonCard from '../components/MyLessonComp/LessonCard'

function MyLessons() {
  const [user, setUser] = useState(null);
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await auth.getProfile();
      setUser(res.data.user);
      const res2 = await lesson.getLessons();
      console.log(res2.data);
      setLessons(res2.data.lessons);
    }
    fetchUser();
  }, []);

  return (
    <div>
      <TopNavBar user={user} />
      
    <div className="flex flex-col justify-center m-5">


        <h1 className="text-2xl font-bold mt-7">My Lessons</h1>

        <div className="grid grid-cols-3 m-2">

            
        </div>
    </div>

    </div>
  )
}

export default MyLessons
