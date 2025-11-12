// Preload script for Electron
// This file runs in a sandboxed renderer process before web content loads
// Use it to safely expose Node.js functionality to the web page

const { contextBridge } = require('electron');

// Expose protected methods that allow the renderer process to use
// specific Node.js features without exposing the entire Node.js API
contextBridge.exposeInMainWorld('electron', {
  // Add any APIs you want to expose to the renderer here
  versions: {
    node: process.versions.node,
    chrome: process.versions.chrome,
    electron: process.versions.electron
  }
});

console.log('Preload script loaded successfully');
