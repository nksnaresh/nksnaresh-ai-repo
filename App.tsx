
import React, { useState, useCallback, useRef } from 'react';
import { ImageState, Preset } from './types';
import { PRESETS } from './constants';
import { editImage } from './services/gemini';
import Sidebar from './components/Sidebar';
import ImageCanvas from './components/ImageCanvas';
import LoadingOverlay from './components/LoadingOverlay';

const App: React.FC = () => {
  const [imageState, setImageState] = useState<ImageState>({
    original: null,
    current: null,
    history: []
  });
  const [lastPrompt, setLastPrompt] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setImageState({
          original: base64,
          current: base64,
          history: [base64]
        });
        setLastPrompt(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUpload = () => fileInputRef.current?.click();

  const handleEdit = async (prompt: string) => {
    if (!imageState.current) return;
    
    setIsProcessing(true);
    setError(null);
    try {
      const editedBase64 = await editImage(imageState.current, prompt);
      setImageState(prev => ({
        ...prev,
        current: editedBase64,
        history: [...prev.history, editedBase64]
      }));
      setLastPrompt(prompt);
    } catch (err: any) {
      setError(err.message || "Failed to edit image. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const undo = () => {
    if (imageState.history.length > 1) {
      const newHistory = [...imageState.history];
      newHistory.pop();
      setImageState(prev => ({
        ...prev,
        current: newHistory[newHistory.length - 1],
        history: newHistory
      }));
      if (newHistory.length === 1) setLastPrompt(null);
    }
  };

  const reset = () => {
    if (imageState.original) {
      setImageState(prev => ({
        ...prev,
        current: prev.original,
        history: [prev.original!]
      }));
      setLastPrompt(null);
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-950 text-slate-100">
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileUpload} 
        className="hidden" 
        accept="image/*"
      />

      <div className="flex-1 flex flex-col h-full">
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-900/50 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <span className="text-xl font-bold">S</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight">SnapEdit <span className="text-indigo-400">AI</span></h1>
          </div>
          
          <div className="flex items-center gap-4">
            {imageState.current && (
              <div className="flex gap-2">
                <button 
                  onClick={undo}
                  disabled={imageState.history.length <= 1 || isProcessing}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 text-sm font-medium"
                >
                  <span className="text-lg">↩️</span> Undo
                </button>
                <button 
                  onClick={reset}
                  disabled={isProcessing}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-50 transition-colors flex items-center gap-2 text-sm font-medium"
                >
                  <span className="text-lg">🔄</span> Reset
                </button>
              </div>
            )}
            {!imageState.original && (
              <button 
                onClick={triggerUpload}
                className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg font-medium transition-all shadow-lg shadow-indigo-600/20"
              >
                Upload Image
              </button>
            )}
          </div>
        </header>

        <main className="flex-1 relative overflow-hidden flex flex-col md:flex-row">
          <div className="flex-1 flex flex-col items-center justify-center bg-slate-950 p-4 md:p-8 relative">
            {imageState.current ? (
              <>
                <ImageCanvas 
                  imageUrl={imageState.current} 
                  originalUrl={imageState.original!}
                  isProcessing={isProcessing}
                />
                {lastPrompt && !isProcessing && (
                  <div className="mt-8 px-4 py-2 bg-slate-900/80 backdrop-blur rounded-full border border-slate-700 text-xs text-slate-400 flex items-center gap-2 max-w-md animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <span className="text-indigo-400 font-bold">ACTIVE PROMPT:</span>
                    <span className="truncate italic">"{lastPrompt}"</span>
                  </div>
                )}
              </>
            ) : (
              <div 
                onClick={triggerUpload}
                className="w-full max-w-xl aspect-video border-2 border-dashed border-slate-700 rounded-2xl flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-indigo-500 hover:bg-indigo-500/5 transition-all group"
              >
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-3xl">📤</span>
                </div>
                <div className="text-center">
                  <p className="text-lg font-medium text-slate-300">Start your creative journey</p>
                  <p className="text-sm text-slate-500 mt-1">Upload a photo to edit with Gemini</p>
                </div>
              </div>
            )}
          </div>

          <Sidebar 
            onPresetClick={handleEdit} 
            isProcessing={isProcessing}
            disabled={!imageState.current}
            onCustomPrompt={handleEdit}
          />
        </main>

        <footer className="h-10 border-t border-slate-800 bg-slate-900/50 flex items-center px-6 justify-between text-[10px] text-slate-500 tracking-wider font-medium">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> ENGINE: GEMINI-2.5-FLASH-IMAGE</span>
            {error && <span className="text-red-400 uppercase">System Error: {error}</span>}
          </div>
          <div className="flex items-center gap-2 uppercase">
            STATUS: {isProcessing ? 'PROCESSING' : 'READY'}
          </div>
        </footer>
      </div>

      {isProcessing && <LoadingOverlay />}
    </div>
  );
};

export default App;
