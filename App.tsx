
import React, { useState, useEffect, useMemo } from 'react';
import { ViewMode, ViewConfig, DataItem } from './types';
import { MOCK_DATA, MOCK_COLUMNS } from './constants';
import { TableView } from './components/TableView';
import { ListView } from './components/ListView';
import { getSmartInsights } from './services/geminiService';

const App: React.FC = () => {
  const [config, setConfig] = useState<ViewConfig>({
    mode: 'table',
    sortOrder: 'asc',
    searchQuery: '',
    visibleColumns: MOCK_COLUMNS.map(c => c.key)
  });
  const [data] = useState<DataItem[]>(MOCK_DATA);
  const [insights, setInsights] = useState<string | null>(null);
  const [isLoadingInsights, setIsLoadingInsights] = useState(false);

  useEffect(() => {
    const fetchInsights = async () => {
      setIsLoadingInsights(true);
      const res = await getSmartInsights(data);
      setInsights(res);
      setIsLoadingInsights(false);
    };
    fetchInsights();
  }, [data]);

  const filteredData = useMemo(() => {
    return data.filter(item => 
      Object.values(item).some(val => 
        String(val).toLowerCase().includes(config.searchQuery.toLowerCase())
      )
    );
  }, [data, config.searchQuery]);

  const toggleMode = (mode: ViewMode) => setConfig(prev => ({ ...prev, mode }));
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => 
    setConfig(prev => ({ ...prev, searchQuery: e.target.value }));
  const handleGroupBy = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setConfig(prev => ({ ...prev, groupBy: e.target.value || undefined }));

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 12h10"/><path d="M7 8h10"/><path d="M7 16h10"/></svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Project Engine</h1>
              <p className="text-xs font-medium text-slate-500">Universal Data Management</p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search projects..." 
                className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-64 transition-all"
                value={config.searchQuery}
                onChange={handleSearch}
              />
              <svg className="absolute left-3 top-2.5 text-slate-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </div>
            
            <div className="flex bg-slate-100 p-1 rounded-lg">
              <button 
                onClick={() => toggleMode('table')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${config.mode === 'table' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Table
              </button>
              <button 
                onClick={() => toggleMode('list')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${config.mode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
              >
                List
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
        
        {/* AI Insights Card */}
        <div className="mb-8 bg-gradient-to-br from-indigo-50 to-blue-50 border border-blue-100 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
             <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
          </div>
          <div className="flex items-center space-x-2 mb-3">
             <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
             </span>
             <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600">Smart AI Insights</h2>
          </div>
          {isLoadingInsights ? (
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-blue-300 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-300 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-blue-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            </div>
          ) : (
            <p className="text-slate-700 font-medium leading-relaxed max-w-3xl">
              {insights || "Analyzing data patterns..."}
            </p>
          )}
        </div>

        {/* View Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-bold text-slate-800">Projects <span className="text-slate-400 text-sm font-medium ml-1">({filteredData.length})</span></h2>
            {config.mode === 'table' && (
               <div className="flex items-center space-x-2">
                 <label className="text-xs font-bold text-slate-400 uppercase">Group By:</label>
                 <select 
                    className="text-xs bg-white border border-slate-200 rounded px-2 py-1 outline-none font-bold text-slate-600"
                    onChange={handleGroupBy}
                 >
                   <option value="">None</option>
                   <option value="category">Category</option>
                   <option value="status">Status</option>
                   <option value="assignee">Assignee</option>
                 </select>
               </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
              <span>Export CSV</span>
            </button>
            <button className="bg-blue-600 px-4 py-1.5 rounded-lg text-xs font-bold text-white shadow-lg shadow-blue-100 hover:bg-blue-700 transition-colors">
              Add Project
            </button>
          </div>
        </div>

        {/* Dynamic Display */}
        <div className="transition-all duration-300">
          {config.mode === 'table' ? (
            <TableView 
              data={filteredData} 
              columns={MOCK_COLUMNS} 
              groupBy={config.groupBy}
              sortBy={config.sortBy}
              sortOrder={config.sortOrder}
            />
          ) : (
            <ListView data={filteredData} columns={MOCK_COLUMNS} />
          )}
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-slate-200">
            <div className="mx-auto w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4">
               <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M11 8v6"/><path d="M8 11h6"/></svg>
            </div>
            <h3 className="text-slate-900 font-bold">No projects found</h3>
            <p className="text-slate-500 text-sm mt-1">Try adjusting your search filters</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 px-6 py-6 mt-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <p className="text-xs text-slate-400 font-medium">© 2024 Project Engine. All rights reserved.</p>
          <div className="flex space-x-4">
             <a href="#" className="text-xs text-slate-400 hover:text-slate-600 font-medium">Privacy</a>
             <a href="#" className="text-xs text-slate-400 hover:text-slate-600 font-medium">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
