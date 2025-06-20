import TopNavBar from '../components/TopNavBar'
import { auth, lesson} from '../services/api'
import React, { useEffect, useState } from 'react'
import LessonCard from '../components/MyLessonComp/LessonCard'
import LessonViewer from './LessonViewer'
import { useNavigate } from 'react-router-dom';

function MyLessons() {
  const [user, setUser] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [chosenLesson, setChosenLesson] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      const res = await auth.getProfile();
      setUser(res.data.user);
      const lessonsRes = await lesson.getLessons();
      setLessons(lessonsRes.data.lessons);
    }
    fetchUser();
  }, []);

  const handleLessonClick = (lesson) => {
    setChosenLesson(lesson);
    console.log(lesson._id);
    navigate(`/my-lessons/${lesson._id}`);
  }

  return (
    <div className="bg-gray-100 h-screen">
      <TopNavBar user={user} />
      
    <div className="flex flex-col justify-center m-5">


        <h1 className="text-2xl font-bold mt-7">My Lessons</h1>

        <div className="grid grid-cols-3 m-2 bg-white rounded-lg p-4 shadow-md gap-4">

            {lessons.map((eachLesson) => (
                <LessonCard handleLessonClick={handleLessonClick} key={eachLesson._id} lesson={eachLesson} />
            ))}
        </div>
    </div>

    </div>
  )
}

export default MyLessons
