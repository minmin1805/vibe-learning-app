import React from 'react';

function EvaluationFramework({ data }) {
  if (!data) {
    return null;
  }

  const { title, context, criteria } = data;

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md my-6">
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="mb-4 text-gray-700">{context}</p>
      <div>
        <h4 className="font-semibold text-lg mb-2">Evaluation Criteria:</h4>
        <ul className="list-disc list-inside pl-4 space-y-2">
          {criteria?.map((item, index) => (
            <li key={index} className="text-gray-600">{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default EvaluationFramework; 