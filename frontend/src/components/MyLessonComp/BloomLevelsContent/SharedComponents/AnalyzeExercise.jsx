import React from "react";

function AnalyzeExercise({ exercise, index }) {
  return (
    <div className="flex flex-col gap-2 mt-3 bg-blue-100 p-3 py-5 rounded-md border-x-3 border-blue-400">
      <h2 className=" font-bold text-blue-800 text-2xl">
        AI-Generated Analysis Exercise
      </h2>
      <p className="text-[#2D2F4A]">Analyze why each algorithm choice makes sense for these scenarios:</p>

      <div className="flex flex-col p-2 rounded-md bg-gray-50">
        <h2 className="font-bold text-blue-600 text-xl">Scenario {index}: {exercise.scenario}</h2>
        <p className="text-[#2D2F4A] text-md mt-3">{exercise.analysisPrompt}</p>
        <select className="w-full p-2 rounded-md bg-white mt-3 mb-5">
          <option value="" disabled selected>
            Select an approach
          </option>
          {exercise.reasonOptions?.map((eachOption, index) => (
            <option key={index} value={eachOption}>
              {eachOption}
            </option>
          ))}
        </select>

        <h2 className="font-bold text-black text-xl">Justification: </h2>
        <textarea className="w-full p-2 rounded-md bg-white mt-3" placeholder="Enter your justification here..."/>

        <button className="w-full p-2 rounded-md bg-blue-500 text-white mt-3">
          Submit
        </button>
      </div>
    </div>
  );
}

export default AnalyzeExercise;
