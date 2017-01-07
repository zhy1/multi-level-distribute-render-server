/**
 * Created by gtbzh on 2016/8/8.
 */
import cfg from '../config'

export const conversionFileType = (fileName = "", fileType = cfg.assertFile.json)=> {
    const filePathSplit = fileName.split(".");
    const filePathNoType = fileName.substr(0, (fileName.length - filePathSplit[filePathSplit.length - 1].length ) - 1);
    const newPath = filePathNoType + fileType;
    //console.info(fileName +"\n" + fileType + "\n" +  newPath);
    return newPath
}