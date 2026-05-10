const fs = require('fs');
const path = require('path');

// Global variables
let debug = false;
let countriesModules = new Map();

// Existing CSP Policy
const EXISTING_CSP_POLICY = `
  script-src 'self' 'unsafe-eval' 'unsafe-inline'
    https://websdk-c9a29-default-rtdb.firebaseio.com
    https://cdn.jsdelivr.net
    https://cdnjs.cloudflare.com
    https://hv-web-sdk-cdn.hyperverge.co 
    https://config-cdn.hyperverge.co 
    https://www.gstatic.com 
    https://hv-camera-web-sg.s3.ap-southeast-1.amazonaws.com 
    https://hv-camera-web-sg.s3-ap-southeast-1.amazonaws.com 
    https://*.firebaseio.com;

  connect-src data: blob: 
    wss://*.firebaseio.com 
     https://www.gstatic.com 
    https://o435277.ingest.us.sentry.io 
    https://identitytoolkit.googleapis.com 
    https://securetoken.googleapis.com 
    'self' 
    https://hv-camera-web-sg.s3-ap-southeast-1.amazonaws.com 
    https://hv-camera-web-sg.s3.ap-southeast-1.amazonaws.com 
    https://cdn.jsdelivr.net
    https://cdnjs.cloudflare.com
    https://hv-websdk.s3.ap-south-1.amazonaws.com 
    https://hv-web-sdk-cdn.hyperverge.co 
    https://config-cdn.hyperverge.co 
    https://hypersnapweb.hyperverge.co 
    https://ind.idv.hyperverge.co 
    https://ind-thomas.hyperverge.co 
    https://ind-engine.thomas.hyperverge.co
    https://api.ipify.org 
    https://www.cloudflare.com 
    https://o435277.ingest.sentry.io 
    https://websdk-c9a29-default-rtdb.firebaseio.com 
    https://*.firebaseapp.com 
    https://dq4nytsa795t1.cloudfront.net 
    https://*.edge.hyperverge.co; 

  img-src 'self' blob: data: 
    https://hv-web-sdk-cdn.hyperverge.co 
    https://config-cdn.hyperverge.co 
    https://hv-camera-web-sg.s3.ap-southeast-1.amazonaws.com 
    https://hv-camera-web-sg.s3-ap-southeast-1.amazonaws.com 
    https://*.edge.hyperverge.co; 

  style-src 'self' 'unsafe-inline' 
    https://fonts.googleapis.com;

  frame-src 'self' 
    https://*.firebaseio.com ;
  worker-src 'self'  blob:;
`;

/**
 * CSP Parser - Workflow Domain Extractor for CSP Whitelisting
 * 
 * This script parses workflow JSON files to extract unique domains used throughout
 * the workflow for Content Security Policy (CSP) whitelisting. It handles both 
 * direct URLs and template URLs that need to be resolved with country-specific base URLs.
 */

