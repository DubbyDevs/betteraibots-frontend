const fs = require('fs');
const path = require('path');

// Simple script to update service worker version if needed
// This is a placeholder - update as needed for your service worker
try {
  const swPath = path.join(__dirname, '..', 'public', 'sw.js');
  
  if (fs.existsSync(swPath)) {
    // Service worker exists, build can proceed
    console.log('✅ Service worker file found');
  } else {
    console.log('⚠️  Service worker file not found, but continuing build');
  }
} catch (error) {
  console.error('Error checking service worker:', error);
  // Don't fail the build
}
process.exit(0);

