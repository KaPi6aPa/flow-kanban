import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useBoard } from './BoardContext';
import { Priority } from './types';

interface NewIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewIssueModal: React.FC<NewIssueModalProps> = ({ isOpen, onClose }) => {
  const { addTask } = useBoard();
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('Feature');
  const [priority, setPriority] = useState<Priority>('Medium');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    addTask(title, tag, priority);
    
    // Reset and close
    setTitle('');
    setTag('Feature');
    setPriority('Medium');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
          <h2 className="text-sm font-medium text-zinc-200">New Issue</h2>
          <button onClick={onClose} className="text-zinc-500 hover:text-zinc-200 transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4">
          <input
            autoFocus
            type="text"
            placeholder="Issue title..."
            className="w-full bg-transparent text-lg font-medium text-zinc-100 placeholder:text-zinc-600 focus:outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="flex gap-3">
            <select
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="bg-zinc-800/50 border border-white/10 rounded-md px-2 py-1 text-xs text-zinc-300 focus:outline-none focus:border-indigo-500/50 hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <option value="Feature">Feature</option>
              <option value="Bug">Bug</option>
              <option value="Design">Design</option>
              <option value="Engineering">Engineering</option>
            </select>

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
              className="bg-zinc-800/50 border border-white/10 rounded-md px-2 py-1 text-xs text-zinc-300 focus:outline-none focus:border-indigo-500/50 hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <option value="Low">Low Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="High">High Priority</option>
            </select>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium rounded-md transition-colors shadow-lg shadow-indigo-500/20"
            >
              Create Issue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewIssueModal;