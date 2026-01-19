import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { ColumnType, Task, Priority } from './types';
import { initialBoardData } from './data/board-data';
import { arrayMove } from '@dnd-kit/sortable';

interface BoardContextType {
  columns: ColumnType[];
  addTask: (title: string, tag: string, priority: Priority) => void;
  moveTask: (activeId: string, overId: string) => void;
  deleteTask: (taskId: string) => void;
}

const BoardContext = createContext<BoardContextType | undefined>(undefined);

export const BoardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize from localStorage or fallback to initialBoardData
  const [columns, setColumns] = useState<ColumnType[]>(() => {
    const saved = localStorage.getItem('flow-board-data');
    return saved ? JSON.parse(saved) : initialBoardData;
  });

  // Persist to localStorage whenever columns change
  useEffect(() => {
    localStorage.setItem('flow-board-data', JSON.stringify(columns));
  }, [columns]);

  const addTask = (title: string, tag: string, priority: Priority) => {
    const newTask: Task = {
      id: `t-${Date.now()}`,
      title,
      tag,
      priority,
      comments: 0,
      assigneeAvatar: `https://picsum.photos/32/32?random=${Math.floor(Math.random() * 100)}`,
      dueDate: 'Next Week'
    };

    setColumns((prev) =>
      prev.map((col) => {
        if (col.id === 'backlog') {
          return { ...col, tasks: [newTask, ...col.tasks] };
        }
        return col;
      })
    );
  };

  const moveTask = (activeId: string, overId: string) => {
    setColumns((prev) => {
      const activeColumn = prev.find((col) => col.tasks.some((task) => task.id === activeId));
      const overColumn = prev.find((col) => col.tasks.some((task) => task.id === overId) || col.id === overId);

      if (!activeColumn || !overColumn) return prev;

      const activeColumnId = activeColumn.id;
      const overColumnId = overColumn.id;

      const activeIndex = activeColumn.tasks.findIndex((t) => t.id === activeId);
      const overIndex = overColumn.tasks.findIndex((t) => t.id === overId);

      if (activeColumnId !== overColumnId) {
        // Moving between columns
        const activeTasks = [...activeColumn.tasks];
        const overTasks = [...overColumn.tasks];
        const [movedTask] = activeTasks.splice(activeIndex, 1);

        // If overId is the column itself, add to end. Otherwise insert at index.
        if (overColumn.id === overId) {
          overTasks.push(movedTask);
        } else {
          // When moving to a new column, dropping on an item usually inserts after or before.
          // For simplicity in this context, we insert at the target index.
          const insertIndex = overIndex >= 0 ? overIndex : overTasks.length;
          overTasks.splice(insertIndex, 0, movedTask);
        }

        return prev.map((col) => {
          if (col.id === activeColumnId) return { ...col, tasks: activeTasks };
          if (col.id === overColumnId) return { ...col, tasks: overTasks };
          return col;
        });
      } else {
        // Reordering in same column
        if (activeIndex !== overIndex) {
          const newTasks = arrayMove(activeColumn.tasks, activeIndex, overIndex);
          return prev.map((col) => (col.id === activeColumnId ? { ...col, tasks: newTasks } : col));
        }
        return prev;
      }
    });
  };

  const deleteTask = (taskId: string) => {
    setColumns((prev) =>
      prev.map((col) => ({
        ...col,
        tasks: col.tasks.filter((t) => t.id !== taskId),
      }))
    );
  };

  return (
    <BoardContext.Provider value={{ columns, addTask, moveTask, deleteTask }}>
      {children}
    </BoardContext.Provider>
  );
};

export const useBoard = () => {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error('useBoard must be used within a BoardProvider');
  }
  return context;
};