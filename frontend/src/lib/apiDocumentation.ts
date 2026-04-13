import { supabase } from '../shared/lib/supabase';

export interface ApiDocumentation {
  id: string;
  name: string;
  description: string;
  url: string;
  category: 'india_api' | 'global_api';
  curl_example?: string;
  success_response?: any;
  failure_responses?: any[];
  error_details?: any[];
  created_at: string;
  updated_at: string;
}

export interface ApiInput {
  id: string;
  api_id: string;
  name: string;
  type: string;
  description: string;
  required: boolean;
}

export interface ApiOutput {
  id: string;
  api_id: string;
  name: string;
  type: string;
  description: string;
  required: boolean;
}

export interface ApiDocumentationWithDetails extends ApiDocumentation {
  inputs?: ApiInput[];
  outputs?: ApiOutput[];
}

class ApiDocumentationService {
  private baseUrl = '/api/documentation'; // This will be proxied to the backend

  async getAllApis(category?: string): Promise<ApiDocumentation[]> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('No active session');
      }

      let url = this.baseUrl;
      if (category) {
        url += `?category=${category}`;
      }

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch APIs: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching APIs:', error);
      // Return empty array as fallback
      return [];
    }
  }

  async getApiById(id: string): Promise<ApiDocumentationWithDetails | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('No active session');
      }

      const response = await fetch(`${this.baseUrl}/${id}`, {
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`Failed to fetch API: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching API by ID:', error);
      return null;
    }
  }

  async searchApis(query: string, category?: string): Promise<ApiDocumentation[]> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('No active session');
      }

      let url = `${this.baseUrl}/search?q=${encodeURIComponent(query)}`;
      if (category) {
        url += `&category=${category}`;
      }

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to search APIs: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error searching APIs:', error);
      return [];
    }
  }
}

export const apiDocumentationService = new ApiDocumentationService();