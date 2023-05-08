let fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname,'secret-folder'), (err, files) => {
   if(err) throw err; // не прочитать содержимое папки
//    console.log('В папке находятся файлы:' + files);

files.forEach(file => {
    const filePath = path.join((__dirname,'03-files-in-folder/secret-folder'), file);
    fs.stat(filePath, (err, stats) => {
      if (err) {
        console.error(`Error getting file stats for ${file}: ${err}`);
        return;
      }

      if (stats.isFile()) {
        console.log(`${file} - ${path.extname(file).substring(1)} - ${stats.size}`);
      }
    });
  });

});

// fs.readdir(folderPath, (err, files) => {
//     if (err) {
//       console.error(`Error reading folder: ${err}`);
//       return;
//     }




