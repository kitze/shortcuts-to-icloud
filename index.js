const fs = require('fs');
const path = require('path');
const homedir = require('os').homedir();

let shortcutsPath = path.join(__dirname, 'shortcuts');

fs.readdirSync(shortcutsPath).forEach(shortcutPath => {
  const { name, shortcut } = require(path.join(__dirname, 'shortcuts', shortcutPath));

  let iCloudPath = path.join(homedir, 'Library', 'Mobile Documents', 'com~apple~CloudDocs', 'Shortcuts');

  try {
    fs.readdirSync(iCloudPath);
  } catch {
    fs.mkdirSync(iCloudPath);
  }

  fs.writeFile(path.join(iCloudPath, `${name}.shortcut`), shortcut, err => {
    if (err) {
      console.error('Something went wrong :(', err);
      return;
    }
    console.log(`Shortcut ${name}.shortcut created!`);
  });
});
