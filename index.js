
const fs = require('node:fs/promises');
const fsStertam = require('node:fs');
const eventEmitter = require('node:events');
const path = require('node:path');
const os = require('node:os');

const foo = async ()=>{

///////// File sistem ////////////

    // const file = path.join(__dirname,'index.txt');
    // console.log(file)
    // await  fs.writeFile('./index.txt', `VLAD\n`)
    // await fs.appendFile(file, 'Love Ksu');
    // const data = await fs.readFile('./index.txt','utf8');
    // console.log(data);
    // await fs.mkdir(path.join(__dirname, 'new-folder'),{recursive:true});// создает папку(а джоин пас это поиск пути)
    // await fs.mkdir(path.join(__dirname, 'new-folder', 'some-folder'),{recursive:true});//папка в папке
    // await fs.rm(path.join(__dirname, 'new-folder'),{recursive:true});//удаление папки по пути
    // await fs.rename(file, path.join(__dirname, 'new-folder','newFile.txt' )) //переименование (в данном случае корневая папка, потом идет другая папка, и потом название для переименования)
    // await fs.copyFile(file, path.join(__dirname, 'new-folder', 'index.txt'));// тоже самое только копирование
    // const stats = await fs.stat(file);
    // console.log(stats.isFile());

    /////////  Streams ////////////

    // const pathFile = path.join(__dirname, 'index.txt');
    //
    // const stream = fsStertam.createReadStream(pathFile);
    // const writeStream = fsStertam.createWriteStream(path.join(__dirname, 'new-big-file.txt'));
    //
    // stream.on('data', (chunk)=>{
    //     console.log('chunk' ,chunk.length);
    //     writeStream.write(chunk);
    // })


    /////////  Events  ////////////

    // const emitter = new eventEmitter();
    //
    // emitter.once('error', ()=>{
    //     console.log('emitter error');
    // })
    // emitter.on('error', ()=>{
    //     console.log('emitter error 222');
    // })
    //
    // emitter.emit('error');
    // emitter.emit('error');

    console.log(os.arch())
    console.log(os.cpus())

    console.log(os.freemem()/1024/1024/1024, 'gb')
    console.log(os.totalmem()/1024/1024/1024, 'gb')




}


foo()