// Country ID to Base URL mapping (hardcoded for reliability)
const COUNTRY_BASE_URL_MAP = {
  "abw": "https://sgp.idv.hyperverge.co",
  "afg": "https://sgp.idv.hyperverge.co",
  "ago": "https://sgp.idv.hyperverge.co",
  "aia": "https://sgp.idv.hyperverge.co",
  "ala": "https://sgp.idv.hyperverge.co",
  "alb": "https://sgp.idv.hyperverge.co",
  "and": "https://sgp.idv.hyperverge.co",
  "are": "https://ind.idv.hyperverge.co",
  "arg": "https://sgp.idv.hyperverge.co",
  "arm": "https://sgp.idv.hyperverge.co",
  "asm": "https://sgp.idv.hyperverge.co",
  "ata": "https://sgp.idv.hyperverge.co",
  "atf": "https://sgp.idv.hyperverge.co",
  "atg": "https://sgp.idv.hyperverge.co",
  "aus": "https://sgp.idv.hyperverge.co",
  "aut": "https://irl.idv.hyperverge.co",
  "aze": "https://sgp.idv.hyperverge.co",
  "bdi": "https://sgp.idv.hyperverge.co",
  "bel": "https://irl.idv.hyperverge.co",
  "ben": "https://sgp.idv.hyperverge.co",
  "bes": "https://sgp.idv.hyperverge.co",
  "bfa": "https://zaf.idv.hyperverge.co",
  "bgd": "https://sgp.idv.hyperverge.co",
  "bgr": "https://irl.idv.hyperverge.co",
  "bhr": "https://sgp.idv.hyperverge.co",
  "bhs": "https://sgp.idv.hyperverge.co",
  "bih": "https://sgp.idv.hyperverge.co",
  "blm": "https://sgp.idv.hyperverge.co",
  "blr": "https://sgp.idv.hyperverge.co",
  "blz": "https://sgp.idv.hyperverge.co",
  "bmu": "https://sgp.idv.hyperverge.co",
  "bol": "https://sgp.idv.hyperverge.co",
  "bra": "https://sgp.idv.hyperverge.co",
  "brb": "https://sgp.idv.hyperverge.co",
  "brn": "https://sgp.idv.hyperverge.co",
  "btn": "https://sgp.idv.hyperverge.co",
  "bvt": "https://sgp.idv.hyperverge.co",
  "bwa": "https://zaf.idv.hyperverge.co",
  "caf": "https://sgp.idv.hyperverge.co",
  "can": "https://sgp.idv.hyperverge.co",
  "cck": "https://sgp.idv.hyperverge.co",
  "che": "https://irl.idv.hyperverge.co",
  "chl": "https://sgp.idv.hyperverge.co",
  "chn": "https://sgp.idv.hyperverge.co",
  "civ": "https://zaf.idv.hyperverge.co",
  "cmr": "https://zaf.idv.hyperverge.co",
  "cod": "https://zaf.idv.hyperverge.co",
  "cog": "https://sgp.idv.hyperverge.co",
  "cok": "https://sgp.idv.hyperverge.co",
  "col": "https://sgp.idv.hyperverge.co",
  "com": "https://sgp.idv.hyperverge.co",
  "cpv": "https://sgp.idv.hyperverge.co",
  "cri": "https://sgp.idv.hyperverge.co",
  "cub": "https://sgp.idv.hyperverge.co",
  "cuw": "https://sgp.idv.hyperverge.co",
  "cxr": "https://sgp.idv.hyperverge.co",
  "cym": "https://sgp.idv.hyperverge.co",
  "cyp": "https://irl.idv.hyperverge.co",
  "cze": "https://irl.idv.hyperverge.co",
  "deu": "https://irl.idv.hyperverge.co",
  "dji": "https://sgp.idv.hyperverge.co",
  "dma": "https://sgp.idv.hyperverge.co",
  "dnk": "https://irl.idv.hyperverge.co",
  "dom": "https://sgp.idv.hyperverge.co",
  "dza": "https://zaf.idv.hyperverge.co",
  "ecu": "https://sgp.idv.hyperverge.co",
  "egy": "https://zaf.idv.hyperverge.co",
  "eri": "https://sgp.idv.hyperverge.co",
  "esh": "https://sgp.idv.hyperverge.co",
  "esp": "https://irl.idv.hyperverge.co",
  "est": "https://irl.idv.hyperverge.co",
  "eth": "https://sgp.idv.hyperverge.co",
  "fin": "https://irl.idv.hyperverge.co",
  "fji": "https://sgp.idv.hyperverge.co",
  "flk": "https://sgp.idv.hyperverge.co",
  "fra": "https://irl.idv.hyperverge.co",
  "fro": "https://sgp.idv.hyperverge.co",
  "fsm": "https://sgp.idv.hyperverge.co",
  "gab": "https://sgp.idv.hyperverge.co",
  "gbr": "https://irl.idv.hyperverge.co",
  "geo": "https://sgp.idv.hyperverge.co",
  "ggy": "https://sgp.idv.hyperverge.co",
  "gha": "https://zaf.idv.hyperverge.co",
  "gib": "https://sgp.idv.hyperverge.co",
  "gin": "https://sgp.idv.hyperverge.co",
  "glp": "https://sgp.idv.hyperverge.co",
  "gmb": "https://sgp.idv.hyperverge.co",
  "gnb": "https://sgp.idv.hyperverge.co",
  "gnq": "https://sgp.idv.hyperverge.co",
  "grc": "https://irl.idv.hyperverge.co",
  "grd": "https://sgp.idv.hyperverge.co",
  "grl": "https://sgp.idv.hyperverge.co",
  "gtm": "https://sgp.idv.hyperverge.co",
  "guf": "https://sgp.idv.hyperverge.co",
  "gum": "https://sgp.idv.hyperverge.co",
  "guy": "https://sgp.idv.hyperverge.co",
  "hkg": "https://sgp.idv.hyperverge.co",
  "hmd": "https://sgp.idv.hyperverge.co",
  "hnd": "https://sgp.idv.hyperverge.co",
  "hrv": "https://irl.idv.hyperverge.co",
  "hti": "https://sgp.idv.hyperverge.co",
  "hun": "https://irl.idv.hyperverge.co",
  "idn": "https://idn.idv.hyperverge.co",
  "imn": "https://sgp.idv.hyperverge.co",
  "ind": "https://ind.idv.hyperverge.co",
  "iot": "https://sgp.idv.hyperverge.co",
  "irl": "https://irl.idv.hyperverge.co",
  "irn": "https://sgp.idv.hyperverge.co",
  "irq": "https://sgp.idv.hyperverge.co",
  "isl": "https://irl.idv.hyperverge.co",
  "isr": "https://sgp.idv.hyperverge.co",
  "ita": "https://irl.idv.hyperverge.co",
  "jam": "https://sgp.idv.hyperverge.co",
  "jey": "https://sgp.idv.hyperverge.co",
  "jor": "https://sgp.idv.hyperverge.co",
  "jpn": "https://sgp.idv.hyperverge.co",
  "kaz": "https://sgp.idv.hyperverge.co",
  "ken": "https://zaf.idv.hyperverge.co",
  "kgz": "https://sgp.idv.hyperverge.co",
  "khm": "https://sgp.idv.hyperverge.co",
  "kir": "https://sgp.idv.hyperverge.co",
  "kna": "https://sgp.idv.hyperverge.co",
  "kor": "https://sgp.idv.hyperverge.co",
  "kos": "https://sgp.idv.hyperverge.co",
  "kwt": "https://sgp.idv.hyperverge.co",
  "lao": "https://sgp.idv.hyperverge.co",
  "lbn": "https://sgp.idv.hyperverge.co",
  "lbr": "https://sgp.idv.hyperverge.co",
  "lby": "https://zaf.idv.hyperverge.co",
  "lca": "https://sgp.idv.hyperverge.co",
  "lie": "https://irl.idv.hyperverge.co",
  "lka": "https://sgp.idv.hyperverge.co",
  "lso": "https://sgp.idv.hyperverge.co",
  "ltu": "https://irl.idv.hyperverge.co",
  "lux": "https://irl.idv.hyperverge.co",
  "lva": "https://irl.idv.hyperverge.co",
  "mac": "https://sgp.idv.hyperverge.co",
  "maf": "https://sgp.idv.hyperverge.co",
  "mar": "https://zaf.idv.hyperverge.co",
  "mco": "https://sgp.idv.hyperverge.co",
  "mda": "https://sgp.idv.hyperverge.co",
  "mdg": "https://sgp.idv.hyperverge.co",
  "mdv": "https://sgp.idv.hyperverge.co",
  "mex": "https://sgp.idv.hyperverge.co",
  "mhl": "https://sgp.idv.hyperverge.co",
  "mkd": "https://sgp.idv.hyperverge.co",
  "mli": "https://sgp.idv.hyperverge.co",
  "mlt": "https://irl.idv.hyperverge.co",
  "mmr": "https://sgp.idv.hyperverge.co",
  "mne": "https://sgp.idv.hyperverge.co",
  "mng": "https://sgp.idv.hyperverge.co",
  "mnp": "https://sgp.idv.hyperverge.co",
  "moz": "https://zaf.idv.hyperverge.co",
  "mrt": "https://sgp.idv.hyperverge.co",
  "msr": "https://sgp.idv.hyperverge.co",
  "mtq": "https://sgp.idv.hyperverge.co",
  "mus": "https://zaf.idv.hyperverge.co",
  "mwi": "https://sgp.idv.hyperverge.co",
  "mys": "https://sgp.idv.hyperverge.co",
  "myt": "https://sgp.idv.hyperverge.co",
  "nam": "https://sgp.idv.hyperverge.co",
  "ncl": "https://sgp.idv.hyperverge.co",
  "ner": "https://sgp.idv.hyperverge.co",
  "nfk": "https://sgp.idv.hyperverge.co",
  "nga": "https://zaf.idv.hyperverge.co",
  "nic": "https://sgp.idv.hyperverge.co",
  "niu": "https://sgp.idv.hyperverge.co",
  "nld": "https://irl.idv.hyperverge.co",
  "nor": "https://irl.idv.hyperverge.co",
  "npl": "https://sgp.idv.hyperverge.co",
  "nru": "https://sgp.idv.hyperverge.co",
  "nzl": "https://sgp.idv.hyperverge.co",
  "omn": "https://sgp.idv.hyperverge.co",
  "pak": "https://sgp.idv.hyperverge.co",
  "pan": "https://sgp.idv.hyperverge.co",
  "pcn": "https://sgp.idv.hyperverge.co",
  "per": "https://sgp.idv.hyperverge.co",
  "phl": "https://sgp.idv.hyperverge.co",
  "plw": "https://sgp.idv.hyperverge.co",
  "png": "https://sgp.idv.hyperverge.co",
  "pol": "https://irl.idv.hyperverge.co",
  "pri": "https://sgp.idv.hyperverge.co",
  "prk": "https://sgp.idv.hyperverge.co",
  "prt": "https://irl.idv.hyperverge.co",
  "pry": "https://sgp.idv.hyperverge.co",
  "pse": "https://sgp.idv.hyperverge.co",
  "pyf": "https://sgp.idv.hyperverge.co",
  "qat": "https://sgp.idv.hyperverge.co",
  "reu": "https://sgp.idv.hyperverge.co",
  "rou": "https://irl.idv.hyperverge.co",
  "rus": "https://sgp.idv.hyperverge.co",
  "rwa": "https://zaf.idv.hyperverge.co",
  "sau": "https://sgp.idv.hyperverge.co",
  "sdn": "https://zaf.idv.hyperverge.co",
  "sen": "https://zaf.idv.hyperverge.co",
  "sgp": "https://sgp.idv.hyperverge.co",
  "sgs": "https://sgp.idv.hyperverge.co",
  "shn": "https://sgp.idv.hyperverge.co",
  "sjm": "https://sgp.idv.hyperverge.co",
  "slb": "https://sgp.idv.hyperverge.co",
  "sle": "https://sgp.idv.hyperverge.co",
  "slv": "https://sgp.idv.hyperverge.co",
  "smr": "https://sgp.idv.hyperverge.co",
  "som": "https://sgp.idv.hyperverge.co",
  "spm": "https://sgp.idv.hyperverge.co",
  "srb": "https://sgp.idv.hyperverge.co",
  "ssd": "https://sgp.idv.hyperverge.co",
  "stp": "https://sgp.idv.hyperverge.co",
  "sur": "https://sgp.idv.hyperverge.co",
  "svk": "https://irl.idv.hyperverge.co",
  "svn": "https://irl.idv.hyperverge.co",
  "swe": "https://irl.idv.hyperverge.co",
  "swz": "https://zaf.idv.hyperverge.co",
  "sxm": "https://sgp.idv.hyperverge.co",
  "syc": "https://sgp.idv.hyperverge.co",
  "syr": "https://sgp.idv.hyperverge.co",
  "tca": "https://sgp.idv.hyperverge.co",
  "tcd": "https://sgp.idv.hyperverge.co",
  "tgo": "https://sgp.idv.hyperverge.co",
  "tha": "https://sgp.idv.hyperverge.co",
  "tjk": "https://sgp.idv.hyperverge.co",
  "tkl": "https://sgp.idv.hyperverge.co",
  "tkm": "https://sgp.idv.hyperverge.co",
  "tls": "https://sgp.idv.hyperverge.co",
  "ton": "https://sgp.idv.hyperverge.co",
  "tto": "https://sgp.idv.hyperverge.co",
  "tun": "https://zaf.idv.hyperverge.co",
  "tur": "https://sgp.idv.hyperverge.co",
  "tuv": "https://sgp.idv.hyperverge.co",
  "twn": "https://sgp.idv.hyperverge.co",
  "tza": "https://zaf.idv.hyperverge.co",
  "uga": "https://zaf.idv.hyperverge.co",
  "ukr": "https://sgp.idv.hyperverge.co",
  "umi": "https://sgp.idv.hyperverge.co",
  "ury": "https://sgp.idv.hyperverge.co",
  "usa": "https://usa.idv.hyperverge.co",
  "uzb": "https://sgp.idv.hyperverge.co",
  "vat": "https://sgp.idv.hyperverge.co",
  "vct": "https://sgp.idv.hyperverge.co",
  "ven": "https://sgp.idv.hyperverge.co",
  "vgb": "https://sgp.idv.hyperverge.co",
  "vir": "https://sgp.idv.hyperverge.co",
  "vnm": "https://sgp.idv.hyperverge.co",
  "vut": "https://sgp.idv.hyperverge.co",
  "wlf": "https://sgp.idv.hyperverge.co",
  "wsm": "https://irl.idv.hyperverge.co",
  "yem": "https://sgp.idv.hyperverge.co",
  "zaf": "https://zaf.idv.hyperverge.co",
  "zmb": "https://sgp.idv.hyperverge.co",
  "zwe": "https://sgp.idv.hyperverge.co"
};




