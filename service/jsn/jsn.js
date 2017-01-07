/**
 * Created by gtbzh on 2016/6/24.
 * 这是一个json的类,可以直接引用
 */

import fs from 'fs';

const readFileAsJson = (filename, callback)=> {
    fs.readFile(filename, (err, data)=> {
        if (err) {
            callback(err);
            return;
        }
        try {
            callback(null, JSON.parse(data));
        } catch (exception) {
            callback(exception);
        }
    });
}

export default readFileAsJson;