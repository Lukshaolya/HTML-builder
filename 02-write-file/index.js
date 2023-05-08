const fs = require('fs');
const path = require('path');
const readline = require('readline');
// const { stdin, stdout } = process;


fs.writeFile(
    path.join(__dirname, 'message.txt'), 
    '',
    (err) => {
    if (err) throw err;
    
})



const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout

});

console.log('Привет! Напиши что-нибудь:');
rl.on('line', function(line) {
    // Если введено "exit", завершаем работу
    if (line === 'exit') {
      console.log('До свидания!');
      rl.close();
      process.exit(0);
    }
 fs.appendFile(path.join(__dirname,'message.txt'), line + '\n', function(err) {
        if (err) {
          console.error(err);
          return;
        }
        // console.log(`Текст "${line}" успешно записан в файл.`);
      });   
    });


    rl.on('SIGINT', function() {
        console.log('Вы сами решили выйти.');
        rl.close();
        process.exit(0);
      });

