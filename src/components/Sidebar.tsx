import { useState } from 'react';
import { modules } from '../data/modules';
import ModuleIcon from './ModuleIcon';

export default function Sidebar() {
  const [searchTerm, setSearchTerm] = useState('');

  const onDragStart = (event: React.DragEvent, moduleType: string) => {
    event.dataTransfer.setData('application/reactflow', moduleType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const filteredModules = modules.filter(module =>
    module.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const conditionBox = {
    id: 'condition',
    label: 'Condition',
    description: 'Decision point in workflow',
    color: '#F59E0B',
    icon: '◊',
  };

  const apiModule = {
    id: 'api-module',
    label: 'Generic API',
    description: 'Custom API endpoint module',
    color: '#6366F1',
    icon: '🔗',
  };

  const endStatuses = [
    {
      id: 'end-status-auto-approved',
      label: 'Auto Approved',
      description: 'Automatically approved workflow end',
      color: '#10B981',
      icon: '',
    },
    {
      id: 'end-status-auto-declined',
      label: 'Auto Declined',
      description: 'Automatically declined workflow end',
      color: '#EF4444',
      icon: '',
    },
    {
      id: 'end-status-needs-review',
      label: 'Needs Review',
      description: 'Manual review required workflow end',
      color: '#F59E0B',
      icon: '',
    },
  ];

  return (
    <aside
      className="w-80 p-5 overflow-y-auto relative m-4 rounded-2xl shadow-2xl"
      style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%)',
        backdropFilter: 'blur(80px) saturate(180%)',
        WebkitBackdropFilter: 'blur(80px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.4)',
        boxShadow: 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.9), 0 30px 80px rgba(6, 6, 61, 0.2), 0 0 0 1.5px rgba(6, 6, 61, 0.08)',
        height: 'calc(100vh - 32px)',
      }}
    >
      {/* Glass shimmer effect */}
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, transparent 30%, rgba(6, 6, 61, 0.04) 100%)'
        }}
      />

      <div className="mb-8 relative z-10">
        <h2 className="text-2xl font-semibold text-primary-900 mb-1 tracking-tight">Hypervision</h2>
        <p className="text-sm text-primary-600 font-medium">Drag modules to the canvas</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6 relative z-10">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white/80 border border-primary-200 rounded-lg text-sm text-primary-900 placeholder-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/30 focus:border-primary-400 transition-all"
          />
        </div>
      </div>


      {/* Condition Box */}
      <div className="mb-6 relative z-10">
        <h3 className="text-xs font-semibold text-primary-600 uppercase tracking-wider mb-3">Logic</h3>
        <div
          className="group p-3.5 bg-white/80 rounded-xl cursor-move hover:shadow-md transition-all duration-200 shadow-sm border border-primary-100"
          draggable
          onDragStart={(e) => onDragStart(e, conditionBox.id)}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-primary-50 text-primary-600 group-hover:bg-primary-100 transition-colors">
              <ModuleIcon type="condition" className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm text-primary-900 truncate">
                {conditionBox.label}
              </div>
              <div className="text-xs text-primary-600 truncate mt-0.5">
                {conditionBox.description}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* API Module */}
      <div className="mb-6 relative z-10">
        <h3 className="text-xs font-semibold text-primary-600 uppercase tracking-wider mb-3">API</h3>
        <div
          className="group p-3.5 bg-white/80 rounded-xl cursor-move hover:shadow-md transition-all duration-200 shadow-sm border border-primary-100"
          draggable
          onDragStart={(e) => onDragStart(e, apiModule.id)}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-primary-50 text-primary-600 group-hover:bg-primary-100 transition-colors">
              <ModuleIcon type="api-module" className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm text-primary-900 truncate">
                {apiModule.label}
              </div>
              <div className="text-xs text-primary-600 truncate mt-0.5">
                {apiModule.description}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modules */}
      <div className="mb-6 relative z-10">
        <h3 className="text-xs font-semibold text-primary-600 uppercase tracking-wider mb-3">Modules</h3>
        <div className="space-y-2">
          {filteredModules.map((module) => (
            <div
              key={module.id}
              className="group p-3.5 bg-white/80 rounded-xl cursor-move hover:shadow-md transition-all duration-200 shadow-sm border border-primary-100"
              draggable
              onDragStart={(e) => onDragStart(e, module.id)}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-primary-50 text-primary-600 group-hover:bg-primary-100 transition-colors">
                  <ModuleIcon type={module.id} className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-primary-900 truncate">
                    {module.label}
                  </div>
                  <div className="text-xs text-primary-600 truncate mt-0.5">
                    {module.description}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* End Statuses */}
      <div className="mb-6 relative z-10">
        <h3 className="text-xs font-semibold text-primary-600 uppercase tracking-wider mb-3">End Statuses</h3>
        <div className="space-y-2">
          {endStatuses.map((status) => (
            <div
              key={status.id}
              className="group p-3.5 bg-white/80 rounded-xl cursor-move hover:shadow-md transition-all duration-200 shadow-sm border border-primary-100"
              draggable
              onDragStart={(e) => onDragStart(e, status.id)}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-primary-50 group-hover:bg-primary-100 transition-colors">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: status.color }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-primary-900 truncate">
                    {status.label}
                  </div>
                  <div className="text-xs text-primary-600 truncate mt-0.5">
                    {status.description}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredModules.length === 0 && searchTerm && (
        <div className="text-center text-primary-400 text-sm py-8">
          No modules found matching "{searchTerm}"
        </div>
      )}
    </aside>
  );
}
