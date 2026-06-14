export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-container mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">G</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">
              GOTS Complaints
            </h1>
          </div>
          <p className="text-sm text-gray-600 hidden md:block">
            Whistleblower-Friendly Intake System
          </p>
        </div>
      </div>
    </header>
  );
}
