
import React, { useState, useEffect } from 'react';

const MESSAGES = [
  "Consulting the AI artist...",
  "Analyzing image features...",
  "Painting the details...",
  "Refining pixels with Gemini...",
  "Applying generative magic...",
  "Almost there, adding final touches..."
];

const LoadingOverlay: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % MESSAGES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm">
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-4 bg-indigo-500/10 rounded-full flex items-center justify-center">
            <span className="text-3xl animate-bounce">🖌️</span>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Generating Masterpiece</h2>
        <p className="text-slate-400 font-medium animate-pulse">
          {MESSAGES[messageIndex]}
        </p>
        <div className="mt-8 flex justify-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
