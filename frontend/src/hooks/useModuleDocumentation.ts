import { useState, useEffect } from 'react';
import { ModuleDocumentation, moduleDocumentationService } from '../lib/moduleDocumentation';

export const useModuleDocumentation = (category?: string) => {
  const [modules, setModules] = useState<ModuleDocumentation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchModules = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await moduleDocumentationService.getAllModules(category);
      setModules(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch modules');
      console.error('Error fetching modules:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModules();
  }, [category]);

  const searchModules = async (query: string) => {
    if (!query.trim()) {
      fetchModules();
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const data = await moduleDocumentationService.searchModules(query, category);
      setModules(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search modules');
      console.error('Error searching modules:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    modules,
    loading,
    error,
    refetch: fetchModules,
    searchModules,
  };
};