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
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />
            <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md p-6 m-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Client</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Client Name *
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${nameError ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
                            placeholder="Enter client name"
                            autoFocus
                        />
                        {nameError && (
                            <p className="mt-1 text-sm text-red-600">{nameError}</p>
                        )}
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description (optional)
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                            placeholder="Enter description"
                            rows={3}
                        />
                    </div>
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!name.trim() || !!nameError}
                            className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Create Client
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
