import React, { useState } from 'react';
import { Video, X, Upload } from 'lucide-react';

// 9. CREATE BATTLE / SUBMIT RECORDED PITCH MODAL
// ============================================================================

export default function CreateBattleModal({ open, onClose, onCreateBattle }) {
  const [title, setTitle] = useState(
    'Pan-African Youth Innovation Will Lead Global Tech by 2035.'
  );
  const [category, setCategory] = useState('Debate');
  const [mode, setMode] = useState('Live War');
  const [pitchFileName, setPitchFileName] = useState('');

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onCreateBattle({
      title: title.trim(),
      category,
      mode,
      pitchFileName
    });
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[#0d121d] border border-cyan-500/30 rounded-3xl p-6 w-full max-w-lg space-y-5 shadow-2xl"
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-black text-white">Create Battle / Submit Pitch</h2>
            <p className="text-xs text-gray-400">
              Stakes $1.50 entry fee from your wallet into the live prize pool.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div>
          <label className="block text-xs text-gray-400 mb-1.5 font-semibold">
            Motion / Battle Title
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter debate motion or performance title..."
            className="w-full bg-black/70 border border-white/15 rounded-xl p-3 text-sm text-white"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-gray-400 mb-1.5 font-semibold">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-black/70 border border-white/15 rounded-xl p-3 text-sm text-white"
            >
              <option value="Debate">Debate</option>
              <option value="Public Speaking">Public Speaking</option>
              <option value="Poetry">Poetry</option>
              <option value="Storytelling">Storytelling</option>
            </select>
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1.5 font-semibold">Battle Mode</label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="w-full bg-black/70 border border-white/15 rounded-xl p-3 text-sm text-white"
            >
              <option value="Live War">Live War (1v1 Stage)</option>
              <option value="Recorded War">Recorded War (2-Min Video)</option>
            </select>
          </div>
        </div>

        {/* Recorded Video Pitch Dropzone */}
        <div className="p-4 rounded-2xl border border-dashed border-cyan-500/40 bg-black/50 text-center space-y-2">
          <Upload className="w-6 h-6 text-cyan-400 mx-auto" />
          <p className="text-xs font-bold text-gray-200">
            {pitchFileName
              ? `Attached Pitch: ${pitchFileName}`
              : 'Optional: Upload 2-Minute Recorded Pitch (.mp4 / .mov)'}
          </p>
          <label className="inline-block px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-bold text-cyan-300 cursor-pointer">
            Select Video File
            <input
              type="file"
              accept="video/mp4,video/quicktime"
              className="hidden"
              onChange={(e) => setPitchFileName(e.target.files?.[0]?.name || '')}
            />
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 text-black font-black text-sm shadow-lg shadow-cyan-500/25 hover:brightness-110 transition cursor-pointer"
        >
          Stake $1.50 &amp; Launch Battle
        </button>
      </form>
    </div>
  );
}
