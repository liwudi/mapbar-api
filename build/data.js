/**
 * Created by cryst on 2017/6/21.
 */
var fs = require('fs');


//遍历文件夹，获取所有文件夹里面的文件信息
/*
 * @param path 路径
 *
 */

function geFileList(path) {
    var filesList = [];
    readFile(path, filesList);
    return filesList;
}
//遍历读取文件
function readFile(path, filesList) {
    files = fs.readdirSync(path);//需要用到同步读取
    files.forEach(walk);
    function walk(file) {
        states = fs.statSync(path + '/' + file);
        //if(!folder[file]) obj[file] = {};
        if (states.isDirectory()) {
            filesList.push({
                type: 'folder', title: file
            });
            readFile(path + '/' + file, filesList);
        }
        else {
            var filePath = path + '/' + file;
            var obj = readFileTitle(filePath);
            obj.path = filePath.replace(/web\//, ''); //文件绝对路径
            obj.type = 'file';
            filesList.push(obj);
        }
    }
}

var reg = /<title>.*<\/title>/,
    reg2 = /<meta\s*name="description"\s*content=".*"\s*>/;
function readFileTitle(src) {
    var data = fs.readFileSync(src, 'utf-8');
    var title = data.match(reg)[0].replace(/<title>|<\/title>/g, ''),
        desc = data.match(reg2);
    if(desc) {
        desc = desc[0].replace(/<meta\s*name="description"\s*content="|"\s*>/g, '');
    }
    return {
        title: title,
        desc: desc
    };
}

var path = './web/demo';
var fl = geFileList(path);
var data = JSON.stringify(fl);
fs.writeFile('./web/frame/data.json', data);

module.exports = {};