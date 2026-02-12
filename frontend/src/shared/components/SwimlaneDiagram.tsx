import { memo } from 'react';

interface SwimlaneDiagramProps {
    integrationType?: 'api' | 'sdk';
}

function SwimlaneDiagram({ integrationType = 'api' }: SwimlaneDiagramProps) {
    const isAPI = integrationType === 'api';

    return (
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-8 border-2 border-gray-200">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Integration Architecture
                </h2>
                <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full shadow-lg ${isAPI
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                        : 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                    }`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-bold text-sm">{isAPI ? 'API' : 'SDK'} Integration</span>
                </div>
            </div>

            <div className="space-y-8">
                {/* Swimlane Headers */}
                <div className="grid grid-cols-3 gap-6">
                    <div className="text-center transform hover:scale-105 transition-transform duration-200">
                        <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white px-6 py-4 rounded-xl shadow-lg relative overflow-hidden">
                            <div className="absolute inset-0 bg-white opacity-10"></div>
                            <div className="relative flex items-center justify-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                                <h3 className="font-bold text-base">Client Application</h3>
                            </div>
                        </div>
                    </div>
                    <div className="text-center transform hover:scale-105 transition-transform duration-200">
                        <div className="bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 text-white px-6 py-4 rounded-xl shadow-lg relative overflow-hidden">
                            <div className="absolute inset-0 bg-white opacity-10"></div>
                            <div className="relative flex items-center justify-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                                </svg>
                                <h3 className="font-bold text-base">Your System</h3>
                            </div>
                        </div>
                    </div>
                    <div className="text-center transform hover:scale-105 transition-transform duration-200">
                        <div className="bg-gradient-to-br from-green-500 via-green-600 to-green-700 text-white px-6 py-4 rounded-xl shadow-lg relative overflow-hidden">
                            <div className="absolute inset-0 bg-white opacity-10"></div>
                            <div className="relative flex items-center justify-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                <h3 className="font-bold text-base">HyperVerge API</h3>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Flow Diagram */}
                <div className="relative bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-inner">
                    {isAPI ? (
                        // API Integration Flow
                        <div className="space-y-12">
                            {/* Step 1 */}
                            <div className="grid grid-cols-3 gap-6 items-center">
                                <div className="flex justify-center">
                                    <div className="group relative">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
                                        <div className="relative bg-white border-3 border-blue-500 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-200">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                                                <p className="text-sm font-bold text-blue-900">User Action</p>
                                            </div>
                                            <p className="text-xs text-gray-600">Initiates verification request</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-center items-center">
                                    <div className="relative w-full h-1">
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                                        <svg className="absolute -right-2 top-1/2 -translate-y-1/2 w-6 h-6 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <div className="group relative">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
                                        <div className="relative bg-white border-3 border-purple-500 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-200">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                                                <p className="text-sm font-bold text-purple-900">Receive Request</p>
                                            </div>
                                            <p className="text-xs text-gray-600">Validates incoming data</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Step 2 */}
                            <div className="grid grid-cols-3 gap-6 items-center">
                                <div></div>
                                <div className="flex justify-center">
                                    <div className="group relative">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
                                        <div className="relative bg-white border-3 border-purple-500 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-200">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                                                <p className="text-sm font-bold text-purple-900">Process Data</p>
                                            </div>
                                            <p className="text-xs text-gray-600">Formats & prepares payload</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-center items-center">
                                    <div className="relative w-full h-1">
                                        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-green-400 rounded-full"></div>
                                        <svg className="absolute -right-2 top-1/2 -translate-y-1/2 w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div className="grid grid-cols-3 gap-6 items-center">
                                <div></div>
                                <div></div>
                                <div className="flex justify-center">
                                    <div className="group relative">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
                                        <div className="relative bg-white border-3 border-green-500 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-200">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
                                                <p className="text-sm font-bold text-green-900">API Call</p>
                                            </div>
                                            <p className="text-xs text-gray-600">Sends to HyperVerge</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Step 4 */}
                            <div className="grid grid-cols-3 gap-6 items-center">
                                <div></div>
                                <div></div>
                                <div className="flex justify-center">
                                    <div className="group relative">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
                                        <div className="relative bg-white border-3 border-green-500 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-200">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">5</div>
                                                <p className="text-sm font-bold text-green-900">Process</p>
                                            </div>
                                            <p className="text-xs text-gray-600">AI verification & analysis</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Step 5 - Return */}
                            <div className="grid grid-cols-3 gap-6 items-center">
                                <div></div>
                                <div className="flex justify-center items-center">
                                    <div className="relative w-full h-1">
                                        <div className="absolute inset-0 bg-gradient-to-l from-green-400 to-purple-400 rounded-full"></div>
                                        <svg className="absolute -left-2 top-1/2 -translate-y-1/2 w-6 h-6 text-purple-500 rotate-180" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <div className="group relative">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
                                        <div className="relative bg-white border-3 border-green-500 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-200">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">6</div>
                                                <p className="text-sm font-bold text-green-900">Response</p>
                                            </div>
                                            <p className="text-xs text-gray-600">Returns verification result</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Step 6 */}
                            <div className="grid grid-cols-3 gap-6 items-center">
                                <div className="flex justify-center items-center">
                                    <div className="relative w-full h-1">
                                        <div className="absolute inset-0 bg-gradient-to-l from-purple-400 to-blue-400 rounded-full"></div>
                                        <svg className="absolute -left-2 top-1/2 -translate-y-1/2 w-6 h-6 text-blue-500 rotate-180" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <div className="group relative">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
                                        <div className="relative bg-white border-3 border-purple-500 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-200">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">7</div>
                                                <p className="text-sm font-bold text-purple-900">Format Response</p>
                                            </div>
                                            <p className="text-xs text-gray-600">Prepares data for client</p>
                                        </div>
                                    </div>
                                </div>
                                <div></div>
                            </div>

                            {/* Step 7 */}
                            <div className="grid grid-cols-3 gap-6 items-center">
                                <div className="flex justify-center">
                                    <div className="group relative">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
                                        <div className="relative bg-white border-3 border-blue-500 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-200">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">8</div>
                                                <p className="text-sm font-bold text-blue-900">Display Result</p>
                                            </div>
                                            <p className="text-xs text-gray-600">Shows verification to user</p>
                                        </div>
                                    </div>
                                </div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                    ) : (
                        // SDK Integration Flow
                        <div className="space-y-12">
                            {/* Step 1 */}
                            <div className="grid grid-cols-3 gap-6 items-center">
                                <div className="flex justify-center">
                                    <div className="group relative">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
                                        <div className="relative bg-white border-3 border-blue-500 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-200">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                                                <p className="text-sm font-bold text-blue-900">Initialize SDK</p>
                                            </div>
                                            <p className="text-xs text-gray-600">Configure SDK with API key</p>
                                        </div>
                                    </div>
                                </div>
                                <div></div>
                                <div></div>
                            </div>

                            {/* Step 2 */}
                            <div className="grid grid-cols-3 gap-6 items-center">
                                <div className="flex justify-center">
                                    <div className="group relative">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
                                        <div className="relative bg-white border-3 border-blue-500 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-200">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                                                <p className="text-sm font-bold text-blue-900">Capture Document</p>
                                            </div>
                                            <p className="text-xs text-gray-600">User captures photo/document</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-center items-center">
                                    <div className="relative w-full h-1">
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-green-400 rounded-full"></div>
                                        <svg className="absolute -right-2 top-1/2 -translate-y-1/2 w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <div className="group relative">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
                                        <div className="relative bg-white border-3 border-green-500 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-200">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                                                <p className="text-sm font-bold text-green-900">Direct Upload</p>
                                            </div>
                                            <p className="text-xs text-gray-600">SDK sends data securely</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div className="grid grid-cols-3 gap-6 items-center">
                                <div></div>
                                <div></div>
                                <div className="flex justify-center">
                                    <div className="group relative">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
                                        <div className="relative bg-white border-3 border-green-500 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-200">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
                                                <p className="text-sm font-bold text-green-900">Process</p>
                                            </div>
                                            <p className="text-xs text-gray-600">AI verification & analysis</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Step 4 - Return */}
                            <div className="grid grid-cols-3 gap-6 items-center">
                                <div className="flex justify-center items-center">
                                    <div className="relative w-full h-1">
                                        <div className="absolute inset-0 bg-gradient-to-l from-green-400 to-blue-400 rounded-full"></div>
                                        <svg className="absolute -left-2 top-1/2 -translate-y-1/2 w-6 h-6 text-blue-500 rotate-180" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                                        </svg>
                                    </div>
                                </div>
                                <div></div>
                                <div className="flex justify-center">
                                    <div className="group relative">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
                                        <div className="relative bg-white border-3 border-green-500 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-200">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">5</div>
                                                <p className="text-sm font-bold text-green-900">Response</p>
                                            </div>
                                            <p className="text-xs text-gray-600">Returns result to SDK</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Step 5 */}
                            <div className="grid grid-cols-3 gap-6 items-center">
                                <div className="flex justify-center">
                                    <div className="group relative">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
                                        <div className="relative bg-white border-3 border-blue-500 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-200">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">6</div>
                                                <p className="text-sm font-bold text-blue-900">Display Result</p>
                                            </div>
                                            <p className="text-xs text-gray-600">SDK shows verification status</p>
                                        </div>
                                    </div>
                                </div>
                                <div></div>
                                <div></div>
                            </div>

                            {/* Step 6 - Optional Backend Sync */}
                            <div className="grid grid-cols-3 gap-6 items-center opacity-60">
                                <div className="flex justify-center">
                                    <div className="group relative">
                                        <div className="relative bg-white border-3 border-dashed border-blue-400 rounded-xl p-5 shadow-md">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center text-white font-bold text-sm">7</div>
                                                <p className="text-sm font-bold text-blue-800">Optional Sync</p>
                                            </div>
                                            <p className="text-xs text-gray-600">Send result to backend</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-center items-center">
                                    <div className="relative w-full h-1">
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full opacity-50" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 5px, rgba(147, 197, 253, 0.5) 5px, rgba(147, 197, 253, 0.5) 10px)' }}></div>
                                        <svg className="absolute -right-2 top-1/2 -translate-y-1/2 w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <div className="group relative">
                                        <div className="relative bg-white border-3 border-dashed border-purple-400 rounded-xl p-5 shadow-md">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-8 h-8 bg-purple-400 rounded-full flex items-center justify-center text-white font-bold text-sm">8</div>
                                                <p className="text-sm font-bold text-purple-800">Store Result</p>
                                            </div>
                                            <p className="text-xs text-gray-600">Save for analytics</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Legend */}
                    <div className="mt-10 pt-6 border-t-2 border-gray-200">
                        <div className="flex items-center justify-center gap-8 text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-12 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                                <span className="text-gray-700 font-medium">Data Flow</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs">1</div>
                                <span className="text-gray-700 font-medium">Step Number</span>
                            </div>
                            {!isAPI && (
                                <div className="flex items-center gap-2">
                                    <div className="w-12 h-1 border-2 border-dashed border-gray-400 rounded-full"></div>
                                    <span className="text-gray-700 font-medium">Optional Flow</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(SwimlaneDiagram);
