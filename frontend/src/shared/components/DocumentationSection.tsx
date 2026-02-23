import { memo, useState } from 'react';

interface DocumentationLink {
    title: string;
    url: string;
    category?: string;
    description?: string;
}

interface DocumentationSectionProps {
    links?: DocumentationLink[];
}

function DocumentationSection({ links = [] }: DocumentationSectionProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    // Default placeholder links if none provided
    const defaultLinks: DocumentationLink[] = [
        {
            title: 'Getting Started Guide',
            url: '#',
            category: 'Getting Started',
            description: 'Learn the basics of integrating with HyperVerge'
        },
        {
            title: 'API Reference',
            url: '#',
            category: 'API Documentation',
            description: 'Complete API endpoint documentation'
        },
        {
            title: 'SDK Integration Guide',
            url: '#',
            category: 'SDK Documentation',
            description: 'Step-by-step SDK integration instructions'
        },
        {
            title: 'Authentication & Security',
            url: '#',
            category: 'Security',
            description: 'Best practices for secure integration'
        },
        {
            title: 'Error Handling',
            url: '#',
            category: 'Troubleshooting',
            description: 'Common errors and how to resolve them'
        },
        {
            title: 'Webhooks Setup',
            url: '#',
            category: 'Advanced',
            description: 'Configure webhooks for real-time updates'
        },
    ];

    const displayLinks = links.length > 0 ? links : defaultLinks;

    // Get unique categories
    const categories = ['all', ...Array.from(new Set(displayLinks.map(link => link.category).filter((c): c is string => Boolean(c))))];

    // Filter links by category only
    const filteredLinks = displayLinks.filter(link => {
        const matchesCategory = selectedCategory === 'all' || link.category === selectedCategory;
        return matchesCategory;
    });

    return (
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Documentation</h2>
                {links.length === 0 && (
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-medium">
                        Placeholder Links
                    </span>
                )}
            </div>

            {/* Category Filter */}
            <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedCategory === category
                                ? 'bg-blue-500 text-white shadow-md'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {category === 'all' ? 'All' : category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Documentation Links Grid */}
            {filteredLinks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredLinks.map((link, index) => (
                        <a
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block p-5 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all duration-200 bg-gradient-to-br from-white to-gray-50"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                            {link.title}
                                        </h3>
                                        <svg
                                            className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </div>
                                    {link.category && (
                                        <span className="inline-block text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full mb-2">
                                            {link.category}
                                        </span>
                                    )}
                                    {link.description && (
                                        <p className="text-sm text-gray-600 mt-2">{link.description}</p>
                                    )}
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <svg
                        className="w-16 h-16 text-gray-300 mx-auto mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-gray-500">No documentation found matching your search.</p>
                </div>
            )}

            {/* Help Text */}
            {links.length === 0 && (
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex gap-3">
                        <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div className="text-sm text-blue-800">
                            <p className="font-medium mb-1">Configure Documentation Links</p>
                            <p className="text-blue-700">These are placeholder links. You can configure actual documentation URLs later through the environment settings.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default memo(DocumentationSection);
