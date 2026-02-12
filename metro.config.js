const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Block temp directories inside node_modules that cause ENOENT watcher crashes
config.resolver.blockList = [
  /node_modules\/.*_tmp_\d+\/.*/,
];

// Disable Watchman (not available in this environment) and configure
// the fallback watcher to only watch the project root
config.watcher = {
  ...config.watcher,
  watchman: { enabled: false },
  additionalExts: config.watcher?.additionalExts || [],
};

// Restrict watch folders to only the project directory
config.watchFolders = [path.resolve(__dirname)];

module.exports = config;
