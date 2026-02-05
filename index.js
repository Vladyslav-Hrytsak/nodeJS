const fs = require('node:fs/promises');
const path = require('node:path');


const hw_2 = async () => {
    await fs.mkdir(path.join(__dirname, 'baseFolder'), { recursive: true });

    for (let i = 0; i < 5; i++) {
        const folderPath = path.join(__dirname, 'baseFolder', `folder-${i}`);
        await fs.mkdir(folderPath, { recursive: true });

        for (let j = 0; j < 5; j++) {
            const filePath = path.join(folderPath, `file-${j}.txt`);
            await fs.writeFile(filePath, 'Hello World!');
        }
    }


    for (let i = 0; i < 5; i++) {

        const folderPath = path.join(__dirname, 'baseFolder', `folder-${i}`);

        const stat = await fs.stat(folderPath);
        console.log(folderPath,' is directory? -' ,stat.isDirectory() ,' is file? -' , stat.isFile() );

        for (let j = 0; j < 5; j++) {

            const filePath = path.join(folderPath, `file-${j}.txt`);


            const statF = await fs.stat(filePath);
            console.log(filePath,' is directory? -' ,statF.isDirectory() ,' is file? -' , statF.isFile() );
        }
    }
}


hw_2()