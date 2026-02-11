import { useNavigate } from 'react-router-dom';

interface BreadcrumbItem {
    label: string;
    path?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
    const _navigate = useNavigate();

    return (
        <nav className="flex items-center space-x-2 text-sm mb-6">
            {items.map((item, index) => (
                <div key={index} className="flex items-center">
                    {index > 0 && (
                        <svg
                            className="h-4 w-4 text-gray-400 mx-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    )}
                    {item.path ? (
                        <button
                            onClick={() => navigate(item.path!)}
                            className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                        >
                            {item.label}
                        </button>
                    ) : (
                        <span className="text-gray-900 font-semibold">{item.label}</span>
                    )}
                </div>
            ))}
        </nav>
    );
}
