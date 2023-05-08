let fs = require('fs');
const path = require('path');

let result = '';
const old = path.join(__dirname, 'assets');
const newOld = path.join(__dirname, 'project-dist','assets');
console.log(newOld)

async function getInfo() {
    let stylesFile = path.join(__dirname, 'styles');
    const data = await fs.promises.readdir(stylesFile, {withFileTypes: true});
    for (let item of data) {
      const pathFile = path.join(__dirname, 'styles', item.name);
      if(item.isFile() && (path.extname(pathFile) === '.css')) {
        const contents = await fs.promises.readFile(pathFile, { encoding: 'utf8' });
        result += contents;
        result += '\n';
      }
    }

    createFolder();
    readTemplate() ;
    collectStyles();
    createFolderAssets();
    myCopy(old, newOld);
  }
  
  async function createFolder() {
    let projectFile = path.join(__dirname, 'project-dist');
    const promise = fs.promises.mkdir(projectFile,(err)=>{
        if (err) {
            throw err;
          }
          console.log('Folder exist')
    })
    await promise;
  }
  async function createFolderAssets() {
    let projectFile = path.join(__dirname, 'project-dist', 'assets');
    const promise = fs.promises.mkdir(projectFile,(err)=>{
        if (err) {
            throw err;
          }
        console.log('Folder exist')
    })
    await promise;
  }
  async function collectStyles() {
    let bundleFile = path.join(__dirname, 'project-dist', 'style.css');
    const promise = fs.promises.writeFile(bundleFile, result,(err)=>{
        if (err) {
            throw err;
          }
          console.log('File exist with styles')
    })
    await promise;
  }
  
 
  

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
  async function readTemplate() {
    const pathTmp = path.join(__dirname, 'template.html');
    const contents = await fs.promises.readFile(pathTmp, { encoding: 'utf8' });
    changeData(contents);
  }
  
  async function foo(path) {
    const data = await fs.promises.readFile(path, { encoding: 'utf8' });
    return data;
  }
  
  async function changeData(data) {
    const arrHTMLfiles = [];
    const pathComponents = path.join(__dirname, 'components');
    const arrDirent = await fs.promises.readdir(pathComponents, {withFileTypes: true});
    for(let item of arrDirent) {
      let pathFile = path.join(pathComponents, item.name);
      const data = await foo(pathFile);
      arrHTMLfiles.push({
        name: item.name = path.basename(pathFile, path.extname(pathFile)),
        path: pathFile,
        content: data,
      });
    }
    arrHTMLfiles.forEach(obj => {
      data = data.replace(`{{${obj.name}}}`, obj.content);
    });
    writeHTML(data);
}
  
async function writeHTML(data) {
    let pathHTML = path.join(__dirname, 'project-dist', 'index.html');
    const promise = fs.promises.writeFile(pathHTML, data);
    await promise;
  }

  getInfo();