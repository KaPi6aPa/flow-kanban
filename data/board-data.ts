import { ColumnType } from '../types';

export const initialBoardData: ColumnType[] = [
  {
    id: 'backlog',
    title: 'Backlog',
    tasks: [
      {
        id: 't-1',
        title: 'Design System Audit',
        tag: 'Design',
        priority: 'Medium',
        comments: 3,
        assigneeAvatar: 'https://picsum.photos/32/32?random=1',
        dueDate: 'Oct 24'
      },
      {
        id: 't-2',
        title: 'Refactor Auth Context',
        tag: 'Engineering',
        priority: 'High',
        comments: 8,
        assigneeAvatar: 'https://picsum.photos/32/32?random=2',
      },
      {
        id: 't-3',
        title: 'Update dependencies',
        tag: 'Maintenance',
        priority: 'Low',
        comments: 0,
        assigneeAvatar: 'https://picsum.photos/32/32?random=3',
      }
    ]
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    tasks: [
      {
        id: 't-4',
        title: 'Integrate Stripe Payments',
        tag: 'Feature',
        priority: 'High',
        comments: 12,
        assigneeAvatar: 'https://picsum.photos/32/32?random=4',
        dueDate: 'Tomorrow'
      },
      {
        id: 't-5',
        title: 'User Profile Settings',
        tag: 'Frontend',
        priority: 'Medium',
        comments: 2,
        assigneeAvatar: 'https://picsum.photos/32/32?random=5',
      }
    ]
  },
  {
    id: 'done',
    title: 'Done',
    tasks: [
      {
        id: 't-6',
        title: 'Landing Page v2',
        tag: 'Marketing',
        priority: 'Medium',
        comments: 5,
        assigneeAvatar: 'https://picsum.photos/32/32?random=6',
      },
      {
        id: 't-7',
        title: 'Fix Mobile Navigation',
        tag: 'Bug',
        priority: 'High',
        comments: 1,
        assigneeAvatar: 'https://picsum.photos/32/32?random=7',
        dueDate: 'Yesterday'
      },
      {
        id: 't-8',
        title: 'Analytics Dashboard',
        tag: 'Feature',
        priority: 'Medium',
        comments: 4,
        assigneeAvatar: 'https://picsum.photos/32/32?random=8',
      }
    ]
  }
];