#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Load plugin configurations from versions.json
let PLUGINS = {};
try {
  const versionsData = fs.readFileSync('versions.json', 'utf8');
  PLUGINS = JSON.parse(versionsData);
} catch (error) {
  console.error('❌ Failed to load versions.json:', error.message);
  process.exit(1);
}

function createRelease(pluginName) {
  const plugin = PLUGINS[pluginName];
  if (!plugin) {
    console.error(`❌ Unknown plugin: ${pluginName}`);
    console.log('Available plugins:', Object.keys(PLUGINS).join(', '));
    process.exit(1);
  }

  console.log(`🚀 Creating release for ${plugin.name} v${plugin.version}`);

  // Create release directory
  const releaseDir = `releases/${pluginName}-v${plugin.version}`;
  if (fs.existsSync(releaseDir)) {
    fs.rmSync(releaseDir, { recursive: true });
  }
  fs.mkdirSync(releaseDir, { recursive: true });

  // Copy files
  plugin.files.forEach(file => {
    const srcPath = path.join(pluginName, file);
    const destPath = path.join(releaseDir, path.basename(file));
    
    if (fs.existsSync(srcPath)) {
      if (fs.statSync(srcPath).isDirectory()) {
        fs.cpSync(srcPath, destPath, { recursive: true });
        console.log(`📁 Copied directory: ${file}`);
      } else {
        fs.copyFileSync(srcPath, destPath);
        console.log(`📄 Copied file: ${file}`);
      }
    } else {
      console.warn(`⚠️  File not found: ${srcPath}`);
    }
  });

  // Create zip file
  const zipName = `${pluginName}-v${plugin.version}.zip`;
  try {
    execSync(`cd releases && zip -r ${zipName} ${pluginName}-v${plugin.version}/`);
    console.log(`📦 Created zip: releases/${zipName}`);
  } catch (error) {
    console.error('❌ Failed to create zip file:', error.message);
  }

  console.log(`✅ Release package created: releases/${zipName}`);
  console.log(`📋 Next steps:`);
  console.log(`   1. Test the release package`);
  console.log(`   2. Create git tag: git tag ${pluginName}-v${plugin.version}`);
  console.log(`   3. Push tag: git push origin ${pluginName}-v${plugin.version}`);
}

// Command line interface
const pluginName = process.argv[2];
if (!pluginName) {
  console.log('📦 RISU Plugins Release Tool');
  console.log('');
  console.log('Usage: node scripts/release.js <plugin-name>');
  console.log('');
  console.log('Available plugins:');
  Object.entries(PLUGINS).forEach(([key, plugin]) => {
    console.log(`  ${key} - ${plugin.name} v${plugin.version}`);
  });
  process.exit(1);
}

createRelease(pluginName);