/**
 * Resolves template URLs by replacing module ID placeholder with actual base URLs
 * @param {string} templateUrl - URL template with placeholder (e.g., "{module_country_picker.baseUrl}/v1/readId")
 * @returns {Array<string>} Array of resolved URLs (unique base URLs only)
 */
function resolveTemplateUrl(templateUrl) {
  const countryUrlsMap = COUNTRY_BASE_URL_MAP;
  const resolvedUrls = new Set(); // Use Set to avoid duplicates

  // Check if it's a template URL
  if (!templateUrl.includes('{') || !templateUrl.includes('.baseUrl}')) {
    return [templateUrl];
  }

  // Find which countries module this template URL references
  let referencedModuleId = null;
  let supportedCountries = null;

  for (const [moduleId, countries] of countriesModules) {
    if (templateUrl.includes(`{${moduleId}.baseUrl}`)) {
      referencedModuleId = moduleId;
      supportedCountries = countries;
      break;
    }
  }

  if (!referencedModuleId || !supportedCountries) {
    return [templateUrl];
  }

  const templatePattern = `{${referencedModuleId}.baseUrl}`;
  
  if (debug) {
    console.log(`Resolving template: ${templateUrl} using module: ${referencedModuleId} with countries: [${supportedCountries.join(', ')}]`);
  }

  supportedCountries.forEach(countryId => {
    const baseUrl = countryUrlsMap[countryId];
    if (baseUrl) {
      // Replace template placeholder with actual base URL
      const resolvedUrl = templateUrl.replace(templatePattern, baseUrl);
      resolvedUrls.add(resolvedUrl);
    } else {
      console.warn(`Base URL not found for country: ${countryId}`);
    }
  });

  return Array.from(resolvedUrls);
}

