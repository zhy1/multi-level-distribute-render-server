/**
 * Created by gtbzh on 2016/7/20.
 */
import express from 'express';
import xtpl from 'xtpl';
import fs from 'fs-extra';
import request from 'request';

import cfg from '../config'
import sfs from '../file/files.lib'
import downloader from '../static/staticful'
import obj from '../dynamic/mockreq'
/**
 * download data and inject/ conversion/  render data & to local hardware;
 * @param req
 * @param res
 * @param next
 * @param fn
 * @constructor
 */
const StaticRenderNotShow = (req, res, next, fn = null, projects = null) => {
    const project = projects || req.params.project;
    downloader.downloadTemplateFromStaticServer(project, (stream)=> {
        if (fn) fn();
        else {
            res.writeHead(200, cfg.httpHeader);
            res.write(JSON.stringify({result: stream}), cfg.appEncoding);
            res.end();
        }
    });
}

/**
 * Must be run  StaticRenderNotShow()  before !
 * This way is to use the data after the completion of the above data rendering;
 * @param req
 * @param res
 * @param next
 * @constructor
 */
const DataDynamicRenderToShow = (req, res, next) => {
    const project = req.params.project;
    const requestUrl = cfg.scanRequestUrl + project;
    request(requestUrl, (error, response, body) => {
        let responseBody;
        if (!error && response.statusCode && response.statusCode == 200) {
            responseBody = JSON.parse(body)
            res.render('project/' + project + "/" + project, responseBody.data)
        } else {
            res.writeHead(400, cfg.httpHeader)
            res.write("error msg by " + requestUrl + body, cfg.appEncoding + new Date().toDateString())
            res.end();
        }
    })
}

/**
 * run method 1  &  method 2;
 * @param req
 * @param res
 * @param next
 * @constructor
 */
const CompleteRender = (req, res, next) => {
    const requestUrl = cfg.scanRequestUrl + req.params.codeId;
    request(requestUrl, (error, response, body) => {
        let responseBody;
        if (!error && response.statusCode && response.statusCode == 200) {
            responseBody = JSON.parse(body)
            StaticRenderNotShow(req, res, next, ()=> {
                res.render('project/' + responseBody.data.productinfo.tpUrl + "/" + responseBody.data.productinfo.tpUrl, responseBody.data)
            }, responseBody.data.productinfo.tpUrl)
        } else {
            res.writeHead(400, cfg.httpHeader)
            res.write("error msg by " + requestUrl + body, cfg.appEncoding + new Date().toDateString())
            res.end();
        }
    })
}

export default {
    StaticRenderNotShow,
    DataDynamicRenderToShow,
    CompleteRender
}
