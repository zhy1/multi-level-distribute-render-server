/**
 * Created by gtbzh on 2016/7/20.
 */
import express from 'express';
import render from '../service/render/render.lib';
let router = express.Router();


router.get('/load/:project', (req, res, next) => {
    return render.StaticRenderNotShow(req, res, next);
})


router.get('/show/:project', (req, res, next) => {
    return render.DataDynamicRenderToShow(req, res, next);
})

module.exports = router;
