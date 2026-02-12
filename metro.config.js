const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

const projectRoot = __dirname;

// Force Metro to treat this directory as both the project root and workspace root
// This prevents Metro from scanning parent directories (v0-next-shadcn) for node_modules
config.projectRoot = projectRoot;

// Restrict watch folders to ONLY the project directory
config.watchFolders = [projectRoot];

// Block temp directories inside node_modules that cause ENOENT watcher crashes
config.resolver.blockList = [
  /.*_tmp_\d+.*/,
  /.*\.pnpm.*/,
];

// Point node_modules resolution only to our project's own node_modules
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
];

// Disable Watchman (not available in this sandbox environment)
config.watcher = {
  ...config.watcher,
  watchman: { enabled: false },
};

module.exports = config;
