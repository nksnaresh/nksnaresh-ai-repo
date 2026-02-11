
import React, { useState } from 'react';
import { PRESETS } from '../constants';

interface SidebarProps {
  onPresetClick: (prompt: string) => void;
  onCustomPrompt: (prompt: string) => void;
  isProcessing: boolean;
  disabled: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  onPresetClick, 
  onCustomPrompt, 
  isProcessing, 
  disabled 
}) => {
  const [customPrompt, setCustomPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customPrompt.trim()) {
      onCustomPrompt(customPrompt);
      setCustomPrompt('');
    }
  };

  const categories = Array.from(new Set(PRESETS.map(p => p.category)));

  return (
    <aside className={`w-full md:w-80 bg-slate-900 border-l border-slate-800 flex flex-col transition-all duration-500 ${disabled ? 'opacity-40 grayscale pointer-events-none' : 'opacity-100'}`}>
      <div className="p-6 border-b border-slate-800 bg-slate-900/50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400">AI Directives</h2>
          <span className="text-[10px] bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded-full border border-indigo-500/20">BETA</span>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="e.g., 'Change background to a rainy London street'..."
              className="w-full h-28 bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm focus:ring-2 focus:ring-indigo-500/50 border-indigo-500/0 outline-none resize-none placeholder:text-slate-600 custom-scrollbar shadow-inner transition-all focus:border-indigo-500/50"
              disabled={disabled || isProcessing}
            />
            {customPrompt.length > 0 && (
              <div className="absolute bottom-3 right-3 text-[10px] text-slate-600 font-mono">
                {customPrompt.length} chars
              </div>
            )}
          </div>
          <button
            type="submit"
            disabled={disabled || isProcessing || !customPrompt.trim()}
            className={`w-full py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 uppercase tracking-widest ${
              customPrompt.trim() 
                ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20' 
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            <span>🪄</span> Apply AI Modification
          </button>
        </form>
      </div>

      <div className="flex-1 overflow-y-auto p-6 custom-scrollbar space-y-8">
        {categories.map(category => (
          <div key={category} className="space-y-3">
            <h3 className="text-[10px] font-black text-slate-600 uppercase tracking-widest border-b border-slate-800/50 pb-2">{category} Tools</h3>
            <div className="grid grid-cols-1 gap-2.5">
              {PRESETS.filter(p => p.category === category).map(preset => (
                <button
                  key={preset.id}
                  onClick={() => onPresetClick(preset.prompt)}
                  disabled={disabled || isProcessing}
                  className="group flex items-center gap-4 p-3 rounded-xl bg-slate-800/30 border border-slate-700/30 hover:bg-slate-800 hover:border-indigo-500/30 hover:shadow-md transition-all text-left"
                >
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-xl group-hover:scale-110 group-hover:bg-slate-950 group-hover:border-indigo-500/20 transition-all">
                    {preset.icon}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-200 group-hover:text-indigo-300 transition-colors uppercase tracking-tight">{preset.name}</p>
                    <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">Automated Neural Task</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-5 bg-slate-950/80 border-t border-slate-800">
        <div className="flex items-start gap-3">
          <div className="text-lg">💡</div>
          <p className="text-[10px] text-slate-500 italic leading-relaxed">
            <strong className="text-slate-400 font-bold not-italic">Pro Tip:</strong> You can describe specific details like "Make the jacket red leather" or "Add a sunny beach background with a palm tree on the left".
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
