
import { DataItem, ColumnDefinition } from './types';

export const MOCK_COLUMNS: ColumnDefinition[] = [
  { key: 'title', label: 'Project Name', type: 'string', isSortable: true },
  { key: 'category', label: 'Category', type: 'string', isSortable: true },
  { key: 'status', label: 'Status', type: 'status', isSortable: true },
  { key: 'budget', label: 'Budget', type: 'currency', isSortable: true },
  { key: 'completion', label: 'Progress (%)', type: 'number', isSortable: true },
  { key: 'dueDate', label: 'Due Date', type: 'date', isSortable: true },
  { key: 'assignee', label: 'Assignee', type: 'string', isSortable: true },
];

export const MOCK_DATA: DataItem[] = [
  { id: 1, title: 'AI Implementation', category: 'Tech', status: 'In Progress', budget: 15000, completion: 45, dueDate: '2024-12-20', assignee: 'Alex Wang' },
  { id: 2, title: 'Branding Refresh', category: 'Marketing', status: 'Completed', budget: 8000, completion: 100, dueDate: '2024-11-05', assignee: 'Sarah Chen' },
  { id: 3, title: 'Cloud Migration', category: 'Infrastructure', status: 'Delayed', budget: 45000, completion: 15, dueDate: '2024-12-10', assignee: 'Kevin Lu' },
  { id: 4, title: 'Mobile App V2', category: 'Tech', status: 'Planning', budget: 25000, completion: 5, dueDate: '2025-02-15', assignee: 'Alex Wang' },
  { id: 5, title: 'Social Media Campaign', category: 'Marketing', status: 'In Progress', budget: 5000, completion: 60, dueDate: '2024-11-30', assignee: 'Sarah Chen' },
  { id: 6, title: 'Server Upgrade', category: 'Infrastructure', status: 'In Progress', budget: 12000, completion: 80, dueDate: '2024-11-20', assignee: 'Kevin Lu' },
  { id: 7, title: 'Customer Support Bot', category: 'Tech', status: 'In Progress', budget: 9000, completion: 30, dueDate: '2024-12-15', assignee: 'Alex Wang' },
  { id: 8, title: 'Product Launch', category: 'Marketing', status: 'Planning', budget: 35000, completion: 0, dueDate: '2025-01-10', assignee: 'Sarah Chen' },
];
