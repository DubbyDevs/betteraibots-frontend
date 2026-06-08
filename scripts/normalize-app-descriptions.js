/**
 * Remove trailing periods from app card descriptions for consistent preview copy.
 */
const fs = require('fs');
const path = require('path');

const files = [
  path.join(__dirname, '..', 'src', 'data', 'appsData.js'),
  path.join(__dirname, '..', 'src', 'App.js'),
];

files.forEach((filePath) => {
  const content = fs.readFileSync(filePath, 'utf8');
  let count = 0;
  const updated = content.replace(/description: "([^"]+)\."/g, (_match, text) => {
    count += 1;
    return `description: "${text}"`;
  });
  fs.writeFileSync(filePath, updated);
  console.log(`${path.basename(filePath)}: normalized ${count} descriptions`);
});
