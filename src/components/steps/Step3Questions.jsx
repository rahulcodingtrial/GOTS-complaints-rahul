import { useState } from 'react';

const CATEGORY_ICONS = {
  labor: '👷',
  ohs: '⚠️',
  environmental: '🌍',
  ethics: '⚖️',
  trademark: '📋',
};

const QUESTION_ICONS = {
  overtime: '⏰',
  wages: '💰',
  discrimination: '🙅',
  forced_labor: '🚫',
  hazard_type: '⚠️',
  injuries: '🏥',
  reported: '📞',
  location: '📍',
  violation_type: '📝',
  impact: '💥',
  evidence: '📸',
  involved_parties: '👥',
  beneficiary: '💼',
  proof: '✅',
  brand_name: '🏷️',
};

const QUESTIONS_BY_CATEGORY = {
  labor: [
    {
      id: 'overtime',
      label: 'Have workers been forced to work excessive overtime?',
      type: 'textarea',
    },
    {
      id: 'wages',
      label: 'Are there issues related to wages or compensation?',
      type: 'textarea',
    },
    {
      id: 'discrimination',
      label: 'Have you witnessed discrimination or harassment?',
      type: 'textarea',
    },
    {
      id: 'forced_labor',
      label: 'Do you suspect forced labor or human trafficking?',
      type: 'textarea',
    },
  ],
  ohs: [
    {
      id: 'hazard_type',
      label: 'What type of hazard did you observe?',
      type: 'textarea',
    },
    {
      id: 'injuries',
      label: 'Have there been any work-related injuries?',
      type: 'textarea',
    },
    {
      id: 'reported',
      label: 'Has this been reported to authorities?',
      type: 'select',
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
        { value: 'unsure', label: 'Unsure' },
      ],
    },
    {
      id: 'location',
      label: 'Specific location or department?',
      type: 'text',
    },
  ],
  environmental: [
    {
      id: 'violation_type',
      label: 'Describe the environmental violation',
      type: 'textarea',
    },
    {
      id: 'location',
      label: 'Location of the violation',
      type: 'text',
    },
    {
      id: 'impact',
      label: 'What is the environmental impact?',
      type: 'textarea',
    },
    {
      id: 'evidence',
      label: 'Do you have documentation or evidence?',
      type: 'select',
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
      ],
    },
  ],
  ethics: [
    {
      id: 'violation_type',
      label: 'Describe the ethical violation or corruption',
      type: 'textarea',
    },
    {
      id: 'involved_parties',
      label: 'Who is involved? (names, roles)',
      type: 'textarea',
    },
    {
      id: 'beneficiary',
      label: 'Who benefits from this action?',
      type: 'text',
    },
    {
      id: 'proof',
      label: 'Do you have proof or documentation?',
      type: 'select',
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
      ],
    },
  ],
  trademark: [
    {
      id: 'brand_name',
      label: 'What brand or product is involved?',
      type: 'text',
    },
    {
      id: 'violation_type',
      label: 'Describe the trademark/logo misuse',
      type: 'textarea',
    },
    {
      id: 'location',
      label: 'Where did you encounter this?',
      type: 'text',
    },
    {
      id: 'evidence',
      label: 'Do you have photos or evidence?',
      type: 'select',
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
      ],
    },
  ],
};

export default function Step3Questions({
  onNext,
  onPrev,
  category,
  answers,
  onAnswersChange,
}) {
  const questions = QUESTIONS_BY_CATEGORY[category] || [];
  const [validationError, setValidationError] = useState('');

  const handleChange = (questionId, value) => {
    onAnswersChange({ [questionId]: value });
    setValidationError('');
  };

  const handleNext = () => {
    const unanswered = questions.filter(
      (q) => !answers[q.id] || answers[q.id].trim() === ''
    );

    if (unanswered.length > 0) {
      setValidationError(
        `Please answer all questions. ${unanswered.length} remaining.`
      );
      return;
    }

    onNext();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">{CATEGORY_ICONS[category]}</span>
          <h2 className="text-3xl font-bold text-gray-900">
            Tell us more details
          </h2>
        </div>
        <p className="text-gray-600 ml-16">
          Your detailed information helps us investigate thoroughly.
        </p>
      </div>

      {validationError && (
        <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-6">
          {validationError}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {questions.map((question) => (
          <div
            key={question.id}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-3 mb-4">
              <span className="text-2xl mt-1">{QUESTION_ICONS[question.id] || '❓'}</span>
              <label className="required block font-medium text-gray-900 leading-tight">
                {question.label}
              </label>
            </div>

            {question.type === 'textarea' && (
              <textarea
                value={answers[question.id] || ''}
                onChange={(e) => handleChange(question.id, e.target.value)}
                placeholder="Share details..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
              />
            )}

            {question.type === 'text' && (
              <input
                type="text"
                value={answers[question.id] || ''}
                onChange={(e) => handleChange(question.id, e.target.value)}
                placeholder="Your answer..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
              />
            )}

            {question.type === 'select' && (
              <select
                value={answers[question.id] || ''}
                onChange={(e) => handleChange(question.id, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
              >
                <option value="">Select...</option>
                {question.options?.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            )}

            {answers[question.id] && (
              <div className="mt-2 text-xs text-green-600 flex items-center gap-1">
                ✓ Answered
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
        <p className="text-sm text-blue-700">
          <strong>ℹ️ Tip:</strong> The more detailed your answers, the better we can
          investigate. Don't worry if you don't have all answers — tell us what you know.
        </p>
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
