import React from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import Card from './Card';
import { Task } from '../types';
import { MoreHorizontal, Plus } from 'lucide-react';

interface ColumnProps {
  id: string;
  title: string;
  tasks: Task[];
}

const Column: React.FC<ColumnProps> = ({ id, title, tasks }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div className="flex flex-col w-[300px] shrink-0 h-full">
      {/* Column Header */}
      <div className="flex items-center justify-between px-2 py-3 mb-2 group cursor-grab active:cursor-grabbing">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-medium text-zinc-200">{title}</h2>
          <span className="text-xs text-zinc-500 font-medium">{tasks.length}</span>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-1 text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 rounded"><Plus size={14} /></button>
          <button className="p-1 text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 rounded"><MoreHorizontal size={14} /></button>
        </div>
      </div>

      {/* Tasks List */}
      <div ref={setNodeRef} className="flex-1 flex flex-col gap-3 overflow-y-auto pb-4 min-h-[150px]">
        <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <Card key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};

export default Column;