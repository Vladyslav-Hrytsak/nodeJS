// console.log('Happy developing ✨')
//
//
// // console.log(__dirname)
// // console.log(__filename)
// // console.log(process.cwd())
//
// require('./services/test')
// const {a} = require("./services/test");
//
// console.log(a)

/////////////////////  HTTP   //////////////////////////

// require('node:http')
//
// const http = require('node:http');
//
// const server = http.createServer((req, res) => {
//     res.writeHead(200, {'Content-Type': 'application/json'})
//
//     if(req.url === '/cars'){
//         switch (req.method){
//             case 'GET':
//                 return res.end(JSON.stringify({
//                     data: 'cars'
//                 }))
//             case 'POST':
//                 return res.end(JSON.stringify({
//                     data: 'Create car'
//                 }))
//         }
//     }
// });
//
// server.listen(5555)

/////////////////////  PATH   //////////////////////////

// const path = require('node:path');
//
// const filePath = path.join(process.cwd(), 'services', 'test.js');
// console.log(filePath)// путь к файлу
//
// console.log(path.basename(filePath));// последня часть пути(файл)
// console.log(path.dirname(filePath));// путь к папке в которой файл
// console.log(path.extname(filePath));// расширение файла
// console.log(path.parse(filePath));// объект про путь
// console.log(path.normalize(filePath));// нормализирует урлу
//
//
// console.log(path.isAbsolute(filePath))


/////////////////////  Read Line   //////////////////////////

// const readLine = require('node:readline/promises');
//
// const start = async ()=>{
//
//    const rlInterface = readLine.createInterface(
//        process.stdin,
//        process.stdout
//    );
//
//   const name = await rlInterface.question('What is your name? ');
//   const age = await rlInterface.question('How old are you? ');
//
//   console.log( `hello, my name is ${name}, my about ${age}`)
//
//     rlInterface.close();
// }
//
// start();

/////////////////////  File Sistem   //////////////////////////

const fs = require('node:fs/promises');
const path = require('node:path');


const start = async () =>{
    // await fs.mkdir(path.join('storage', 'asd'), {recursive: true});
    const pathFile = path.join('storage', 'asd', 'myFile.txt');

    // await fs.writeFile(pathFile, 'hello\n')// перезаписать в файл
    // await fs.appendFile(pathFile, 'hello\n')// записать  в файл
    // const newVar = await fs.readFile(pathFile, { encoding: 'utf8' });
    // console.log(newVar); // чтение файла и вывод в консоль

    // const rename = await fs.rename(pathFile, path.join(process.cwd(),'storage', 'asd', 'myFile2.txt'));

    await fs.copyFile(pathFile, pathFile);

}

start();

