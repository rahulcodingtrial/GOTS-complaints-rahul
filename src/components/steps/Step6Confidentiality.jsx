import { useState } from 'react';

export default function Step6Confidentiality({
  onNext,
  onPrev,
  confidential,
  onConfidentialChange,
}) {
  const [motivation, setMotivation] = useState('');
  const [motivationError, setMotivationError] = useState('');

  const motivationOptions = [
    {
      value: 'employee',
      label: 'I am/was a direct employee at this organization',
      icon: '👷',
    },
    {
      value: 'contractor',
      label: 'I am a contractor or supplier',
      icon: '🤝',
    },
    {
      value: 'customer',
      label: 'I am a customer or consumer',
      icon: '🛍️',
    },
    {
      value: 'stakeholder',
      label: 'I am an affected community member or stakeholder',
      icon: '👥',
    },
    {
      value: 'observer',
      label: 'I observed this as an external party',
      icon: '👁️',
    },
  ];

  const handleNext = () => {
    setMotivationError('');

    if (!motivation) {
      setMotivationError(
        'Please confirm your connection to this issue. This helps us verify genuine concerns vs. business rivalries.'
      );
      return;
    }

    onNext();
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Privacy & Verification
      </h2>
      <p className="text-gray-600 mb-6">
        Help us distinguish genuine concerns from commercial disputes.
      </p>

      <div className="space-y-8 mb-8">
        <div>
          <h3 className="font-bold text-gray-900 mb-4">
            How are you connected to this issue?
          </h3>

          {motivationError && (
            <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-6">
              {motivationError}
            </div>
          )}

          <div className="space-y-3">
            {motivationOptions.map((option) => (
              <label
                key={option.value}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  motivation === option.value
                    ? 'border-green-600 bg-green-50'
                    : 'border-gray-200 bg-white hover:border-green-300'
                }`}
              >
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="motivation"
                    value={option.value}
                    checked={motivation === option.value}
                    onChange={(e) => setMotivation(e.target.value)}
                    className="w-4 h-4 mr-3"
                  />
                  <span className="text-xl mr-3">{option.icon}</span>
                  <span className="font-medium text-gray-900">
                    {option.label}
                  </span>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="font-bold text-gray-900 mb-4">
            Do you want your identity kept confidential?
          </h3>

          <div className="space-y-3">
            <label className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              !confidential
                ? 'border-green-600 bg-green-50'
                : 'border-gray-200 bg-white hover:border-green-300'
            }`}>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="confidentiality"
                  checked={!confidential}
                  onChange={() => onConfidentialChange(false)}
                  className="w-4 h-4 mr-3"
                />
                <span className="text-lg mr-3">🌐</span>
                <div>
                  <span className="font-medium text-gray-900 block">
                    Public Report
                  </span>
                  <span className="text-xs text-gray-600">
                    Your name can be published in reports
                  </span>
                </div>
              </div>
            </label>

            <label className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              confidential
                ? 'border-green-600 bg-green-50'
                : 'border-gray-200 bg-white hover:border-green-300'
            }`}>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="confidentiality"
                  checked={confidential}
                  onChange={() => onConfidentialChange(true)}
                  className="w-4 h-4 mr-3"
                />
                <span className="text-lg mr-3">🔒</span>
                <div>
                  <span className="font-medium text-gray-900 block">
                    Confidential
                  </span>
                  <span className="text-xs text-gray-600">
                    Your identity will be kept confidential
                  </span>
                </div>
              </div>
            </label>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-700">
            <strong>⚠️ Important:</strong> We filter out obvious commercial
            disputes. However, identity verification is mandatory to prevent
            frivolous reports and spam.
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onPrev}
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-3 px-6 rounded-lg transition-colors"
        >
          ← Back
        </button>
        <button
          onClick={handleNext}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
