
import React from 'react';
import { DataItem, ColumnDefinition } from '../types';

interface ListViewProps {
  data: DataItem[];
  columns: ColumnDefinition[];
}

export const ListView: React.FC<ListViewProps> = ({ data, columns }) => {
  const formatValue = (val: any, type: string) => {
    if (type === 'currency') return `$${val.toLocaleString()}`;
    if (type === 'number') return `${val}%`;
    return val;
  };

  const getStatusColor = (val: string) => {
    const colors: Record<string, string> = {
      'Completed': 'text-emerald-600',
      'In Progress': 'text-blue-600',
      'Delayed': 'text-rose-600',
      'Planning': 'text-amber-600'
    };
    return colors[val] || 'text-slate-600';
  };

  return (
    <div className="space-y-4">
      {data.map(item => (
        <div key={item.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{item.title}</h3>
              <p className="text-sm text-slate-500 flex items-center mt-1">
                <span className="bg-slate-100 px-2 py-0.5 rounded text-xs mr-2">{item.category}</span>
                Assignee: {item.assignee}
              </p>
            </div>
            <div className="flex items-center space-x-6">
               <div className="text-right">
                  <p className="text-xs uppercase tracking-wider text-slate-400 font-bold">Status</p>
                  <p className={`text-sm font-bold ${getStatusColor(item.status)}`}>{item.status}</p>
               </div>
               <div className="h-10 w-[1px] bg-slate-100"></div>
               <div className="text-right">
                  <p className="text-xs uppercase tracking-wider text-slate-400 font-bold">Progress</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-full" 
                        style={{ width: `${item.completion}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-bold text-slate-700">{item.completion}%</span>
                  </div>
               </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-slate-50">
            {columns.filter(c => !['title', 'status', 'completion', 'category', 'assignee'].includes(c.key)).map(col => (
              <div key={col.key}>
                <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">{col.label}</span>
                <span className="text-sm font-semibold text-slate-700">{formatValue(item[col.key], col.type)}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
