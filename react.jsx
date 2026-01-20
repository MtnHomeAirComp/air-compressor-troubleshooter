import React, { useState } from "react";

export default function AirCompressorTroubleshooter() {
  const [problem, setProblem] = useState(null);
  const [step, setStep] = useState(0);

  const problems = {
    "won't start": [
      {
        question: "Does the control panel power on?",
        yes: 1,
        no: "Check main power supply, fuses, and disconnect."
      },
      {
        question: "Does the motor attempt to start?",
        yes: 2,
        no: "Check contactors, overload relay, and wiring."
      },
      {
        question: "Does the motor turn freely by hand?",
        yes: "Electrical issue likely. Consult technician.",
        no: "Compressor element may be seized. Stop and call service."
      }
    ],
    "high temperature": [
      {
        question: "Is the oil level correct?",
        yes: 1,
        no: "Add correct compressor oil."
      },
      {
        question: "Is the oil cooler clean?",
        yes: 2,
        no: "Clean oil cooler fins and airflow path."
      },
      {
        question: "Is cooling fan operating correctly?",
        yes: "Possible internal issue. Contact technician.",
        no: "Repair or replace cooling fan."
      }
    ]
  };

  const currentSteps = problem ? problems[problem] : null;
  const currentStep =
    currentSteps && typeof step === "number" ? currentSteps[step] : null;

  return (
    <div className="max-w-2xl mx-auto p-6 font-sans">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">
        Air Compressor Troubleshooting
      </h1>

      {!problem && (
        <>
          <p className="mb-4">Select the issue you are experiencing:</p>
          <div className="space-y-2">
            {Object.keys(problems).map((key) => (
              <button
                key={key}
                className="w-full bg-blue-600 text-white p-3 rounded"
                onClick={() => {
                  setProblem(key);
                  setStep(0);
                }}
              >
                Compressor {key}
              </button>
            ))}
          </div>
        </>
      )}

      {problem && currentStep && (
        <>
          <p className="text-lg font-semibold mb-4">
            {currentStep.question}
          </p>
          <div className="flex gap-4">
            <button
              className="flex-1 bg-green-600 text-white p-3 rounded"
              onClick={() => {
                typeof currentStep.yes === "number"
                  ? setStep(currentStep.yes)
                  : setStep(currentStep.yes);
              }}
            >
              Yes
            </button>
            <button
              className="flex-1 bg-red-600 text-white p-3 rounded"
              onClick={() => {
                setStep(currentStep.no);
              }}
            >
              No
            </button>
          </div>
        </>
      )}

      {typeof step === "string" && (
        <div className="mt-6 bg-gray-100 p-4 rounded">
          <p className="font-semibold mb-2">Result:</p>
          <p>{step}</p>

          <div className="mt-4 border-t pt-4">
            <p className="font-bold">Need expert help?</p>
            <p>Mountain Home Air Compressor</p>
            <p>📞 870-321-4095</p>
            <p>✉️ DeltaT@Contractor.net</p>
          </div>

          <button
            className="mt-4 bg-blue-700 text-white p-3 rounded w-full"
            onClick={() => {
              setProblem(null);
              setStep(0);
            }}
          >
            Start Over
          </button>
        </div>
      )}
    </div>
  );
}
