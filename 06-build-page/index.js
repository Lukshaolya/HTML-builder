let fs = require('fs');
const path = require('path');

let result = '';

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
    collectStyles();
    createFolder()
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
  
  getInfo();