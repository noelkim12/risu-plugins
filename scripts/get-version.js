#!/usr/bin/env node

const fs = require('fs');

// Load current versions
let PLUGINS = {};
try {
  const versionsData = fs.readFileSync('versions.json', 'utf8');
  PLUGINS = JSON.parse(versionsData);
} catch (error) {
  console.error('❌ Failed to load versions.json:', error.message);
  process.exit(1);
}

function getVersion(pluginName) {
  if (!PLUGINS[pluginName]) {
    console.error(`❌ Unknown plugin: ${pluginName}`);
    process.exit(1);
  }
  
  console.log(PLUGINS[pluginName].version);
}

// Command line interface
const pluginName = process.argv[2];
if (!pluginName) {
  console.error('❌ Plugin name required');
  console.log('Usage: node scripts/get-version.js <plugin-name>');
  process.exit(1);
}

getVersion(pluginName);
