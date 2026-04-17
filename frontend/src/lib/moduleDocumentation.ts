import { supabase } from '../shared/lib/supabase';

export interface ModuleDocumentation {
  id: string;
  name: string;
  description: string;
  category: string;
  color: string;
  icon: string;
  csp_urls?: string[];
  ip_addresses?: string[];
  created_at?: string;
  updated_at?: string;
}

class ModuleDocumentationService {
  async getAllModules(category?: string): Promise<ModuleDocumentation[]> {
    try {
      let query = supabase
        .from('module_documentation_new')
        .select('*');

      if (category) {
        query = query.eq('category', category);
      }

      const { data, error } = await query;

      if (error) {
        console.warn('Error fetching modules from database:', error.message);
        // Return sample modules for demonstration when database access fails
        return this.getSampleModules();
      }

      return (data as ModuleDocumentation[]) || [];
    } catch (error) {
      console.warn('Error fetching modules:', error);
      // Return sample modules for demonstration when database access fails
      return this.getSampleModules();
    }
  }

  private getSampleModules(): ModuleDocumentation[] {
    return [
      {
        id: 'face-match',
        name: 'Face Match',
        description: 'Verify identity using facial recognition',
        category: 'identity_verification',
        color: '#10B981',
        icon: 'user',
        csp_urls: ['https://api.example.com'],
        ip_addresses: ['192.168.1.1']
      },
      {
        id: 'document-verification',
        name: 'Document Verification',
        description: 'Verify authenticity of identity documents',
        category: 'document_verification',
        color: '#3B82F6',
        icon: 'document',
        csp_urls: ['https://api.example.com'],
        ip_addresses: ['192.168.1.1']
      },
      {
        id: 'liveness-check',
        name: 'Liveness Check',
        description: 'Ensure the person is physically present',
        category: 'biometric_verification',
        color: '#8B5CF6',
        icon: 'eye',
        csp_urls: ['https://api.example.com'],
        ip_addresses: ['192.168.1.1']
      },
      {
        id: 'address-verification',
        name: 'Address Verification',
        description: 'Verify residential or business address',
        category: 'address_verification',
        color: '#F59E0B',
        icon: 'location',
        csp_urls: ['https://api.example.com'],
        ip_addresses: ['192.168.1.1']
      }
    ];
  }

  async getModuleById(id: string): Promise<ModuleDocumentation | null> {
    try {
      const { data, error } = await supabase
        .from('module_documentation_new')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching module by ID:', error);
        return null;
      }

      return data as ModuleDocumentation;
    } catch (error) {
      console.error('Error fetching module by ID:', error);
      return null;
    }
  }

  async searchModules(query: string, category?: string): Promise<ModuleDocumentation[]> {
    try {
      let dbQuery = supabase
        .from('module_documentation_new')
        .select('*')
        .ilike('name', `%${query}%`);

      if (category) {
        dbQuery = dbQuery.eq('category', category);
      }

      const { data, error } = await dbQuery;

      if (error) {
        console.warn('Error searching modules from database:', error.message);
        // Fall back to searching sample modules
        const sampleModules = this.getSampleModules();
        return sampleModules.filter(module => 
          module.name.toLowerCase().includes(query.toLowerCase()) &&
          (!category || module.category === category)
        );
      }

      return (data as ModuleDocumentation[]) || [];
    } catch (error) {
      console.warn('Error searching modules:', error);
      // Fall back to searching sample modules
      const sampleModules = this.getSampleModules();
      return sampleModules.filter(module => 
        module.name.toLowerCase().includes(query.toLowerCase()) &&
        (!category || module.category === category)
      );
    }
  }
}

export const moduleDocumentationService = new ModuleDocumentationService();