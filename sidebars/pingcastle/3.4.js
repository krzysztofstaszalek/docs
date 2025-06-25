// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
// ./sidebars/yourproduct/3.5.js
module.exports = {
  docs: [
    'index',
    {
      type: 'category',
      label: 'Configuration',
      items: [
        {
          type: 'category',
          label: 'Getting Started',
          items: [
            'configuration', // This links to your new configuration.mdx file
          ],
        },
      ],
    },
  ],
};
