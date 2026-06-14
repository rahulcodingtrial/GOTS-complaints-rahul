const CATEGORY_NAMES = {
  labor: 'Labor Violations',
  ohs: 'Health & Safety',
  environmental: 'Environmental Issues',
  ethics: 'Business Ethics & Corruption',
  trademark: 'Trademark/Logo Misuse',
};

export default function Step7Review({
  onPrev,
  complaint,
  onSubmit,
  isSubmitting,
  error,
}) {
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Review your report
      </h2>
      <p className="text-gray-600 mb-6">
        Please review all information before submitting. You can go back to edit
        any section.
      </p>

      {error && (
        <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-6">
          <strong>Error:</strong> {error}
        </div>
      )}

      <div className="space-y-6 mb-8">
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="font-bold text-gray-900 mb-3">Category</h3>
          <p className="text-gray-700">{CATEGORY_NAMES[complaint.category]}</p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="font-bold text-gray-900 mb-3">Your Details</h3>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Email:</strong> {complaint.email}
            </p>
            {complaint.name && (
              <p>
                <strong>Name:</strong>{' '}
                {complaint.confidential ? '(Confidential)' : complaint.name}
              </p>
            )}
            {complaint.organization && (
              <p>
                <strong>Organization:</strong> {complaint.organization}
              </p>
            )}
            <p>
              <strong>Privacy:</strong>{' '}
              {complaint.confidential ? 'Confidential' : 'Public'}
            </p>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="font-bold text-gray-900 mb-3">Report Details</h3>
          <div className="space-y-4">
            {Object.entries(complaint.answers).map(([key, value]) => (
              <div key={key}>
                <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">
                  {formatKey(key)}
                </p>
                <p className="text-gray-700 whitespace-pre-wrap break-words">
                  {value || '(Not provided)'}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="font-bold text-gray-900 mb-3">
            Evidence Files ({complaint.files.length}/5)
          </h3>
          {complaint.files.length > 0 ? (
            <ul className="space-y-2">
              {complaint.files.map((file, i) => (
                <li key={i} className="text-sm text-gray-700">
                  📄 {file.name} ({formatFileSize(file.size)})
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 text-sm">No files uploaded</p>
          )}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-700">
            <strong>Next Steps:</strong> After submission, our team will review
            your report and may contact you for additional information.
          </p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <label className="flex items-start cursor-pointer">
            <input
              type="checkbox"
              defaultChecked
              className="w-4 h-4 mt-1 mr-3"
            />
            <span className="text-sm text-green-700">
              I confirm that the information provided is accurate to the best of
              my knowledge and I understand this may be used in investigations.
            </span>
          </label>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onPrev}
          disabled={isSubmitting}
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
        >
          ← Back
        </button>
        <button
          onClick={onSubmit}
          disabled={isSubmitting}
          className={`flex-1 font-bold py-3 px-6 rounded-lg transition-colors ${
            isSubmitting
              ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Report'}
        </button>
      </div>
    </div>
  );
}

function formatKey(key) {
  return key
    .replace(/_/g, ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}
