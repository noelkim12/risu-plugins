#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Load current versions
let PLUGINS = {};
try {
  const versionsData = fs.readFileSync('versions.json', 'utf8');
  PLUGINS = JSON.parse(versionsData);
} catch (error) {
  console.error('❌ Failed to load versions.json:', error.message);
  process.exit(1);
}

function updateVersion(pluginName, newVersion) {
  if (!PLUGINS[pluginName]) {
    console.error(`❌ Unknown plugin: ${pluginName}`);
    console.log('Available plugins:', Object.keys(PLUGINS).join(', '));
    process.exit(1);
  }

  const oldVersion = PLUGINS[pluginName].version;
  PLUGINS[pluginName].version = newVersion;

  // Save updated versions
  try {
    fs.writeFileSync('versions.json', JSON.stringify(PLUGINS, null, 2));
    console.log(`✅ Updated ${pluginName} version: ${oldVersion} → ${newVersion}`);
  } catch (error) {
    console.error('❌ Failed to update versions.json:', error.message);
    process.exit(1);
  }
}

// Command line interface
const pluginName = process.argv[2];
const newVersion = process.argv[3];

if (!pluginName || !newVersion) {
  console.log('📦 RISU Plugins Version Update Tool');
  console.log('');
  console.log('Usage: node scripts/update-version.js <plugin-name> <new-version>');
  console.log('');
  console.log('Available plugins:');
  Object.entries(PLUGINS).forEach(([key, plugin]) => {
    console.log(`  ${key} - ${plugin.name} v${plugin.version}`);
  });
  console.log('');
  console.log('Examples:');
  console.log('  node scripts/update-version.js hddm_edit 0.5');
  console.log('  node scripts/update-version.js cbs_intellisense 0.2');
  process.exit(1);
}

updateVersion(pluginName, newVersion);
