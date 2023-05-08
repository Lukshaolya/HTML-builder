let fs = require('fs');
const path = require('path');
const { COPYFILE_EXCL } = fs.constants;

const old = path.join(__dirname, 'files');
const newOld = path.join(__dirname, 'files-copy');

// if (fs.existsSync(path.join(__dirname, 'files-copy'))) {
//     console.log('Папка существует');
//   } else {
//     fs.mkdir(path.join(__dirname, 'files-copy'), (err) => {
//         if (err) throw err;
//         console.log('Папка была создана');
//     })
//   }

  myCopy(old, newOld);

async function clearDir(newOld) {
  const arrOfobj = await fs.promises.readdir(newOld, {withFileTypes: true});
  for (let obj of arrOfobj) {
    if (obj.isFile()) {
      await fs.promises.rm(path.join(newOld, obj.name));
    }
  }
}

async function myCopy(old, newOld) {
  const copyDir = await fs.promises.mkdir(newOld, { recursive: true });
  await clearDir(newOld);
  const arrOfobj = await fs.promises.readdir(old, { withFileTypes: true });
  for (let obj of arrOfobj) {
    if (obj.isFile()) {
      const pathOrgFile = path.join(old, obj.name);
      const pathCopyFile = path.join(newOld, obj.name);
      await fs.promises.copyFile(pathOrgFile, pathCopyFile);
    }
    else if(obj.isDirectory()) {
      myCopy(path.join(old, obj.name), path.join(newOld, obj.name));
    }
  }
}


