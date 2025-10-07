#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');

// Load current versions
let PLUGINS = {};
try {
  const versionsData = fs.readFileSync('versions.json', 'utf8');
  PLUGINS = JSON.parse(versionsData);
} catch (error) {
  console.error('❌ Failed to load versions.json:', error.message);
  process.exit(1);
}

function deleteTag(pluginName) {
  const plugin = PLUGINS[pluginName];
  if (!plugin) {
    console.error(`❌ Unknown plugin: ${pluginName}`);
    console.log('Available plugins:', Object.keys(PLUGINS).join(', '));
    process.exit(1);
  }

  const version = plugin.version;
  // Convert plugin name to tag format
  let tagName;
  if (pluginName === 'hddm_edit') {
    tagName = `hddm-edit-v${version}`;
  } else if (pluginName === 'cbs_intellisense') {
    tagName = `cbs-intellisense-v${version}`;
  } else if (pluginName === 'lightboard_nai_preset_manager') {
    tagName = `lightboard-nai-preset-v${version}`;
  } else if (pluginName === 'plugin_dnd') {
    tagName = `plugin-dnd-v${version}`;
  } else {
    tagName = `${pluginName}-v${version}`;
  }
  
  console.log(`🗑️  Deleting tag: ${tagName}`);

  try {
    // Delete local tag
    try {
      execSync(`git tag -d ${tagName}`, { stdio: 'inherit' });
      console.log(`✅ Local tag deleted: ${tagName}`);
    } catch (error) {
      console.log(`⚠️  Local tag ${tagName} doesn't exist`);
    }
    
    // Delete remote tag
    try {
      execSync(`git push origin :refs/tags/${tagName}`, { stdio: 'inherit' });
      console.log(`✅ Remote tag deleted: ${tagName}`);
    } catch (error) {
      console.log(`⚠️  Remote tag ${tagName} doesn't exist`);
    }
    
    console.log(`✅ Tag deletion completed: ${tagName}`);
  } catch (error) {
    console.error('❌ Failed to delete git tag:', error.message);
    process.exit(1);
  }
}

// Command line interface
const pluginName = process.argv[2];
if (!pluginName) {
  console.log('📦 RISU Plugins Tag Deletion Tool');
  console.log('');
  console.log('Usage: node scripts/delete-tag.js <plugin-name>');
  console.log('');
  console.log('Available plugins:');
  Object.entries(PLUGINS).forEach(([key, plugin]) => {
    console.log(`  ${key} - ${plugin.name} v${plugin.version}`);
  });
  process.exit(1);
}

deleteTag(pluginName);
