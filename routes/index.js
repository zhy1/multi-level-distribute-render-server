import express from 'express';
import xtpl from 'xtpl';
import fs from 'fs-extra';

import cfg from '../service/config';
import sfs from '../service/file/files.lib';

let router = express.Router();

router.get('/', (req, res, next)=> {
    //res.writeHead(200, {'Content-Type': 'text/html'});
    res.writeHead(200, cfg.httpHeader);
    res.write("render server status is ok \n" + new Date(), cfg.appEncoding);
    res.end();
});

module.exports = router;

