/**
 * One-time shuffle of trial apps after the pinned top 3.
 * Run manually when you want to re-randomize the list.
 */
const fs = require('fs');
const path = require('path');

const appsDataPath = path.join(__dirname, '..', 'src', 'data', 'appsData.js');
const content = fs.readFileSync(appsDataPath, 'utf8');
const startMarker = 'export const trialAppsData = [';
const startIdx = content.indexOf(startMarker);
const endIdx = content.indexOf('\n];', startIdx) + 3;
const before = content.slice(0, startIdx);
const after = content.slice(endIdx);
const arrayBody = content.slice(startIdx + startMarker.length, endIdx - 3);

const apps = [];
let depth = 0;
let current = '';
let inObject = false;

for (let i = 0; i < arrayBody.length; i++) {
  const ch = arrayBody[i];

  if (!inObject) {
    if (ch === '{') {
      inObject = true;
      depth = 1;
      current = '{';
    }
    continue;
  }

  current += ch;
  if (ch === '{') depth++;
  if (ch === '}') {
    depth--;
    if (depth === 0) {
      apps.push(current.trim());
      current = '';
      inObject = false;
    }
  }
}

const PINNED_COUNT = 3;
const pinned = apps.slice(0, PINNED_COUNT);
const rest = apps.slice(PINNED_COUNT);

let seed = 20260608;
function random() {
  seed = (seed * 1664525 + 1013904223) >>> 0;
  return seed / 4294967296;
}

for (let i = rest.length - 1; i > 0; i--) {
  const j = Math.floor(random() * (i + 1));
  [rest[i], rest[j]] = [rest[j], rest[i]];
}

const getName = (block) => block.match(/name: "([^"]+)"/)[1];
const shuffled = [...pinned, ...rest];
const newArray = `${startMarker}\n  ${shuffled.join(',\n  ')}\n];`;

fs.writeFileSync(appsDataPath, before + newArray + after);

console.log('Pinned:', pinned.map(getName).join(', '));
console.log('Next 5:', rest.slice(0, 5).map(getName).join(', '));
console.log('Total trial apps:', shuffled.length);
