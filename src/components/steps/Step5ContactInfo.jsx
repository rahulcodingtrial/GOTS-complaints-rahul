import { useState } from 'react';

export default function Step5ContactInfo({
  onNext,
  onPrev,
  email,
  name,
  organization,
  onDataChange,
}) {
  const [validationError, setValidationError] = useState('');

  const validateEmail = (e) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  };

  const handleNext = () => {
    setValidationError('');

    if (!email || !validateEmail(email)) {
      setValidationError('Please enter a valid email address');
      return;
    }

    onNext();
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        How can we contact you?
      </h2>
      <p className="text-gray-600 mb-6">
        We need at least an email to follow up on your report. Identity can be
        kept confidential if you choose.
      </p>

      {validationError && (
        <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-6">
          {validationError}
        </div>
      )}

      <form className="space-y-6 mb-8">
        <div>
          <label className="required block text-sm font-medium text-gray-900 mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => onDataChange({ email: e.target.value })}
            placeholder="your@email.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-600 mt-1">
            Required - we'll use this to contact you about your report
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Your Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => onDataChange({ name: e.target.value })}
            placeholder="Optional - can be kept confidential"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-600 mt-1">
            Optional - can be kept confidential
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Organization/Company
          </label>
          <input
            type="text"
            value={organization}
            onChange={(e) => onDataChange({ organization: e.target.value })}
            placeholder="Where do you work or which company is involved?"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-600 mt-1">
            Helps us identify the correct entity to investigate
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-700">
            <strong>🔒 Privacy:</strong> Your contact information will only be
            used to follow up on your report. You can request anonymity in the
            next step.
          </p>
        </div>
      </form>

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
