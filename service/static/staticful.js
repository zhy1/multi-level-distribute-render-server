/**
 * Created by gtbzh on 2016/6/30.
 */


import http from 'http'
import fs  from 'fs-extra'
import xtpl from 'xtpl';
import fstream from'fstream'
import tar from 'tar'
import gz from 'zlib'
import q from 'q'
import download from 'download'

import cfg from '../config'
import sfs from '../file/files.lib'
import { conversionFileType }  from '../file/filetype'
import { mkCompleteDirExits }  from '../file/complete-dir'

let status = 0;

const injectResourceHtml = (fileName, fn) => {
    const assertCssFile = conversionFileType(fileName, cfg.assertFile.css);
    const assertHtmlFile = conversionFileType(fileName, cfg.renderType);
    if (fs.existsSync(assertCssFile) && fs.existsSync(assertHtmlFile)) {
        const cssFileContent = fs.readFileSync(assertCssFile, {encoding: cfg.appEncoding})
        let htmlFileContent = fs.readFileSync(assertHtmlFile, {encoding: cfg.appEncoding})
        htmlFileContent = htmlFileContent.replace(/<\/body>/g, "<style>" + cssFileContent + "</style></body>");
        fs.writeFileSync(assertHtmlFile, htmlFileContent);
        console.info(" inject complete }\nstart return")
        fn && fn(assertHtmlFile);
    }
}


// use stream cover覆盖 file path.
const handleLocalFiles = (localPathPublic = "", localPathView = "") => {
    let filePathSplit = localPathPublic.split("/");
    let fileTypeSplit = localPathPublic.split(".");
    let fileName = filePathSplit[filePathSplit.length - 1].split(".")[0];
    let fileType = fileTypeSplit[fileTypeSplit.length - 1];
    let fileHtmlConvertXtpl = conversionFileType(localPathView, cfg.renderType);
    try {
        if (fileType === cfg.assertFile.html.substr(1)) {
            fs.renameSync(localPathView, fileHtmlConvertXtpl);
            fs.removeSync(localPathPublic);
        }
        if (fileType === cfg.assertFile.tar.substr(1)) {
            const tarFile = process.cwd() + cfg.workDirectory.pub + fileName + "/" + fileName + "." + fileType;
            const unTarFileDirectory = process.cwd() + cfg.workDirectory.pub + fileName;
            try {
                fstream.Reader({'path': tarFile})
                    .pipe(tar.Parse())
                    .pipe(fstream.Writer({
                        'path': unTarFileDirectory,
                        'type': 'Directory'
                    }));
            } catch (e) {
                console.error("error : confirm tar file is complete!");
            }
        }
    } catch (err) {
        console.error(err)
    }
}

const renderStaticHtml = (fileHtmlConvertXtpl = "")=> {
    let renderContentByRulesJson;
    try {
        renderContentByRulesJson = sfs.readFileAsJSObjectNative(conversionFileType(fileHtmlConvertXtpl, cfg.assertFile.json));
    } catch (e) {
        const errorMsg = new Date() + "-  dismiss json files，this operator is terminate  !!";
        console.error(errorMsg);
    }
    xtpl.renderFile(fileHtmlConvertXtpl, renderContentByRulesJson, (error, content)=> {
        console.error("render complete");
    });
}


const httpDownloader = (projectName = "")=> {
    fs.mkdirpSync(process.cwd() + cfg.workDirectory.views + projectName, 777)
    fs.mkdirpSync(process.cwd() + cfg.workDirectory.pub + projectName, 777)
    var deferred = q.defer();
    let count = 0;
    const down = fileType=> {
        let remoteUrl = cfg.templateFileSystemServer.url+ projectName + "/" + projectName + fileType;
        count++
        //let remoteUrl = cfg.templateFileSystemServer.url + projectName + fileType;
        let localPathPublic = process.cwd() + cfg.workDirectory.pub + projectName + "/" + projectName + fileType;
        let localPathView = process.cwd() + cfg.workDirectory.views + projectName + "/" + projectName + fileType;
        console.info("start download : no." + count + " url:" + remoteUrl);
        download(remoteUrl).then(dataStream=> {
            fs.writeFileSync(localPathPublic, dataStream);
            fs.writeFileSync(localPathView, dataStream);
            handleLocalFiles(localPathPublic, localPathView);
            if (count >= Object.keys(cfg.assertFile).length)
                deferred.resolve();
        }, error=> {
            deferred.reject(error);
            console.info(error);
        });
    }
    Array.from(Object.keys(cfg.assertFile), fileType => {
        down(cfg.assertFile[fileType]);
    })
    return deferred.promise;
}


const downloadTemplateFromStaticServer = (projectName = "", fn = null)=> {
    httpDownloader(projectName).then(()=> {
        console.info("download complete\nstart inject fn {")
        injectResourceHtml(process.cwd() + cfg.workDirectory.views + projectName + "/" + projectName + cfg.renderType, fn);
    })
}

export default {
    downloadTemplateFromStaticServer
}
