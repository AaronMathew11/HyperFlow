import { ModuleType } from '../types';

/**
 * Extract domain from URL (from CSP script)
 */
function extractDomain(url: string): string | null {
  try {
    // Skip template URLs that couldn't be resolved
    if (url.includes('{') && url.includes('}')) {
      console.log('Unresolved URL: ', url);
      return null;
    }
    
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch (error) {
    console.warn(`Invalid URL: ${url}`);
    return null;
  }
}

/**
 * Create a workflow object from a single module (for CSP script compatibility)
 */
function createWorkflowFromModule(module: ModuleType): any {
  if (!module.apiInfo?.endpoint) {
    return null;
  }

  return {
    modules: [
      {
        type: 'api',
        properties: {
          url: module.apiInfo.endpoint
        }
      }
    ]
  };
}

/**
 * Extract URLs from workflow modules categorized by CSP directive type
 * (Adapted from CSP script's extractWorkflowUrls function)
 */
function extractWorkflowUrls(workflow: any): any {
  const result = {
    connectSrc: new Set<string>(),  // API endpoints
    scriptSrc: new Set<string>(),   // Scripts 
    styleSrc: new Set<string>(),    // Stylesheets
    frameSrc: new Set<string>(),    // Webview URLs
    imgSrc: new Set<string>()       // Images
  };
  
  if (!workflow?.modules || !Array.isArray(workflow.modules)) {
    return result;
  }
  
  workflow.modules.forEach((module: any) => {
    switch (module.type) {
      case 'face':
      case 'document':
      case 'api':
        if (module.properties && module.properties.url) {
          // For now, just add the URL directly (no template resolution needed for single modules)
          result.connectSrc.add(module.properties.url);
        }
        break;
      
      case 'videoStatementV2':
        if (module.properties) {
          // Extract URLs from various objects in videoStatementV2
          const objects = ['liveness', 'faceMatch', 'speechToTextMatch', 'logVideoStatement', 'videoUpload'];
          objects.forEach(objName => {
            if (module.properties[objName] && module.properties[objName].url) {
              result.connectSrc.add(module.properties[objName].url);
            }
          });
        }
        break;
      
      case 'webview':
        if (module.properties && module.properties.openAsIFrame === true && module.properties.url) {
          result.frameSrc.add(module.properties.url);
        }
        break;
    }
  });
  
  // Convert Sets to Arrays, extract domains, and deduplicate
  return {
    connectSrc: [...new Set(Array.from(result.connectSrc).map(extractDomain).filter(Boolean))],
    scriptSrc: [...new Set(Array.from(result.scriptSrc).map(extractDomain).filter(Boolean))],
    styleSrc: [...new Set(Array.from(result.styleSrc).map(extractDomain).filter(Boolean))],
    frameSrc: [...new Set(Array.from(result.frameSrc).map(extractDomain).filter(Boolean))],
    imgSrc: [...new Set(Array.from(result.imgSrc).map(extractDomain).filter(Boolean))]
  };
}

/**
 * Extract CSP URLs that need to be whitelisted based on module endpoint
 * This uses ONLY the CSP script logic based on endpoint data, no fallback to cspUrls field
 */
export function extractCspUrlsForModule(module: ModuleType): string[] {
  // Only process if module has an endpoint
  if (!module.apiInfo?.endpoint) {
    return [];
  }

  // Only process full URLs, not relative paths
  if (!module.apiInfo.endpoint.startsWith('http')) {
    console.warn(`Module ${module.id} has relative endpoint ${module.apiInfo.endpoint} - cannot extract CSP URLs from relative paths`);
    return [];
  }

  // Create a workflow object for this module
  const workflow = createWorkflowFromModule(module);
  
  if (!workflow) {
    return [];
  }

  // Use the CSP script logic to extract URLs
  const workflowUrls = extractWorkflowUrls(workflow);
  
  // Combine all CSP-relevant URLs
  const allCspUrls = [
    ...workflowUrls.connectSrc,
    ...workflowUrls.scriptSrc,
    ...workflowUrls.styleSrc,
    ...workflowUrls.frameSrc,
    ...workflowUrls.imgSrc
  ];

  return [...new Set(allCspUrls)];
}

/**
 * Extract all unique CSP URLs from an array of modules based on their endpoints
 */
export function extractAllCspUrls(modules: ModuleType[]): string[] {
  const allCspUrls = new Set<string>();
  
  modules.forEach(module => {
    const moduleCspUrls = extractCspUrlsForModule(module);
    moduleCspUrls.forEach(url => allCspUrls.add(url));
  });

  return Array.from(allCspUrls);
}

/**
 * Generate CSP policy string for connect-src directive
 */
export function generateConnectSrcPolicy(cspUrls: string[]): string {
  const httpsUrls = cspUrls.map(url => 
    url.startsWith('https://') ? url : `https://${url}`
  );
  
  return `connect-src 'self' ${httpsUrls.join(' ')};`;
}