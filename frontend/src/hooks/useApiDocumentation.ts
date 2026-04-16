import { useState, useEffect } from 'react';
import { ApiDocumentationWithDetails, apiDocumentationService } from '../lib/apiDocumentation';

export const useApiDocumentation = (category?: string) => {
  const [apis, setApis] = useState<ApiDocumentationWithDetails[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchApis = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await apiDocumentationService.getAllApis(category);
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

  const searchApis = async (query: string) => {
    if (!query.trim()) {
      fetchApis();
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const data = await apiDocumentationService.searchApis(query, category);
      setApis(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search APIs');
      console.error('Error searching APIs:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    apis,
    loading,
    error,
    refetch: fetchApis,
    searchApis,
  };
};