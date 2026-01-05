
import React, { useMemo } from 'react';
import { DataItem, ColumnDefinition, GroupedData } from '../types';

interface TableViewProps {
  data: DataItem[];
  columns: ColumnDefinition[];
  groupBy?: string;
  sortBy?: string;
  sortOrder: 'asc' | 'desc';
}

export const TableView: React.FC<TableViewProps> = ({ data, columns, groupBy, sortBy, sortOrder }) => {
  const sortedData = useMemo(() => {
    let result = [...data];
    if (sortBy) {
      result.sort((a, b) => {
        const valA = a[sortBy];
        const valB = b[sortBy];
        if (typeof valA === 'number' && typeof valB === 'number') {
          return sortOrder === 'asc' ? valA - valB : valB - valA;
        }
        return sortOrder === 'asc' 
          ? String(valA).localeCompare(String(valB))
          : String(valB).localeCompare(String(valA));
      });
    }
    return result;
  }, [data, sortBy, sortOrder]);

  const groups = useMemo(() => {
    if (!groupBy) return null;
    const grouped: Record<string, GroupedData> = {};
    
    sortedData.forEach(item => {
      const val = item[groupBy];
      if (!grouped[val]) {
        grouped[val] = {
          groupValue: val,
          items: [],
          stats: { count: 0, sum: 0 }
        };
      }
      grouped[val].items.push(item);
      grouped[val].stats.count++;
      if (typeof item.budget === 'number') {
        grouped[val].stats.sum! += item.budget;
      }
    });

    return Object.values(grouped);
  }, [sortedData, groupBy]);

  const renderHeader = () => (
    <thead>
      <tr className="bg-slate-50 border-b border-slate-200">
        {columns.map(col => (
          <th key={col.key} className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {col.label}
          </th>
        ))}
      </tr>
    </thead>
  );

  const renderRow = (item: DataItem) => (
    <tr key={item.id} className="hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0">
      {columns.map(col => (
        <td key={col.key} className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 font-medium">
          {formatValue(item[col.key], col.type)}
        </td>
      ))}
    </tr>
  );

  const formatValue = (val: any, type: string) => {
    if (type === 'currency') return `$${val.toLocaleString()}`;
    if (type === 'status') {
      const colors: Record<string, string> = {
        'Completed': 'bg-emerald-100 text-emerald-700',
        'In Progress': 'bg-blue-100 text-blue-700',
        'Delayed': 'bg-rose-100 text-rose-700',
        'Planning': 'bg-amber-100 text-amber-700'
      };
      return <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${colors[val] || 'bg-slate-100'}`}>{val}</span>;
    }
    if (type === 'number' && typeof val === 'number') return `${val}%`;
    return val;
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm bg-white">
      <table className="min-w-full divide-y divide-slate-200">
        {renderHeader()}
        <tbody className="bg-white divide-y divide-slate-100">
          {!groups ? sortedData.map(renderRow) : groups.map(group => (
            <React.Fragment key={group.groupValue}>
              <tr className="bg-slate-50/50">
                <td colSpan={columns.length} className="px-6 py-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900 flex items-center">
                      <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                      {groupBy}: {group.groupValue}
                    </span>
                    <div className="flex space-x-4 text-xs font-medium text-slate-500">
                      <span>Count: {group.stats.count}</span>
                      {group.stats.sum! > 0 && <span>Total Budget: ${group.stats.sum?.toLocaleString()}</span>}
                    </div>
                  </div>
                </td>
              </tr>
              {group.items.map(renderRow)}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};
