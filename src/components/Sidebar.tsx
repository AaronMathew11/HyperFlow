import { modules } from '../data/modules';

export default function Sidebar() {
  const onDragStart = (event: React.DragEvent, moduleType: string) => {
    event.dataTransfer.setData('application/reactflow', moduleType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="w-80 bg-white border-r border-gray-200 p-4 overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-1">Hypervision</h2>
        <p className="text-sm text-gray-600">Drag modules to the canvas</p>
      </div>

      <div className="space-y-2">
        {modules.map((module) => (
          <div
            key={module.id}
            className="p-3 bg-white border-2 rounded-lg cursor-move hover:shadow-md transition-shadow"
            style={{ borderColor: module.color }}
            draggable
            onDragStart={(e) => onDragStart(e, module.id)}
          >
            <div className="flex items-center gap-3">
              <div
                className="text-2xl w-10 h-10 flex items-center justify-center rounded-lg"
                style={{ backgroundColor: `${module.color}20` }}
              >
                {module.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-gray-800 truncate">
                  {module.label}
                </div>
                <div className="text-xs text-gray-500 truncate">
                  {module.description}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
