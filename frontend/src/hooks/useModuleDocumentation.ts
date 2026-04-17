import { useState, useEffect, useRef } from 'react';
import { ModuleDocumentation, moduleDocumentationService } from '../lib/moduleDocumentation';

export const useModuleDocumentation = (category?: string) => {
  const allModules = useRef<ModuleDocumentation[]>([]);
  const [modules, setModules] = useState<ModuleDocumentation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchModules = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await moduleDocumentationService.getAllModules(category);
      allModules.current = data;
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

  const searchModules = (query: string) => {
    if (!query.trim()) {
      setModules(allModules.current);
      return;
    }
    const q = query.toLowerCase();
    setModules(
      allModules.current.filter(
        m =>
          m.name.toLowerCase().includes(q) ||
          m.description?.toLowerCase().includes(q) ||
          m.category?.toLowerCase().includes(q)
      )
    );
  };

  return {
    modules,
    loading,
    error,
    refetch: fetchModules,
    searchModules,
  };
};
