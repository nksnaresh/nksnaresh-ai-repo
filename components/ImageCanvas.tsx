
import React, { useState } from 'react';

interface ImageCanvasProps {
  imageUrl: string;
  originalUrl: string;
  isProcessing: boolean;
}

const ImageCanvas: React.FC<ImageCanvasProps> = ({ imageUrl, originalUrl, isProcessing }) => {
  const [showOriginal, setShowOriginal] = useState(false);

  return (
    <div className="relative max-w-full max-h-full group">
      <div className="absolute -inset-8 bg-indigo-500/5 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>
      
      <div className="relative bg-slate-900 rounded-2xl p-2 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] ring-1 ring-slate-800 overflow-hidden">
        <img 
          src={showOriginal ? originalUrl : imageUrl} 
          alt="Canvas" 
          className={`max-w-full max-h-[65vh] rounded-xl shadow-lg transition-all duration-300 ${isProcessing ? 'opacity-40 scale-[0.99] blur-md' : 'opacity-100'}`}
        />
        
        {isProcessing && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative">
              <div className="w-24 h-24 border-4 border-indigo-500/10 border-t-indigo-500 rounded-full animate-[spin_0.8s_linear_infinite]"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl animate-pulse">🪄</span>
              </div>
            </div>
          </div>
        )}

        {/* Comparison Indicator */}
        {showOriginal && (
          <div className="absolute top-6 left-6 px-3 py-1 bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-widest rounded shadow-lg animate-in zoom-in-95 duration-200">
            Viewing Original
          </div>
        )}
      </div>

      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3 w-full justify-center">
        {imageUrl !== originalUrl && (
          <button 
            onMouseDown={() => setShowOriginal(true)}
            onMouseUp={() => setShowOriginal(false)}
            onMouseLeave={() => setShowOriginal(false)}
            onTouchStart={() => setShowOriginal(true)}
            onTouchEnd={() => setShowOriginal(false)}
            className="bg-slate-800/80 backdrop-blur hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-full text-xs font-bold transition-all border border-slate-700 active:scale-95 select-none"
          >
            HOLD TO COMPARE
          </button>
        )}
        
        <a 
          href={imageUrl} 
          download="snapedit-ai-result.png"
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 shadow-xl shadow-indigo-900/20"
        >
          <span>💾</span> SAVE RESULT
        </a>
      </div>
    </div>
  );
};

export default ImageCanvas;
