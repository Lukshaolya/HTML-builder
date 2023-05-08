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
  }
  
  async function collectStyles() {
    let bundleFile = path.join(__dirname, 'project-dist', 'bundle.css');
    const promise = fs.promises.writeFile(bundleFile, result,(err)=>{
        if (err) {
            throw err;
          }
          console.log('File exist')
    })
    await promise;
  }
  
  getInfo();