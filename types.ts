
export interface DataItem {
  id: string | number;
  [key: string]: any;
}

export interface ColumnDefinition {
  key: string;
  label: string;
  type: 'string' | 'number' | 'date' | 'boolean' | 'currency' | 'status';
  isSortable?: boolean;
}

export type ViewMode = 'table' | 'list';

export interface ViewConfig {
  mode: ViewMode;
  groupBy?: string;
  sortBy?: string;
  sortOrder: 'asc' | 'desc';
  searchQuery: string;
  visibleColumns: string[];
}

export interface GroupedData {
  groupValue: any;
  items: DataItem[];
  stats: {
    count: number;
    sum?: number;
    avg?: number;
  };
}