/**
 * Extracts the domain from a URL
 * @param {string} url - The URL to extract domain from
 * @returns {string|null} The domain or null if invalid URL
 */
function extractDomain(url) {
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
 * Extract URLs from dynamicFormV2 modules categorized by type
 * @param {Object} module - The dynamicFormV2 module
 * @returns {Object} Object with scripts and stylesheets arrays
 */
function extractDynamicFormV2Urls(module) {
  const result = {
    scripts: [],
    stylesheets: [],
    apiUrls: [],
    imageUrls: []
  };
  
  if (module.properties) {
    // Extract from scripts array
    if (Array.isArray(module.properties.scripts)) {
      result.scripts.push(...module.properties.scripts.filter(script => 
        typeof script === 'string' && script.startsWith('http')
      ));
    }
    
    // Extract from stylesheets array
    if (Array.isArray(module.properties.stylesheets)) {
      result.stylesheets.push(...module.properties.stylesheets.filter(stylesheet => 
        typeof stylesheet === 'string' && stylesheet.startsWith('http')
      ));
    }
  }
  
  return result;
}

/**
 * Extract URLs from dynamicForm modules (images, APIs, scripts, etc.)
 * @param {Object} module - The dynamicForm module
 * @returns {Object} Object with categorized URLs
 */
function extractDynamicFormUrls(module) {
  const result = {
    imageUrls: [],
    apiUrls: [],
    scriptUrls: [],
    stylesheetUrls: []
  };
  
  if (!module.properties || !Array.isArray(module.properties.sections)) {
    return result;
  }
  
  // Helper function to extract URLs from components array (recursive)
  const extractUrlsFromComponents = (components) => {
    if (!Array.isArray(components)) return;
    
    components.forEach(component => {
      // Check if component itself has URLs
      if (component.type === 'image' && 
          typeof component.value === 'string' && 
          component.value.startsWith('http')) {
        result.imageUrls.push(component.value);
      }
      
      // Check for API URLs in component
      if (typeof component.url === 'string' && component.url.startsWith('http')) {
        result.apiUrls.push(component.url);
      }
      
      // Check for script URLs in component
      if (typeof component.script === 'string' && component.script.startsWith('http')) {
        result.scriptUrls.push(component.script);
      }
      
      // Check for stylesheet URLs in component
      if (typeof component.stylesheet === 'string' && component.stylesheet.startsWith('http')) {
        result.stylesheetUrls.push(component.stylesheet);
      }
      
      // Check for any properties that might contain URLs
      Object.keys(component).forEach(key => {
        if (typeof component[key] === 'string' && 
            component[key].startsWith('http') && 
            !['url', 'script', 'stylesheet', 'value'].includes(key)) {
          // Categorize based on common patterns
          if (key.toLowerCase().includes('image') || key.toLowerCase().includes('img')) {
            result.imageUrls.push(component[key]);
          } else if (key.toLowerCase().includes('script') || key.toLowerCase().includes('js')) {
            result.scriptUrls.push(component[key]);
          } else if (key.toLowerCase().includes('style') || key.toLowerCase().includes('css')) {
            result.stylesheetUrls.push(component[key]);
          } else {
            result.apiUrls.push(component[key]);
          }
        }
      });
      
      // Recursively check subComponents (handles nested subComponents)
      if (Array.isArray(component.subComponents)) {
        extractUrlsFromComponents(component.subComponents);
      }
      
      // Recursively check components array (nested components)
      if (Array.isArray(component.components)) {
        extractUrlsFromComponents(component.components);
      }
    });
  };
  
  // Process each section
  module.properties.sections.forEach(section => {
    // Extract from components
    if (Array.isArray(section.components)) {
      extractUrlsFromComponents(section.components);
    }
    
    // Extract from footer components
    if (section.footer && Array.isArray(section.footer.components)) {
      extractUrlsFromComponents(section.footer.components);
    }
  });
  
  return result;
}

/**
 * Extract URLs from workflow modules categorized by CSP directive type
 * @param {Object} workflow - The workflow object
 * @param {string} workflowPath - Path to the workflow file (optional, for UI config detection)
 * @returns {Object} Object with categorized URLs for different CSP directives
 */
function extractWorkflowUrls(workflow, workflowPath = null) {
  const result = {
    connectSrc: new Set(),  // API endpoints, face, document, videoStatementV2, animation URLs
    scriptSrc: new Set(),   // Scripts from dynamicFormV2
    styleSrc: new Set(),    // Stylesheets from dynamicFormV2
    frameSrc: new Set(),    // Webview URLs with openAsIFrame=true
    imgSrc: new Set()       // Images from dynamicForm
  };
  
  if (!workflow.modules || !Array.isArray(workflow.modules)) {
    return result;
  }
  
  workflow.modules.forEach(module => {
    switch (module.type) {
      case 'face':
      case 'document':
      case 'api':
        if (module.properties && module.properties.url) {
          const resolvedUrls = resolveTemplateUrl(module.properties.url);
          resolvedUrls.forEach(url => result.connectSrc.add(url));
        }
        break;
      
      case 'videoStatementV2':
        if (module.properties) {
          // Extract URLs from various objects in videoStatementV2
          const objects = ['liveness', 'faceMatch', 'speechToTextMatch', 'logVideoStatement', 'videoUpload'];
          objects.forEach(objName => {
            if (module.properties[objName] && module.properties[objName].url) {
              const resolvedUrls = resolveTemplateUrl(module.properties[objName].url);
              resolvedUrls.forEach(url => result.connectSrc.add(url));
            }
          });
        }
        break;
      
      case 'dynamicFormV2':
        const formUrls = extractDynamicFormV2Urls(module);
        // Add scripts to script-src
        formUrls.scripts.forEach(script => {
          const resolvedUrls = resolveTemplateUrl(script);
          resolvedUrls.forEach(url => result.scriptSrc.add(url));
        });
        // Add stylesheets to style-src
        formUrls.stylesheets.forEach(stylesheet => {
          const resolvedUrls = resolveTemplateUrl(stylesheet);
          resolvedUrls.forEach(url => result.styleSrc.add(url));
        });
        // Add API URLs to connect-src
        formUrls.apiUrls.forEach(apiUrl => {
          const resolvedUrls = resolveTemplateUrl(apiUrl);
          resolvedUrls.forEach(url => result.connectSrc.add(url));
        });
        // Add images to both img-src and connect-src
        formUrls.imageUrls.forEach(imageUrl => {
          const resolvedUrls = resolveTemplateUrl(imageUrl);
          resolvedUrls.forEach(url => {
            result.imgSrc.add(url);
            result.connectSrc.add(url); // Also add to connect-src for JS/AJAX loading
          });
        });
        break;
      
      case 'dynamicForm':
        const dynamicFormUrls = extractDynamicFormUrls(module);
        // Add images to both img-src and connect-src
        dynamicFormUrls.imageUrls.forEach(imageUrl => {
          const resolvedUrls = resolveTemplateUrl(imageUrl);
          resolvedUrls.forEach(url => {
            result.imgSrc.add(url);
            result.connectSrc.add(url); // Also add to connect-src for JS/AJAX loading
          });
        });
        // Add API URLs to connect-src
        dynamicFormUrls.apiUrls.forEach(apiUrl => {
          const resolvedUrls = resolveTemplateUrl(apiUrl);
          resolvedUrls.forEach(url => result.connectSrc.add(url));
        });
        // Add script URLs to script-src
        dynamicFormUrls.scriptUrls.forEach(scriptUrl => {
          const resolvedUrls = resolveTemplateUrl(scriptUrl);
          resolvedUrls.forEach(url => result.scriptSrc.add(url));
        });
        // Add stylesheet URLs to style-src
        dynamicFormUrls.stylesheetUrls.forEach(stylesheetUrl => {
          const resolvedUrls = resolveTemplateUrl(stylesheetUrl);
          resolvedUrls.forEach(url => result.styleSrc.add(url));
        });
        break;
      
      case 'webview':
        if (module.properties && module.properties.openAsIFrame === true && module.properties.url) {
          const resolvedUrls = resolveTemplateUrl(module.properties.url);
          resolvedUrls.forEach(url => result.frameSrc.add(url));
        }
        break;
      
      case 'countries':
        // Find countries modules and store their mapping
        if (module.properties && module.properties.countriesSupported) {
          countriesModules.set(module.id, module.properties.countriesSupported);
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
 * Extract CSP URLs based on module endpoints
 * @param {Array} modules - Array of module objects with endpoint and cspUrls
 * @returns {Array} Array of unique CSP URLs that need to be whitelisted
 */
function extractCspUrlsByEndpoint(modules) {
  const cspUrls = new Set();
  
  if (!Array.isArray(modules)) {
    return [];
  }

  modules.forEach(module => {
    if (module && module.apiInfo && module.apiInfo.endpoint && module.cspUrls) {
      // Add all CSP URLs for this module based on its endpoint
      module.cspUrls.forEach(url => {
        if (url && typeof url === 'string') {
          cspUrls.add(url);
        }
      });
    }
  });

  return Array.from(cspUrls);
}

/**
 * Extract API endpoints from workflow modules (backward compatibility)
 * @param {Object} workflow - The workflow object
 * @returns {Array} Array of unique API endpoints
 */
function extractApiEndpoints(workflow) {
  const urls = extractWorkflowUrls(workflow);
  return [...urls.connectSrc, ...urls.scriptSrc, ...urls.styleSrc, ...urls.frameSrc, ...urls.imgSrc];
}

/**
 * Resolve UI config file path from workflow file path
 * @param {string} workflowPath - Path to the workflow JSON file
 * @returns {string|null} Path to UI config file or null if not found
 */
function resolveUIConfigPath(workflowPath) {
  try {
    // Extract workflow ID from the file name (without .json extension)
    const workflowFileName = path.basename(workflowPath, '.json');
    // For workflows in test-workflows subdirectory, keep the path as is
    // Example: /workflows/appIds/55a3a6/test-workflows/global_user_onboarding.json
    // Should map to: /text_ui_configs/appIds/55a3a6/test-workflows/global_user_onboarding_ui_config.json
    
    let uiConfigPath;
    
    // Map workflow path to UI config path
    uiConfigPath = workflowPath
      .replace('/workflows/', '/text_ui_configs/')
      .replace(`/${workflowFileName}.json`, `/${workflowFileName}_ui_config.json`);
    

    
    // Check if the UI config file exists
    if (fs.existsSync(uiConfigPath)) {
      return uiConfigPath;
    }
    
    return null;
  } catch (error) {
    console.warn(`Error resolving UI config path: ${error.message}`);
    return null;
  }
}

/**
 * Extract domains from UI config animation object
 * @param {string} uiConfigPath - Path to the UI config JSON file
 * @returns {Array} Array of unique domains from animation URLs
 */
function extractUIConfigDomains(uiConfigPath) {
  const animationDomains = new Set();
  const imageDomains = new Set();
  
  try {
    if (!fs.existsSync(uiConfigPath)) {
      return { animationDomains: [], imageDomains: [] };
    }
    
    const data = fs.readFileSync(uiConfigPath, 'utf-8');
    const uiConfig = JSON.parse(data);
    
    
    // Extract domains from animation object ONLY for connect-src
    if (uiConfig.animation && typeof uiConfig.animation === 'object') {
      Object.values(uiConfig.animation).forEach(animationUrl => {
        if (typeof animationUrl === 'string' && animationUrl.startsWith('http')) {
          const domain = extractDomain(animationUrl);
          if (domain) {
            animationDomains.add(domain);
          }
        }
      });
    }

    // Extract image domains from logos (strings or objects with url)
    if (uiConfig.logos && typeof uiConfig.logos === 'object') {
      Object.values(uiConfig.logos).forEach(value => {
        const url = typeof value === 'string' ? value : (value && typeof value === 'object' ? value.url : '');
        if (typeof url === 'string' && url.startsWith('http')) {
          const domain = extractDomain(url);
          if (domain) {
            imageDomains.add(domain);
          }
        }
      });
    }

    // Extract image domains from icons (values may be objects with url)
    if (uiConfig.icons && typeof uiConfig.icons === 'object') {
      Object.values(uiConfig.icons).forEach(value => {
        const url = typeof value === 'string' ? value : (value && typeof value === 'object' ? value.url : '');
        if (typeof url === 'string' && url.startsWith('http')) {
          const domain = extractDomain(url);
          if (domain) {
            imageDomains.add(domain);
          }
        }
      });
    }
    
  } catch (error) {
    console.warn(`Error parsing UI config file ${uiConfigPath}: ${error.message}`);
  }
  
  return { animationDomains: Array.from(animationDomains), imageDomains: Array.from(imageDomains) };
}

/**
 * Extract unique domains from workflow modules for CSP (backward compatibility)
 * @param {Object} workflow - The workflow object
 * @returns {Array} Array of unique domains
 */
function extractApiDomains(workflow) {
  const endpoints = extractApiEndpoints(workflow);
  const domains = new Set();
  
  endpoints.forEach(endpoint => {
    const domain = extractDomain(endpoint);
    if (domain) {
      domains.add(domain);
    }
  });
  
  return Array.from(domains);
}

/**
 * Parse existing CSP policy into structured format
 * @param {string} cspPolicy - The existing CSP policy string
 * @returns {Object} Parsed CSP policy with directive arrays
 */
function parseExistingCSP(cspPolicy) {
  const directives = {};
  
  // Split by semicolon to get individual directives
  const directiveParts = cspPolicy.split(';').map(part => part.trim()).filter(Boolean);
  
  directiveParts.forEach(directive => {
    const [directiveName, ...values] = directive.split(/\s+/);
    if (directiveName && values.length > 0) {
      directives[directiveName] = values;
    }
  });
  
  return directives;
}

/**
 * Merge workflow domains with existing CSP policy
 * @param {Object} workflowUrls - URLs categorized by CSP directive type
 * @param {Object} existingCSP - Parsed existing CSP policy
 * @param {Object} workflow - The workflow object to check for serverSideResume.enable
 * @returns {Object} Updated CSP policy with new domains added
 */
function mergeCSPPolicies(workflowUrls, existingCSP, workflow) {
  const updated = { ...existingCSP };
  
  // Helper function to check if domain already exists in CSP directive
  const isDomainInDirective = (domain, directive) => {
    return directive.some(existing => {
      const cleanExisting = existing.replace(/^https?:\/\//, '');
      return cleanExisting === domain || existing === domain || existing === `https://${domain}`;
    });
  };
  
  // Check if serverSideResume.enable is true and add ind-state.idv.hyperverge.co to connect-src
  if (workflow && workflow.properties && workflow.properties.serverSideResume && workflow.properties.serverSideResume?.enable === true) {
    const indStateUrl = 'https://ind-state.idv.hyperverge.co';
    if (!isDomainInDirective('ind-state.idv.hyperverge.co', updated['connect-src'])) {
      updated['connect-src'].push(indStateUrl);
    }
  }
  
  // Merge connect-src
  if (!updated['connect-src']) updated['connect-src'] = [];
  const newConnectSrc = workflowUrls.connectSrc.filter(domain => 
    !isDomainInDirective(domain, updated['connect-src'])
  );
  updated['connect-src'].push(...newConnectSrc.map(domain => `https://${domain}`));
  
  // Merge script-src
  if (!updated['script-src']) updated['script-src'] = [];
  const newScriptSrc = workflowUrls.scriptSrc.filter(domain => 
    !isDomainInDirective(domain, updated['script-src'])
  );
  updated['script-src'].push(...newScriptSrc.map(domain => `https://${domain}`));
  
  // Merge style-src
  if (!updated['style-src']) updated['style-src'] = [];
  const newStyleSrc = workflowUrls.styleSrc.filter(domain => 
    !isDomainInDirective(domain, updated['style-src'])
  );
  updated['style-src'].push(...newStyleSrc.map(domain => `https://${domain}`));
  
  // Merge frame-src
  if (!updated['frame-src']) updated['frame-src'] = [];
  const newFrameSrc = workflowUrls.frameSrc.filter(domain => 
    !isDomainInDirective(domain, updated['frame-src'])
  );
  updated['frame-src'].push(...newFrameSrc.map(domain => `https://${domain}`));
  
  // Merge img-src
  if (!updated['img-src']) updated['img-src'] = [];
  const newImgSrc = workflowUrls.imgSrc.filter(domain => 
    !isDomainInDirective(domain, updated['img-src'])
  );
  updated['img-src'].push(...newImgSrc.map(domain => `https://${domain}`));
  
  // Ensure media-src directive for workflows using videoStatementV2
  const hasVideoStatementV2 = Array.isArray(workflow?.modules) && workflow.modules.some(m => m && m.type === 'videoStatementV2');
  if (hasVideoStatementV2) {
    if (!updated['media-src']) updated['media-src'] = [];
    const ensureMediaValue = (val) => {
      if (!updated['media-src'].includes(val)) updated['media-src'].push(val);
    };
    ensureMediaValue("'self'");
    ensureMediaValue('data:');
    ensureMediaValue('blob:');
  }
  
  return {
    updated,
    newDomains: {
      connectSrc: newConnectSrc,
      scriptSrc: newScriptSrc,
      styleSrc: newStyleSrc,
      frameSrc: newFrameSrc,
      imgSrc: newImgSrc
    }
  };
}

/**
 * Generate updated CSP policy string
 * @param {Object} cspDirectives - CSP directives object
 * @returns {string} Complete CSP policy string
 */
function generateCSPPolicy(cspDirectives) {
  const directiveOrder = ['script-src', 'connect-src', 'img-src', 'media-src', 'style-src', 'frame-src', 'worker-src'];
  const policyParts = [];
  
  directiveOrder.forEach(directive => {
    if (cspDirectives[directive] && cspDirectives[directive].length > 0) {
      policyParts.push(`${directive} ${cspDirectives[directive].join(' ')}`);
    }
  });
  
  return policyParts.join('; ') + ';';
}

/**
 * Generate complete CSP policy with workflow domains
 * @param {Object} workflow - The workflow object
 * @param {string} workflowPath - Path to the workflow file (optional, for UI config detection)
 * @param {Array} modules - Array of module objects from apiData.json (optional, for endpoint-based CSP)
 * @returns {Object} Object with updated CSP policy and analysis
 */
function generateUpdatedCSP(workflow, workflowPath = null, modules = null) {
  const workflowUrls = extractWorkflowUrls(workflow, workflowPath);
  
  // If modules are provided, extract additional CSP URLs based on endpoints
  if (modules && Array.isArray(modules)) {
    const endpointBasedCspUrls = extractCspUrlsByEndpoint(modules);
    // Add endpoint-based CSP URLs to connect-src
    endpointBasedCspUrls.forEach(url => {
      const domain = extractDomain(`https://${url}`);
      if (domain) {
        workflowUrls.connectSrc.push(domain);
      }
    });
    // Remove duplicates
    workflowUrls.connectSrc = [...new Set(workflowUrls.connectSrc)];
  }
  
  const existingCSP = parseExistingCSP(EXISTING_CSP_POLICY);
  const { updated, newDomains } = mergeCSPPolicies(workflowUrls, existingCSP, workflow);

  // Shared helper to check if a domain already exists in a directive
  const domainExistsInDirective = (domain, directiveValues) => {
    if (!Array.isArray(directiveValues)) return false;
    return directiveValues.some(existing => {
      const cleanExisting = typeof existing === 'string' ? existing.replace(/^https?:\/\//, '') : '';
      return cleanExisting === domain || existing === domain || existing === `https://${domain}`;
    });
  };

  // Merge UI config domains into final CSP: animations -> connect-src, logos/icons -> img-src (and connect-src)
  if (workflowPath) {
    const uiConfigPath = resolveUIConfigPath(workflowPath);
    if (uiConfigPath) {
      const { animationDomains, imageDomains } = extractUIConfigDomains(uiConfigPath);

      // Add animation domains to connect-src
      if (animationDomains.length > 0) {
        if (!updated['connect-src']) updated['connect-src'] = [];
        const toAdd = animationDomains.filter(d => !domainExistsInDirective(d, updated['connect-src']));
        updated['connect-src'].push(...toAdd.map(d => `https://${d}`));
        if (newDomains && Array.isArray(newDomains.connectSrc)) newDomains.connectSrc.push(...toAdd);
        if (debug) console.log(`Added ${toAdd.length} animation domain(s) to connect-src from UI config.`);
      }

      // Add image domains to img-src and connect-src
      if (imageDomains.length > 0) {
        if (!updated['img-src']) updated['img-src'] = [];
        const alreadyHasImg = (domain) => {
          return updated['img-src'].some(existing => {
            const cleanExisting = existing.replace(/^https?:\/\//, '');
            return cleanExisting === domain || existing === domain || existing === `https://${domain}`;
          });
        };
        const imgToAdd = imageDomains.filter(d => !alreadyHasImg(d));
        updated['img-src'].push(...imgToAdd.map(d => `https://${d}`));
        if (newDomains && Array.isArray(newDomains.imgSrc)) newDomains.imgSrc.push(...imgToAdd);
        if (debug) console.log(`Added ${imgToAdd.length} image domain(s) to img-src from UI config.`);

        // Also add image domains to connect-src
        if (!updated['connect-src']) updated['connect-src'] = [];
        const imgConnectToAdd = imageDomains.filter(d => !domainExistsInDirective(d, updated['connect-src']));
        updated['connect-src'].push(...imgConnectToAdd.map(d => `https://${d}`));
        if (newDomains && Array.isArray(newDomains.connectSrc)) newDomains.connectSrc.push(...imgConnectToAdd);
        if (debug) console.log(`Added ${imgConnectToAdd.length} image domain(s) to connect-src from UI config.`);
      }

    } else if (debug) {
      console.log('No UI config file found for this workflow');
    }
  }
  
  return {
    policy: generateCSPPolicy(updated),
    workflowUrls,
    newDomains,
    existingCSP,
    updatedCSP: updated
  };
}

/**
 * Parses a workflow JSON file and extracts API domains (backward compatibility)
 * @param {string} filePath - Path to the workflow JSON file
 * @returns {Array<string>} Array of unique domains found in the workflow
 */
function parseWorkflowFile(filePath) {
  try {
    // Reset countries modules for each file
    countriesModules.clear();
    
    const data = fs.readFileSync(filePath, 'utf-8');
    const workflow = JSON.parse(data);
    return extractApiDomains(workflow);
  } catch (error) {
    console.error(`Error parsing workflow file: ${error.message}`);
    return [];
  }
}

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.error('Usage: node cspParser.js <workflow-file-path> [--domains] [--csp] [--debug]');
    console.error('  --domains: Extract domains only (default behavior)');
    console.error('  --csp: Generate updated CSP policy');
    console.error('  --debug: Enable debug logging');
    process.exit(1);
  }
  
  // Parse arguments
  const workflowPath = args[0];
  const flags = args.slice(1);
  
  // Set debug flag
  debug = flags.includes('--debug');
  const extractDomains = flags.includes('--domains');
  const generateCSP = flags.includes('--csp');
  const defaultBehavior = !extractDomains && !generateCSP;
  
  console.log(`Parsing workflow file: ${workflowPath}\n`);
  
  try {
    countriesModules.clear();
    const data = fs.readFileSync(workflowPath, 'utf-8');
    const workflow = JSON.parse(data);
    
    if (generateCSP || defaultBehavior) {
      // Generate CSP policy
      const cspResult = generateUpdatedCSP(workflow, workflowPath);
      
      console.log('================================');
      console.log('CSP POLICY ANALYSIS');
      console.log('================================');
      
      // Show workflow URLs by category
      console.log('\nWorkflow URLs by CSP directive:');
      console.log('-------------------------------');
      
      if (cspResult.workflowUrls.connectSrc.length > 0) {
        console.log(`connect-src (${cspResult.workflowUrls.connectSrc.length} domains):`);
        cspResult.workflowUrls.connectSrc.forEach(domain => console.log(`  - ${domain}`));
      }
      
      if (cspResult.workflowUrls.scriptSrc.length > 0) {
        console.log(`script-src (${cspResult.workflowUrls.scriptSrc.length} domains):`);
        cspResult.workflowUrls.scriptSrc.forEach(domain => console.log(`  - ${domain}`));
      }
      
      if (cspResult.workflowUrls.styleSrc.length > 0) {
        console.log(`style-src (${cspResult.workflowUrls.styleSrc.length} domains):`);
        cspResult.workflowUrls.styleSrc.forEach(domain => console.log(`  - ${domain}`));
      }
      
      if (cspResult.workflowUrls.frameSrc.length > 0) {
        console.log(`frame-src (${cspResult.workflowUrls.frameSrc.length} domains):`);
        cspResult.workflowUrls.frameSrc.forEach(domain => console.log(`  - ${domain}`));
      }
      
      
      // Show updated CSP policy
      console.log('\n================================');
      console.log('COMPLETE CSP POLICY');
      console.log('================================');
      
      console.log(`${cspResult.policy}`);
      
      console.log('\n================================');
      
    } else if (extractDomains) {
      // Extract domains only (backward compatibility)
      const domains = extractApiDomains(workflow);
      
      console.log('Unique API domains found:');
      if (domains.length === 0) {
        console.log('  No API domains found');
      } else {
        domains.forEach((domain, index) => {
          console.log(`  ${index + 1}. ${domain}`);
        });
      }
      
      console.log(`\nTotal unique domains: ${domains.length}`);
      console.log('--------------------------------');
    }
    
  } catch (error) {
    console.error(`Error parsing workflow file: ${error.message}`);
    process.exit(1);
  }
}

// Export functions for use in other modules
module.exports = {
  extractApiEndpoints,
  extractApiDomains,
  extractWorkflowUrls,
  extractCspUrlsByEndpoint,
  generateUpdatedCSP,
  parseWorkflowFile,
  resolveTemplateUrl,
  extractDomain,
  parseExistingCSP,
  mergeCSPPolicies,
  generateCSPPolicy,
  resolveUIConfigPath,
  extractUIConfigDomains
};