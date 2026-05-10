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
  api_inputs_new?: ApiInput[];
  api_outputs_new?: ApiOutput[];
}

class ApiDocumentationService {
  async getAllApis(category?: string): Promise<ApiDocumentationWithDetails[]> {
    try {
      let query = supabase
        .from('api_documentation_new')
        .select('*, api_inputs_new(*), api_outputs_new(*)');

      if (category) {
        query = query.eq('category', category);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching APIs:', error);
        return [];
      }

      return (data as ApiDocumentationWithDetails[]) || [];
    } catch (error) {
      console.error('Error fetching APIs:', error);
      return [];
    }
  }

  async getApiById(id: string): Promise<ApiDocumentationWithDetails | null> {
    try {
      const { data, error } = await supabase
        .from('api_documentation_new')
        .select('*, api_inputs_new(*), api_outputs_new(*)')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching API by ID:', error);
        return null;
      }

      return data as ApiDocumentationWithDetails;
    } catch (error) {
      console.error('Error fetching API by ID:', error);
      return null;
    }
  }

  async searchApis(query: string, category?: string): Promise<ApiDocumentationWithDetails[]> {
    try {
      let dbQuery = supabase
        .from('api_documentation_new')
        .select('*, api_inputs_new(*), api_outputs_new(*)')
        .ilike('name', `%${query}%`);

      if (category) {
        dbQuery = dbQuery.eq('category', category);
      }

      const { data, error } = await dbQuery;

      if (error) {
        console.error('Error searching APIs:', error);
        return [];
      }

      return (data as ApiDocumentationWithDetails[]) || [];
    } catch (error) {
      console.error('Error searching APIs:', error);
      return [];
    }
  }
}

export const apiDocumentationService = new ApiDocumentationService();