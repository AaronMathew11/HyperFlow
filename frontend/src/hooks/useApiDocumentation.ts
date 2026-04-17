import { useState, useEffect, useRef } from 'react';
import { ApiDocumentationWithDetails, apiDocumentationService } from '../lib/apiDocumentation';

export const useApiDocumentation = (category?: string) => {
  const allApis = useRef<ApiDocumentationWithDetails[]>([]);
  const [apis, setApis] = useState<ApiDocumentationWithDetails[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchApis = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await apiDocumentationService.getAllApis(category);
      allApis.current = data;
      setApis(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch APIs');
      console.error('Error fetching APIs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApis();
  }, [category]);

  const searchApis = (query: string) => {
    if (!query.trim()) {
      setApis(allApis.current);
      return;
    }
    const q = query.toLowerCase();
    setApis(
      allApis.current.filter(
        a =>
          a.name.toLowerCase().includes(q) ||
          a.description?.toLowerCase().includes(q) ||
          a.category?.toLowerCase().includes(q)
      )
    );
  };

  return {
    apis,
    loading,
    error,
    refetch: fetchApis,
    searchApis,
  };
};
