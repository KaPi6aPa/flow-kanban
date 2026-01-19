export type Priority = 'High' | 'Medium' | 'Low';

export interface Task {
  id: string;
  title: string;
  tag: string;
  priority: Priority;
  comments: number;
  assigneeAvatar: string;
  dueDate?: string;
}

export interface ColumnType {
  id: string;
  title: string;
  tasks: Task[];
}