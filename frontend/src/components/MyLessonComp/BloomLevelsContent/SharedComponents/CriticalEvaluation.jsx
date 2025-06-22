import React, { useState } from 'react';

function CriticalEvaluation({ data }) {
  if (!data) {
    return null;
  }

  const { scenario, concernOptions, metricsPrompt, solutionPrompt, feedback } = data;
  const [selectedConcerns, setSelectedConcerns] = useState([]);
  const [metrics, setMetrics] = useState('');
  const [solution, setSolution] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleConcernToggle = (concern) => {
    setSelectedConcerns(prev =>
      prev.includes(concern)
        ? prev.filter(c => c !== concern)
        : [...prev, concern]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-blue-50 p-6 rounded-lg shadow-md my-6">
      <h3 className="text-2xl font-bold mb-4 text-gray-800">Critical Evaluation</h3>
      <p className="mb-4 text-gray-700">{scenario}</p>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <h4 className="font-semibold text-lg mb-2 text-gray-800">Identify Key Concerns:</h4>
          <div className="space-y-2">
            {concernOptions?.map((concern, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="checkbox"
                  id={`concern-${index}`}
                  value={concern}
                  checked={selectedConcerns.includes(concern)}
                  onChange={() => handleConcernToggle(concern)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor={`concern-${index}`} className="ml-3 block text-sm font-medium text-gray-700">
                  {concern}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="metrics" className="block text-lg font-semibold mb-2 text-gray-800">{metricsPrompt}</label>
          <textarea
            id="metrics"
            rows="4"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
            value={metrics}
            onChange={(e) => setMetrics(e.target.value)}
            placeholder="Your suggestions..."
          ></textarea>
        </div>

        <div className="mb-6">
          <label htmlFor="solution" className="block text-lg font-semibold mb-2 text-gray-800">{solutionPrompt}</label>
          <textarea
            id="solution"
            rows="4"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
            value={solution}
            onChange={(e) => setSolution(e.target.value)}
            placeholder="Your proposed solution..."
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Submit Evaluation
        </button>
      </form>

      {submitted && (
        <div className="mt-6 p-4 border-l-4 border-green-500 bg-green-50">
          <h4 className="font-bold text-green-800">Feedback</h4>
          <p className="text-green-700">{feedback}</p>
        </div>
      )}
    </div>
  );
}

export default CriticalEvaluation; 