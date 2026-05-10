import { useState } from 'react';
import { Client } from '../../../shared/types';

interface CreateClientModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (name: string, description?: string) => void;
    existingClients: Client[];
}

export default function CreateClientModal({ isOpen, onClose, onCreate, existingClients }: CreateClientModalProps) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [nameError, setNameError] = useState('');

    if (!isOpen) return null;

    const checkDuplicateName = (inputName: string) => {
        const trimmedName = inputName.trim();
        if (!trimmedName) {
            setNameError('');
            return false;
        }
        
        const isDuplicate = existingClients.some(
            client => client.name.toLowerCase() === trimmedName.toLowerCase()
        );
        
        if (isDuplicate) {
            setNameError('A client with this name already exists');
            return true;
        } else {
            setNameError('');
            return false;
        }
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        setName(newName);
        checkDuplicateName(newName);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedName = name.trim();
        
        if (!trimmedName) return;
        
        const isDuplicate = checkDuplicateName(trimmedName);
        if (isDuplicate) return;
        
        onCreate(trimmedName, description.trim() || undefined);
        setName('');
        setDescription('');
        setNameError('');
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Create New Client</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Client Name *
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm transition-all ${nameError ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-gray-50'}`}
                            placeholder="Enter client name"
                            autoFocus
                        />
                        {nameError && (
                            <p className="mt-1 text-sm text-red-600">{nameError}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description <span className="text-gray-400 font-normal">(optional)</span>
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm transition-all resize-none"
                            placeholder="Enter description"
                            rows={3}
                        />
                    </div>
                    <div className="mt-8 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!name.trim() || !!nameError}
                            className="px-5 py-2 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Create Client
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
