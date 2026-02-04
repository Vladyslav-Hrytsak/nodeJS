const {foo: helperFoo} = require('./helper/helper');
const http = require('node:http');
const path = require('node:path');
const readLine = require('node:readline/promises');


const foo = async ()=>{

    //http

    const server = http.createServer((req, res)=>{

        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({
            data: 'hello world'
        }));

    });
    server.listen(3000);

    //path

    // const pathFilename = __filename
    // console.log(path.dirname(pathFilename))
    // console.log(path.extname(pathFilename))
    // console.log(path.basename(pathFilename))
    // console.log(path.parse(pathFilename))
    // console.log(path.isAbsolute(pathFilename))

    // read line

    const rlInterface = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const name = await rlInterface.question('What is your name? ');
    const age = await rlInterface.question('How old are you? ');
    console.log(`Name: ${name} \n Age: ${age}`);
    // rlInterface.close();
    process.exit(0);







}

foo()

