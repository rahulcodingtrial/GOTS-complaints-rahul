export default function SuccessMessage({ onReset }) {
  return (
    <div className="max-w-container mx-auto px-4 md:px-6">
      <div className="bg-white rounded-lg shadow-md p-8 md:p-12 max-w-2xl mx-auto text-center">
        <div className="text-6xl mb-6">✓</div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Thank You!
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-4">
            Your complaint has been successfully submitted. We take your report
            seriously and will investigate the matter thoroughly.
          </p>
          <p className="text-gray-600">
            A confirmation email has been sent to your address.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12 text-left">
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="font-bold text-lg text-gray-900 mb-2">
              🔍 Investigation
            </h3>
            <p className="text-sm text-gray-600">
              Our team will review your report and contact you if needed.
            </p>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="font-bold text-lg text-gray-900 mb-2">
              🤐 Confidentiality
            </h3>
            <p className="text-sm text-gray-600">
              Your privacy and identity will be protected as requested.
            </p>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="font-bold text-lg text-gray-900 mb-2">
              📞 Follow-up
            </h3>
            <p className="text-sm text-gray-600">
              We may contact you to clarify details or request more information.
            </p>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h3 className="font-bold text-gray-900 mb-3">What Happens Next?</h3>
          <ol className="text-left space-y-2 text-sm text-gray-600">
            <li>
              <strong>Within 24 hours:</strong> We'll acknowledge receipt of your
              complaint
            </li>
            <li>
              <strong>Within 1-2 weeks:</strong> Our investigation team will
              begin their review
            </li>
            <li>
              <strong>Ongoing:</strong> You may receive follow-up questions
            </li>
            <li>
              <strong>Completion:</strong> We'll inform you of actions taken
            </li>
          </ol>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={onReset}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
          >
            Submit Another Report
          </button>
          <a
            href="https://www.global-standard.org"
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg transition-colors inline-block"
          >
            Return to GOTS
          </a>
        </div>
      </div>
    </div>
  );
}
