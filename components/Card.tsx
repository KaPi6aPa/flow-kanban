import React from 'react';
import { Task } from '../types';
import { MessageSquare, ArrowUp, ArrowDown, Equal, Trash2 } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useBoard } from '../BoardContext';

interface CardProps {
  task: Task;
  isOverlay?: boolean;
}

const Card: React.FC<CardProps> = ({ task, isOverlay }) => {
  const { deleteTask } = useBoard();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: { ...task },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'High':
        return <ArrowUp size={14} className="text-red-500" />;
      case 'Medium':
        return <Equal size={14} className="text-amber-500" />;
      case 'Low':
        return <ArrowDown size={14} className="text-blue-500" />;
      default:
        return <Equal size={14} className="text-zinc-600" />;
    }
  };

  const getTagStyles = (tag: string) => {
    switch (tag) {
      case 'Bug':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'Feature':
        return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
      case 'Design':
        return 'bg-pink-500/10 text-pink-400 border-pink-500/20';
      default:
        return 'bg-zinc-800 text-zinc-400 border-zinc-700';
    }
  };

  const handleDelete = (e: React.MouseEvent | React.PointerEvent) => {
    e.stopPropagation();
    deleteTask(task.id);
  };

  // If it's the overlay, we force specific styles to match the "lifted" look
  const overlayStyles = isOverlay ? "shadow-2xl scale-105 cursor-grabbing border-indigo-500/50 bg-zinc-850 z-50" : "hover:border-zinc-700 hover:bg-zinc-850 hover:shadow-xl hover:shadow-black/20 hover:-translate-y-0.5";

  return (
    <div 
      ref={setNodeRef}
      style={isOverlay ? undefined : style}
      {...attributes}
      {...listeners}
      className={`group relative p-4 bg-zinc-900 border border-zinc-800 rounded-lg transition-all duration-200 cursor-grab active:cursor-grabbing ${overlayStyles}`}
    >
      
      {/* Selection Indicator (Hidden by default, shown on group hover could be added here) */}
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-indigo-500 rounded-l-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>

      {/* Delete Button */}
      {!isOverlay && (
        <button 
          onClick={handleDelete}
          onPointerDown={(e) => e.stopPropagation()}
          className="absolute top-3 right-3 p-1 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded opacity-0 group-hover:opacity-100 transition-all z-20"
        >
          <Trash2 size={14} />
        </button>
      )}

      {/* Header: ID and Priority */}
      <div className="flex items-start justify-between mb-2">
        <span className="text-[10px] font-mono text-zinc-500 group-hover:text-zinc-400 transition-colors">
            FLOW-{task.id.split('-')[1]}
        </span>
        <div className="opacity-60 group-hover:opacity-0 transition-opacity">
             {getPriorityIcon(task.priority)}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-[13px] font-medium text-zinc-200 mb-3 leading-snug group-hover:text-white transition-colors">
        {task.title}
      </h3>

      {/* Tags & Metadata */}
      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-2">
            <span className={`inline-flex items-center px-2 py-0.5 rounded border text-[10px] font-medium transition-colors ${getTagStyles(task.tag)}`}>
                {task.tag}
            </span>
            {task.dueDate && (
                <span className={`text-[10px] font-medium ${task.dueDate === 'Tomorrow' ? 'text-amber-500' : 'text-zinc-500'}`}>
                    {task.dueDate}
                </span>
            )}
        </div>

        <div className="flex items-center gap-3">
          {task.comments > 0 && (
            <div className="flex items-center gap-1 text-zinc-500 group-hover:text-zinc-400 transition-colors">
              <MessageSquare size={12} />
              <span className="text-[10px]">{task.comments}</span>
            </div>
          )}
          <img 
            src={task.assigneeAvatar} 
            alt="Assignee" 
            className="w-5 h-5 rounded-full border border-zinc-950 group-hover:border-zinc-800 transition-colors"
          />
        </div>
      </div>
    </div>
  );
};

export default Card;