#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Parse command line arguments
const args = process.argv.slice(2);

// If no arguments provided, run the full start command
if (args.length === 0) {
  console.log('Starting full documentation site...');
  try {
    execSync('npx docusaurus start', { stdio: 'inherit' });
  } catch (error) {
    console.error('Failed to start:', error.message);
    process.exit(1);
  }
  return;
}

// Single product development mode
const input = args[0];
const [productName, version] = input.includes('/') ? input.split('/') : [input, null];

// Products that don't have versions (use product name directly)
const versionlessProducts = [
  '1secure',
  'endpointpolicymanager',
  'platgovnetsuite',
  'platgovsalesforce',
  'platgovnetsuiteflashlight',
  'platgovsalesforceflashlight',
];

// Special case for identitymanager/saas
const specialCases = {
  'identitymanager/saas': 'identitymanager_saas',
};

// Function to get plugin ID based on product and version
function getPluginId(product, version) {
  // Handle special cases first
  const specialKey = version ? `${product}/${version}` : product;
  if (specialCases[specialKey]) {
    return specialCases[specialKey];
  }

  // Handle versionless products
  if (versionlessProducts.includes(product) && !version) {
    return product;
  }

  // Handle versioned products
  if (version) {
    // Convert version dots to underscores (e.g., "12.0" -> "12_0")
    const versionFormatted = version.replace(/\./g, '_');
    return `${product}${versionFormatted}`;
  }

  // If no version provided for a versioned product, error
  console.error(`Product "${product}" requires a version number.`);
  console.error('Available versions can be found in the docs directory structure.');
  process.exit(1);
}

// Function to check if plugin exists in docusaurus config
function validatePlugin(pluginId, product, version) {
  const configPath = path.join(__dirname, '..', 'docusaurus.config.js');
  const configContent = fs.readFileSync(configPath, 'utf8');

  // Check if plugin ID exists in config
  if (!configContent.includes(`id: '${pluginId}'`)) {
    console.error(`Plugin "${pluginId}" not found in docusaurus.config.js`);
    if (version) {
      console.error(`Product "${product}" version "${version}" is not configured.`);
    } else {
      console.error(`Product "${product}" is not configured.`);
    }
    process.exit(1);
  }
}

// Create temporary config file for single product development
function createTempConfig(pluginId, product, version) {
  const tempConfigPath = path.join(__dirname, '..', 'docusaurus.dev.config.js');

  // Get the path and sidebar for this specific product
  let docPath, routeBasePath, sidebarPath;

  if (version) {
    docPath = `docs/${product}/${version}`;
    routeBasePath = '/'; // Serve at root for single product builds
  } else {
    // Handle special cases
    if (pluginId === 'identitymanager_saas') {
      docPath = 'docs/identitymanager/saas';
      routeBasePath = '/'; // Serve at root for single product builds
    } else {
      docPath = `docs/${product}`;
      routeBasePath = '/'; // Serve at root for single product builds
    }
  }

  // Determine sidebar path based on product/version
  // Check for product-specific sidebar first
  const sidebarDir = path.join(__dirname, '..', 'sidebars');

  // For versioned products
  if (version) {
    // Special case for threatprevention
    if (product === 'threatprevention') {
      sidebarPath = `./sidebars/threatprevention-${version}-sidebar.js`;
    } else {
      // Check if product/version specific sidebar exists
      const versionSidebarPath = path.join(sidebarDir, product, `${version}.js`);
      if (fs.existsSync(versionSidebarPath)) {
        sidebarPath = `./sidebars/${product}/${version}.js`;
      } else {
        // Fallback to generic sidebar
        sidebarPath = './sidebars/sidebar.js';
      }
    }
  } else {
    // For non-versioned products
    // Check if product-specific sidebar exists
    const productSidebarPath = path.join(sidebarDir, `${product}.js`);
    if (fs.existsSync(productSidebarPath)) {
      sidebarPath = `./sidebars/${product}.js`;
    } else {
      // Fallback to generic sidebar
      sidebarPath = './sidebars/sidebar.js';
    }
  }

  // Create minimal config with just the single plugin
  const configContent = `// @ts-check
import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Netwrix Product Documentation',
  tagline: 'Documentation for Netwrix Products',
  favicon: 'img/branding/favicon.ico',
  url: process.env.RENDER_EXTERNAL_URL || 'http://localhost:3000',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  onBrokenAnchors: 'warn',
  
  future: {
    experimental_faster: {
      swcJsLoader: true,
      swcJsMinimizer: true,
      swcHtmlMinimizer: true,
      lightningCssMinimizer: true,
      rspackBundler: true,
      rspackPersistentCache: true,
      mdxCrossCompilerCache: true,
      ssgWorkerThreads: true,
    },
    v4: {
      removeLegacyPostBuildHeadAttribute: true,
    },
  },
  
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: false,
        pages: false, // Disable pages (including homepage)
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: '${pluginId}',
        path: '${docPath}',
        routeBasePath: '${routeBasePath}',
        sidebarPath: require.resolve('${sidebarPath}'),
        editUrl: 'https://github.com/netwrix/docs/tree/main/',
        exclude: ['**/CLAUDE.md'],
        versions: {
          current: {
            label: '${version || 'Current'}',
          },
        },
      },
    ],

  ],



  themeConfig: {
    image: 'img/Logo_RGB.svg',
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: false,
      },
    },
    navbar: {
      logo: {
        alt: 'Netwrix Logo',
        src: 'img/branding/logo-red.svg',
        srcDark: 'img/branding/logo-white.svg',
        href: '/',
      },
      items: [
        {
          href: 'https://community.netwrix.com',
          label: 'Community',
          position: 'right',
        },
        {
          href: 'https://www.netwrix.com/support.html',
          label: 'Support',
          position: 'right',
        },
        {
          href: 'http://github.com/netwrix',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },
  stylesheets: [
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap',
  ],
};

export default config;`;

  fs.writeFileSync(tempConfigPath, configContent);
  return tempConfigPath;
}

// Clean up temporary files
function cleanup() {
  const tempConfigPath = path.join(__dirname, '..', 'docusaurus.dev.config.js');
  if (fs.existsSync(tempConfigPath)) {
    fs.unlinkSync(tempConfigPath);
  }
}

// Handle cleanup on exit
process.on('SIGINT', () => {
  console.log('\nCleaning up...');
  cleanup();
  process.exit(0);
});

process.on('SIGTERM', () => {
  cleanup();
  process.exit(0);
});

// Main execution
console.log(`Starting development server for: ${productName}${version ? `/${version}` : ''}`);

const pluginId = getPluginId(productName, version);
console.log(`Using plugin ID: ${pluginId}`);

validatePlugin(pluginId, productName, version);

const tempConfigPath = createTempConfig(pluginId, productName, version);

try {
  // Run docusaurus start with the temporary config
  console.log('Starting development server...');
  execSync(`npx docusaurus start --config ${path.basename(tempConfigPath)}`, {
    stdio: 'inherit',
    cwd: path.dirname(tempConfigPath),
  });
} catch (error) {
  console.error('Development server failed:', error.message);
  process.exit(1);
} finally {
  cleanup();
}
