export default function StepIndicator({ currentStep, totalSteps }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900">
          Step {currentStep} of {totalSteps}
        </h2>
        <span className="text-sm font-medium text-gray-600">
          {Math.round((currentStep / totalSteps) * 100)}% complete
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-green-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>

      <div className="flex justify-between mt-4">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div key={i + 1} className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                i + 1 <= currentStep
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-300 text-gray-600'
              }`}
            >
              {i + 1}
            </div>
            <span className="text-xs text-gray-600 mt-1">
              {getStepLabel(i + 1)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function getStepLabel(step) {
  const labels = [
    'Welcome',
    'Category',
    'Questions',
    'Files',
    'Contact',
    'Privacy',
    'Review',
  ];
  return labels[step - 1];
}
