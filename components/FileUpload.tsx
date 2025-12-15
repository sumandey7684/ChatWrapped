import React, { useState, useCallback } from 'react';
import { Upload, FileWarning, FileArchive } from 'lucide-react';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  isLoading: boolean;
  statusText?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, isLoading, statusText = "Analyzing your chat..." }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const validateAndUpload = (file: File) => {
    setError(null);
    const name = file.name.toLowerCase();
    
    // Check extension
    if (name.endsWith('.txt') || name.endsWith('.zip')) {
      onFileUpload(file);
    } else {
      setError('Only .txt or .zip files from WhatsApp exports are supported.');
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      validateAndUpload(files[0]);
    }
  }, [onFileUpload]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndUpload(e.target.files[0]);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div 
        className={`
          w-full relative group cursor-pointer
          border border-dashed rounded-[2rem] p-10 text-center transition-all duration-300
          animate-fadeInUp
          ${isDragging 
            ? 'border-purple-500 bg-purple-500/10 scale-[1.01]' 
            : 'border-zinc-700 bg-zinc-900/40 hover:border-zinc-500 hover:bg-zinc-800/40'
          }
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !isLoading && document.getElementById('file-input')?.click()}
      >
        <input 
          type="file" 
          id="file-input" 
          className="hidden" 
          accept=".txt,.zip"
          onChange={handleFileInput}
          disabled={isLoading}
        />
        
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className={`p-4 rounded-full bg-gradient-to-tr from-purple-600 to-pink-600 shadow-lg shadow-purple-500/20 mb-2 transition-transform duration-500 ${isLoading ? 'animate-spin' : 'group-hover:scale-110'}`}>
             {isLoading ? (
               <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full" />
             ) : (
               <Upload className="w-6 h-6 text-white" />
             )}
          </div>
          
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-white">
              {isLoading ? statusText : 'Drop your chat here'}
            </h3>
            <p className="text-zinc-400 mt-2 text-sm font-medium">
              Your story starts instantly. Nothing is uploaded.
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-200 animate-fadeIn w-full justify-center">
          <FileWarning className="w-5 h-5 shrink-0" />
          <span className="text-sm font-medium">{error}</span>
        </div>
      )}
      
      {!error && !isLoading && (
        <div className="mt-8 text-center animate-fadeIn delay-300 opacity-0 fill-mode-forwards">
           <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest mb-3">You'll discover</p>
           <div className="flex flex-wrap justify-center gap-2">
             <span className="px-3 py-1 bg-zinc-800/30 rounded-full text-[11px] text-zinc-400 border border-zinc-800">🏆 Leaderboard</span>
             <span className="px-3 py-1 bg-zinc-800/30 rounded-full text-[11px] text-zinc-400 border border-zinc-800">📅 Peak Hours</span>
             <span className="px-3 py-1 bg-zinc-800/30 rounded-full text-[11px] text-zinc-400 border border-zinc-800">👻 Ghost Mode</span>
           </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;