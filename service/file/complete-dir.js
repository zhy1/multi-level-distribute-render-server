/**
 * Created by gtbzh on 2016/8/8.
 */
import cfg from '../config'


export const mkCompleteDirExits = (local, fn) => {
    console.info("local!   : " + local);
    let path = local.split("/");
    path = path[path.length - 1]
    let projectName = path.split(".");
    projectName = projectName[0];
    let ifExists = cfg.workDirectory.views + projectName
    console.info("ifExists!   : " + ifExists);
    fs.existsSync(process.cwd() + ifExists) || sfs.mkdir(ifExists);
    //console.info("all path = " + process.cwd() + ifExists);
    !!fn&&fn();
}