import fs from 'fs';
import path from 'path';
import glob from 'glob';

const societyDir = `${process.cwd()}/society`;

glob('*/*/*/package.json', { cwd: societyDir }, (err, files) => {
  files.forEach(file => {
    const [ groupType, region, groupName ] = file.split('/');

    const pkg = JSON.parse(fs.readFileSync(path.resolve(societyDir, file)));

    console.log(pkg);
  });
});
