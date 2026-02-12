const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.watcher = {
  watchman: {
    defer: false,
  },
  additionalExts: [],
};

// Use polling-based file watching to avoid ENOENT errors
// in sandboxed/containerized environments
config.watchFolders = [__dirname];

module.exports = config;
