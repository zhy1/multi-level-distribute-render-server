/**
 * Created by fermi on 2016/2/11.
 * SerializeFileSystem
 */
import      fs          from    'fs'
import      q           from    'q'
import      path        from    'path'
import      fstream     from    'fstream'
import      tar         from    'tar'
import      zlib        from    'zlib'

const writeFileSync = (path, data, encoding)=> {
    return fs.writeFileSync(path, data, encoding);
}

const getPathDataBuffer = dataPath => {
    fs.open(dataPath, 'r', (err, fd) => {
        if (err) {
            console.error(err);
            return;
        } else {
            let buffer = new Buffer(255);
            fs.read(fd, buffer, 0, 9, 3, (err, bytesRead, buffer) => {
                if (err) {
                    throw err;
                } else {
                    fs.read(fd, buffer, 0, 9, null, (err, bytesRead, buffer) => {
                        return buffer.slice(0, bytesRead).toString();
                    });
                }
            });
        }
    });
}

const mkdir = path => {
    fs.mkdir(process.cwd() + path, 777, err=> {
        if (err)console.log(err);
        else console.log("creat done!");
    })
}

const scanFolder = path => {
    const fileList = [], folderList = [],
        walk = (path, fileList, folderList)=> {
            files = fs.readdirSync(path);
            files.forEach((item)=> {
                let tmpPath = path + '/' + item,
                    stats = fs.statSync(tmpPath);

                if (stats.isDirectory()) {
                    walk(tmpPath, fileList, folderList);
                    folderList.push(tmpPath);
                } else {
                    fileList.push(tmpPath);
                }
            });
        };

    walk(path, fileList, folderList);
    console.log('scan ' + path + ' success ');
    return {
        'files': fileList,
        'folders': folderList
    }
}


const readFileAsJSObjectNative = (path = "") => {
    const content = fs.readFileSync(path, {encoding: 'utf-8'});
    return {
        js: JSON.parse(content),
        content: content
    }
}

export default {
    scanFolder,
    mkdir,
    readFileAsJSObjectNative,
    writeFileSync
};