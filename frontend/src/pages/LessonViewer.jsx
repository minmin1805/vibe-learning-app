import React from 'react'
import { lesson } from '../services/api'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

function LessonViewer() {
  const { id } = useParams();
  const [lessonData, setLessonData] = useState(null);


  useEffect(() => {
    const fetchLesson = async () => {
      try {
        console.log("Fetching lesson with ID:", id);
        const res = await lesson.getLessonById(id);
        setLessonData(res.data.lesson);
      } catch (error) {
        console.error("Failed to fetch lesson:", error);
      }
    };

    if (id) {
      fetchLesson();
    }
  }, [id]);

  useEffect(() => {
    if (lessonData) {
      console.log("Lesson data updated:", lessonData);
    }
  }, [lessonData]);

  if (!lessonData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{lessonData?.title}</h1>
      <p>{lessonData?.summary}</p>
      <p>{lessonData?.createdAt}</p>
      <p>{lessonData?.updatedAt}</p>
      <p>{lessonData?.status}</p>
      <p>{lessonData.userId}</p>
    </div>
  )
}

export default LessonViewer
