import React from 'react';

function EvaluationFramework({ data }) {
  if (!data) {
    return null;
  }

  const { title, context, criteria } = data;

  return (
    <div className="bg-yellow-100 p-6 rounded-lg shadow-md my-6 border-x-5 border-yellow-400">
      <h2 className="text-2xl font-bold mb-4 text-yellow-700">{title}</h2>
      <p className="mb-4 text-[#2D2F4A]">{context}</p>
      <div>
        <h4 className="font-semibold text-lg mb-2">Evaluation Criteria:</h4>
        <ul className="list-disc list-inside pl-4 space-y-2">
          {criteria?.map((item, index) => (
            <li key={index} className="text-[#2D2F4A]">{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default EvaluationFramework; 