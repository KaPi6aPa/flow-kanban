import React, { useState } from 'react';
import Header from './components/Header';
import Board from './components/Board';
import { BoardProvider } from './BoardContext';
import NewIssueModal from './NewIssueModal';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <BoardProvider>
    <div className="flex flex-col h-screen w-full bg-zinc-950 text-zinc-200 selection:bg-indigo-500/30 overflow-hidden">
      <Header onOpenNewIssue={() => setIsModalOpen(true)} />
      <div className="flex-1 overflow-hidden relative">
        {/* Subtle Background Gradient for 'Expensive' feel */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]" />
        </div>
        
        <Board />
      </div>
      <NewIssueModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
    </BoardProvider>
  );
};

export default App;