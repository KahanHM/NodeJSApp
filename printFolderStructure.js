const fs = require('fs');
const path = require('path');

function printFolderStructure(dir, level = 0) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    const indent = ' '.repeat(level * 2);

    console.log(`${indent}${file}`);

    if (stats.isDirectory()) {
      printFolderStructure(filePath, level + 1);
    }
  });
}

const startDir = __dirname; // You can change this to any directory you want to start from
printFolderStructure(startDir);
