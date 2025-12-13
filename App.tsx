import React, { useState, useMemo } from 'react';
import FileUpload from './components/FileUpload';
import Dashboard from './components/Dashboard';
import { parseChatFile, analyzeMessages } from './utils/parser';
import { Message, AnalysisResult } from './types';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [viewState, setViewState] = useState<'upload' | 'dashboard'>('upload');

  const handleFileUpload = async (file: File) => {
    setIsLoading(true);
    // Add a small delay to allow UI to show loading state for large files
    setTimeout(async () => {
      try {
        const result = await parseChatFile(file);
        if (result.status === 'success') {
          setMessages(result.messages);
          // Auto-select the last active year
          if (result.messages.length > 0) {
            const lastYear = result.messages[result.messages.length - 1].date.getFullYear();
            setSelectedYear(lastYear);
          }
          setViewState('dashboard');
        } else {
          alert('Error parsing file: ' + result.error);
        }
      } catch (e) {
        alert('An unexpected error occurred parsing the file.');
      } finally {
        setIsLoading(false);
      }
    }, 100);
  };

  const handleReset = () => {
    setMessages([]);
    setSelectedYear(null);
    setViewState('upload');
  };

  // Memoize analytics so we don't recalculate unless year or messages change
  const analyticsData: AnalysisResult = useMemo(() => {
    return analyzeMessages(messages, selectedYear || undefined);
  }, [messages, selectedYear]);

  return (
    <div className="min-h-screen w-full bg-[#09090b] text-white overflow-x-hidden selection:bg-purple-500/30">
      
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10">
        <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto">
          <div className="text-xl font-bold tracking-tighter flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
            ChatWrapped
          </div>
        </nav>

        <main className="pt-8">
          {viewState === 'upload' ? (
            <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fadeIn">
              <div className="text-center mb-12 max-w-2xl px-6">
                <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">
                  Your chat story, <br/> visualized.
                </h1>
                <p className="text-zinc-400 text-lg">
                  Export your WhatsApp chat to .txt and drop it below to get insights into your conversations.
                  100% private, processing happens on your device.
                </p>
              </div>
              <FileUpload onFileUpload={handleFileUpload} isLoading={isLoading} />
            </div>
          ) : (
            <Dashboard 
              data={analyticsData} 
              selectedYear={selectedYear} 
              onYearChange={(y) => setSelectedYear(y === 0 ? null : y)} 
              onReset={handleReset}
            />
          )}
        </main>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0; /* Start hidden for stagger */
        }
      `}</style>
    </div>
  );
}

export default App;