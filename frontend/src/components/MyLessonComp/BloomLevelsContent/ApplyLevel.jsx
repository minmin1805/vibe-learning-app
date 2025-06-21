import React from 'react'

function ApplyLevel({ title, content }) {

  console.log(content);

  const {learningObjectives, conceptExplanation, examples, interactiveComparison, understandingCheck} = content


  return (
    <div>
      <h1>Apply Level</h1>
    </div>
  )
}

export default ApplyLevel
