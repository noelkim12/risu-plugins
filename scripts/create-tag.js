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

function createTag(pluginName) {
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
    tagName = `lightboard-v${version}`;
  } else {
    tagName = `${pluginName}-v${version}`;
  }
  
  console.log(`🏷️  Creating tag: ${tagName}`);

  try {
    // Check if tag already exists
    try {
      const result = execSync(`git tag -l "${tagName}"`, { stdio: 'pipe', encoding: 'utf8' });
      if (result.trim() === tagName) {
        console.log(`⚠️  Tag ${tagName} already exists.`);
        console.log(`📋 Options:`);
        console.log(`   1. Delete existing tag: npm run delete-tag:hddm`);
        console.log(`   2. Update version in versions.json and try again`);
        console.log(`   3. Use different version number`);
        process.exit(1);
      }
    } catch (error) {
      // Tag doesn't exist, continue
    }

    // Create git tag
    execSync(`git tag ${tagName}`, { stdio: 'inherit' });
    console.log(`✅ Git tag created: ${tagName}`);
    
    // Push tag to origin
    execSync(`git push origin ${tagName}`, { stdio: 'inherit' });
    console.log(`✅ Git tag pushed: ${tagName}`);
    
    console.log(`🚀 GitHub Actions will now create the release automatically!`);
  } catch (error) {
    console.error('❌ Failed to create or push git tag:', error.message);
    process.exit(1);
  }
}

// Command line interface
const pluginName = process.argv[2];
if (!pluginName) {
  console.log('📦 RISU Plugins Tag Creation Tool');
  console.log('');
  console.log('Usage: node scripts/create-tag.js <plugin-name>');
  console.log('');
  console.log('Available plugins:');
  Object.entries(PLUGINS).forEach(([key, plugin]) => {
    console.log(`  ${key} - ${plugin.name} v${plugin.version}`);
  });
  process.exit(1);
}

createTag(pluginName);