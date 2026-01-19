import React, { useState } from 'react';
import Column from './Column';
import Card from './Card';
import { Filter, Users, Settings } from 'lucide-react';
import { useBoard } from '../BoardContext';
import { 
  DndContext, 
  DragOverlay, 
  closestCorners, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  defaultDropAnimationSideEffects
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { Task } from '../types';

const Board: React.FC = () => {
  const { columns: data, moveTask } = useBoard();
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Prevents accidental drags when clicking
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id === over.id) return;

    // We only update state during drag over if moving between different containers
    // to provide real-time feedback. Same-column reordering happens on DragEnd usually,
    // but moveTask handles both. Calling it here for inter-column makes it snappy.
    // However, for stability, we can just rely on moveTask logic which handles both.
    // To prevent flickering, we often check if containers are different.
    
    moveTask(active.id as string, over.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
  };

  const activeTask = activeId ? data.flatMap(c => c.tasks).find(t => t.id === activeId) : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
    <div className="flex flex-col h-full relative z-10">
      {/* Board Toolbar */}
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
           <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <img 
                key={i}
                src={`https://picsum.photos/32/32?random=${i + 10}`}
                alt="Member"
                className="w-8 h-8 rounded-full border-2 border-zinc-950 hover:z-10 hover:border-zinc-800 transition-all cursor-pointer"
              />
            ))}
            <div className="w-8 h-8 rounded-full border-2 border-zinc-950 bg-zinc-900 flex items-center justify-center text-[10px] font-medium text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition-colors cursor-pointer">
              +4
            </div>
           </div>
           <div className="h-4 w-px bg-zinc-800 mx-2"></div>
           <span className="text-sm text-zinc-500">Only My Issues</span>
        </div>

        <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-zinc-400 bg-zinc-900 border border-white/5 rounded-md hover:text-zinc-100 hover:bg-zinc-800 transition-all">
                <Filter size={14} />
                Filter
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-zinc-400 bg-zinc-900 border border-white/5 rounded-md hover:text-zinc-100 hover:bg-zinc-800 transition-all">
                <Settings size={14} />
                View
            </button>
        </div>
      </div>

      {/* Columns Container */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden">
        <div className="flex h-full gap-6 px-6 pb-6 min-w-max">
          {data.map((col) => (
            <Column key={col.id} title={col.title} tasks={col.tasks} id={col.id} />
          ))}
          
          {/* Add Column Placeholder */}
          <div className="w-[300px] shrink-0 pt-3 opacity-50 hover:opacity-100 transition-opacity cursor-pointer group">
             <div className="h-10 flex items-center gap-2 px-2 text-zinc-500 group-hover:text-zinc-300">
                <span className="text-xl">+</span>
                <span className="text-sm font-medium">Add Section</span>
             </div>
          </div>
        </div>
      </div>

      <DragOverlay
        dropAnimation={{
          sideEffects: defaultDropAnimationSideEffects({
            styles: {
              active: {
                opacity: '0.5',
              },
            },
          }),
        }}
      >
        {activeTask ? <Card task={activeTask} isOverlay /> : null}
      </DragOverlay>
    </div>
    </DndContext>
  );
};

export default Board;