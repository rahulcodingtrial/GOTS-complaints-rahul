import Header from './components/Header';
import Footer from './components/Footer';
import ComplaintsWizard from './components/ComplaintsWizard';

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <ComplaintsWizard />
      </main>
      <Footer />
    </div>
  );
}
