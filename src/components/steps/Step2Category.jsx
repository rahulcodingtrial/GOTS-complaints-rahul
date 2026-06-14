const CATEGORIES = [
  {
    id: 'labor',
    title: 'Labor Violations',
    description: 'Excessive overtime, wage theft, discrimination, forced labor',
    icon: '👷',
  },
  {
    id: 'ohs',
    title: 'Health & Safety',
    description: 'Unsafe working conditions, lack of protective equipment, injuries',
    icon: '⚠️',
  },
  {
    id: 'environmental',
    title: 'Environmental Issues',
    description: 'Pollution, waste mishandling, ecological damage',
    icon: '🌍',
  },
  {
    id: 'ethics',
    title: 'Business Ethics & Corruption',
    description: 'Bribery, fraud, conflicts of interest, misconduct',
    icon: '⚖️',
  },
  {
    id: 'trademark',
    title: 'Trademark/Logo Misuse',
    description: 'Unauthorized use of GOTS logo or false certifications',
    icon: '📋',
  },
];

export default function Step2Category({
  onNext,
  onPrev,
  category,
  onCategoryChange,
}) {
  const handleSelect = (id) => {
    onCategoryChange(id);
    onNext();
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        What is your concern about?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleSelect(cat.id)}
            className={`p-6 rounded-lg border-2 transition-all text-left hover:shadow-lg ${
              category === cat.id
                ? 'border-green-600 bg-green-50'
                : 'border-gray-200 bg-white hover:border-green-300'
            }`}
          >
            <div className="text-3xl mb-3">{cat.icon}</div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">
              {cat.title}
            </h3>
            <p className="text-sm text-gray-600">{cat.description}</p>
          </button>
        ))}
      </div>

      <div className="flex gap-4">
        <button
          onClick={onPrev}
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-3 px-6 rounded-lg transition-colors"
        >
          ← Back
        </button>
      </div>
    </div>
  );
}
