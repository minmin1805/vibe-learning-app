import React from "react";

function ProblemSolvingChallenge({ scenario, index }) {
  return (
    <div className="flex flex-col gap-2 mt-3 bg-blue-100 p-2 rounded-md border-x-3 border-blue-400">
      <h3 className=" font-bold text-blue-800">
        Scenario {index}: {scenario.scenario}
      </h3>
      <p>{scenario.justificationPrompt}</p>

      <div className="flex flex-col p-2 rounded-md bg-gray-50">
        <h2 className="font-bold text-black text-[20px]">Approaches: </h2>
        <select className="w-full p-2 rounded-md bg-white mt-3">
          <option value="" disabled selected>Select an approach</option>
          {scenario.approachOptions?.map((eachOption, index) => (
            <option  key={index} value={eachOption}>
              {eachOption}
            </option>
          ))}
        </select>

        <h2 className="font-bold text-black text-[20px]">Justification: </h2>
        <textarea className="w-full p-2 rounded-md bg-white mt-3" />

        <button className="w-full p-2 rounded-md bg-blue-500 text-white mt-3">Submit</button>
      </div>
    </div>
  );
}

export default ProblemSolvingChallenge;
