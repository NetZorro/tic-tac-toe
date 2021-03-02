/* eslint-disable no-underscore-dangle */
const path = require('path');
const fs = require('fs');

const _root = path.resolve(__dirname, '..');

function root(...args) {
  return path.join(...[_root].concat(args));
}

function settings() {
  console.log('\nReading settings json.');

  const settingsFilePath = path.join(
    path.dirname(__dirname),
    '/userSettings.json'
  );
  if (!fs.existsSync(settingsFilePath)) {
    console.log('\nSettings json was not found.');
    console.log(settingsFilePath);
    return null;
  }
  const contents = fs.readFileSync(settingsFilePath);

  return JSON.parse(contents);
}

exports.root = root;
exports.settings = settings;
