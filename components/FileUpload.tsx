import React, { useState, useCallback } from 'react';
import { Upload, FileWarning, FileText } from 'lucide-react';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  isLoading: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, isLoading }) => {
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
    
    // Check extension
    if (!file.name.toLowerCase().endsWith('.txt')) {
      if (file.name.toLowerCase().endsWith('.zip')) {
        setError('Please extract the .zip file and upload the .txt file inside.');
      } else {
        setError('Only .txt files from WhatsApp exports are supported.');
      }
      return;
    }

    onFileUpload(file);
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
    <div className="w-full max-w-xl mx-auto px-6">
      <div 
        className={`
          relative group cursor-pointer
          border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300
          ${isDragging 
            ? 'border-purple-500 bg-purple-500/10 scale-105' 
            : 'border-zinc-700 bg-zinc-900/50 hover:border-zinc-500 hover:bg-zinc-800/50'
          }
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-input')?.click()}
      >
        <input 
          type="file" 
          id="file-input" 
          className="hidden" 
          accept=".txt"
          onChange={handleFileInput}
          disabled={isLoading}
        />
        
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className={`p-4 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 shadow-lg shadow-purple-500/20 mb-2 ${isLoading ? 'animate-pulse' : ''}`}>
             {isLoading ? (
               <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
             ) : (
               <Upload className="w-8 h-8 text-white" />
             )}
          </div>
          
          <div>
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
              {isLoading ? 'Crunching Data...' : 'Drop your chat here'}
            </h3>
            <p className="text-zinc-400 mt-2 text-sm">
              Upload your <span className="text-purple-400 font-mono">_chat.txt</span> file
            </p>
          </div>

          {!isLoading && (
            <div className="text-xs text-zinc-500 mt-4 max-w-xs mx-auto">
               Supports standard WhatsApp exports. 
               <br/> 
               <span className="text-zinc-600">Strictly local processing. No data leaves your device.</span>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-200 animate-fadeIn">
          <FileWarning className="w-5 h-5 shrink-0" />
          <span className="text-sm font-medium">{error}</span>
        </div>
      )}
      
      {!error && !isLoading && (
        <div className="mt-8 flex justify-center gap-8 opacity-50">
           <div className="flex flex-col items-center gap-2">
             <div className="w-12 h-16 bg-zinc-800 rounded-lg border border-zinc-700 flex items-center justify-center">
               <FileText className="w-6 h-6 text-zinc-600" />
             </div>
             <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Drag & Drop</span>
           </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;