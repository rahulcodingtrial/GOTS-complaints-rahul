export default function Step1Welcome({ onNext }) {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="mb-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">🛡️</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Report an Issue Confidentially
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          At Global Standard, we take every report seriously. Whether you've
          witnessed labor violations, safety concerns, environmental issues,
          unethical practices, or trademark misuse, we want to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="font-bold text-lg text-gray-900 mb-2">
            🔒 Your Privacy Protected
          </h3>
          <p className="text-sm text-gray-600">
            You can submit reports anonymously or with your identity kept
            confidential.
          </p>
        </div>

        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="font-bold text-lg text-gray-900 mb-2">
            ⚡ Fast & Easy
          </h3>
          <p className="text-sm text-gray-600">
            This wizard takes just a few minutes to complete.
          </p>
        </div>

        <div className="bg-purple-50 p-6 rounded-lg">
          <h3 className="font-bold text-lg text-gray-900 mb-2">
            📋 Multiple Issues
          </h3>
          <p className="text-sm text-gray-600">
            Labor, safety, environment, ethics, or trademark concerns.
          </p>
        </div>

        <div className="bg-yellow-50 p-6 rounded-lg">
          <h3 className="font-bold text-lg text-gray-900 mb-2">
            📁 Evidence Support
          </h3>
          <p className="text-sm text-gray-600">
            Upload documents, photos, or files as evidence.
          </p>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h3 className="font-bold text-gray-900 mb-3">What Happens Next?</h3>
        <ol className="text-left space-y-2 text-sm text-gray-600">
          <li>
            <strong>1.</strong> You tell us about your concern using our simple
            form
          </li>
          <li>
            <strong>2.</strong> We verify you're a genuine stakeholder (not a
            business rival)
          </li>
          <li>
            <strong>3.</strong> Our team reviews your report confidentially
          </li>
          <li>
            <strong>4.</strong> We investigate and take appropriate action
          </li>
        </ol>
      </div>

      <button
        onClick={onNext}
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
      >
        Start Reporting →
      </button>
    </div>
  );
}
