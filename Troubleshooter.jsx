import React, { useState } from "react";
import logic from "./troubleshooting.logic.json";

export default function Troubleshooter() {
  const [activeProblem, setActiveProblem] = useState(null);
  const [activeStepId, setActiveStepId] = useState(null);
  const [result, setResult] = useState(null);

  const reset = () => {
    setActiveProblem(null);
    setActiveStepId(null);
    setResult(null);
  };

  const startProblem = (problem) => {
    setActiveProblem(problem);
    setActiveStepId(problem.steps[0].id);
    setResult(null);
  };

  const currentStep =
    activeProblem?.steps.find((s) => s.id === activeStepId) || null;

  const handleAnswer = (answer) => {
    const next = currentStep[answer];

    if (typeof next === "string") {
      setActiveStepId(next);
    } else if (typeof next === "object") {
      setResult(next);
      setActiveStepId(null);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 font-sans">
      <h1 className="text-2xl font-bold text-blue-700 mb-2">
        Air Compressor Troubleshooting
      </h1>

      <p className="text-sm text-gray-600 mb-6">
        {logic.meta.safety_notice}
      </p>

      {!activeProblem && (
        <div>
          <h2 className="text-lg font-semibold mb-4">
            Select a problem:
          </h2>
          <div className="space-y-2">
            {logic.problems.map((problem) => (
              <button
                key={problem.id}
                onClick={() => startProblem(problem)}
                className="w-full bg-blue-600 text-white p-3 rounded"
              >
                {problem.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {activeProblem && currentStep && (
        <div>
          <h2 className="text-lg font-semibold mb-4">
            {currentStep.question}
          </h2>
          <div className="flex gap-4">
            <button
              className="flex-1 bg-green-600 text-white p-3 rounded"
              onClick={() => handleAnswer("yes")}
            >
              Yes
            </button>
            <button
              className="flex-1 bg-red-600 text-white p-3 rounded"
              onClick={() => handleAnswer("no")}
            >
              No
            </button>
          </div>
        </div>
      )}

      {result && (
        <div className="mt-6 bg-gray-100 p-4 rounded">
          <h2 className="font-semibold mb-2">Result</h2>
          <p className="mb-2">{result.result}</p>
          <p className="mb-4">{result.action}</p>

          <div className="border-t pt-4">
            <p className="font-bold">
              {logic.service_contact.company}
            </p>
            <p>📞 {logic.service_contact.phone}</p>
            <p>✉️ {logic.service_contact.email}</p>
          </div>

          <button
            className="mt-4 bg-blue-700 text-white p-3 rounded w-full"
            onClick={reset}
          >
            Start Over
          </button>
        </div>
      )}
    </div>
  );
}
