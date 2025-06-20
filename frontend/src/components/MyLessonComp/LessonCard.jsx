import React from 'react'

function LessonCard({lesson}) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <h1>{lesson.title}</h1>
      <p>{lesson.createdAt}</p>
      <p>{lesson.summary}</p>
    </div>
  )
}

export default LessonCard
