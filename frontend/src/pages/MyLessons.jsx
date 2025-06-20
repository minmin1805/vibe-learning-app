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
      console.log(res.data.user);
      const lessonsRes = await lesson.getLessons();
      console.log(lessonsRes.data.lessons);
      setLessons(lessonsRes.data.lessons);
    }
    fetchUser();
  }, []);

  return (
    <div className="bg-gray-100 h-screen">
      <TopNavBar user={user} />
      
    <div className="flex flex-col justify-center m-5">


        <h1 className="text-2xl font-bold mt-7">My Lessons</h1>

        <div className="grid grid-cols-3 m-2 bg-white rounded-lg p-4 shadow-md">

            {lessons.map((eachLesson) => (
                <LessonCard key={eachLesson._id} lesson={eachLesson} />
            ))}
        </div>
    </div>

    </div>
  )
}

export default MyLessons
