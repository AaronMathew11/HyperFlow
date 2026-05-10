import { useState } from 'react';

interface FolderCardProps {
    id: string;
    name: string;
    description?: string;
    itemCount?: number;
    itemLabel?: string;
    color?: 'blue' | 'purple' | 'green';
    onOpen: () => void;
    onDelete: (id: string) => void;
}

export default function FolderCard({
    id,
    name,
    description,
    itemCount,
    itemLabel = 'items',
    color = 'blue',
    onOpen,
    onDelete,
}: FolderCardProps) {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const colorClasses = {
        blue: {
            folder: 'text-blue-500',
            bg: 'bg-blue-50',
            hover: 'hover:bg-blue-100',
            border: 'border-blue-200',
        },
        purple: {
            folder: 'text-purple-500',
            bg: 'bg-purple-50',
            hover: 'hover:bg-purple-100',
            border: 'border-purple-200',
        },
        green: {
            folder: 'text-green-500',
            bg: 'bg-green-50',
            hover: 'hover:bg-green-100',
            border: 'border-green-200',
        },
    };

    const colors = colorClasses[color];

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (showDeleteConfirm) {
            onDelete(id);
            setShowDeleteConfirm(false);
        } else {
            setShowDeleteConfirm(true);
            setTimeout(() => setShowDeleteConfirm(false), 3000);
        }
    };

    return (
        <div
            onClick={onOpen}
            className={`relative group cursor-pointer rounded-xl border-2 ${colors.border} ${colors.bg} ${colors.hover} p-6 transition-all duration-200 hover:shadow-lg hover:scale-[1.02]`}
        >
            {/* Delete Button */}
            <button
                onClick={handleDelete}
                className={`absolute top-3 right-3 p-2 rounded-lg transition-all duration-200 ${
                    showDeleteConfirm
                        ? 'bg-red-500 text-white'
                        : 'bg-white/80 text-gray-400 opacity-0 group-hover:opacity-100 hover:text-red-500 hover:bg-red-50'
                }`}
                title={showDeleteConfirm ? 'Click again to confirm' : 'Delete'}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            {/* Folder Icon */}
            <div className="flex flex-col items-center text-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-20 w-20 ${colors.folder} mb-4`}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path d="M19.5 21a3 3 0 003-3v-4.5a3 3 0 00-3-3h-15a3 3 0 00-3 3V18a3 3 0 003 3h15zM1.5 10.146V6a3 3 0 013-3h5.379a2.25 2.25 0 011.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 013 3v1.146A4.483 4.483 0 0019.5 9h-15a4.483 4.483 0 00-3 1.146z" />
                </svg>

                {/* Name */}
                <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
                    {name}
                </h3>

                {/* Description */}
                {description && (
                    <p className="text-sm text-gray-500 line-clamp-2 mb-2">
                        {description}
                    </p>
                )}

                {/* Item Count */}
                {itemCount !== undefined && (
                    <p className="text-xs text-gray-400">
                        {itemCount} {itemCount === 1 ? itemLabel.replace(/s$/, '') : itemLabel}
                    </p>
                )}
            </div>
        </div>
    );
}
