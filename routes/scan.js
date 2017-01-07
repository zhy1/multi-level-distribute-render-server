/**
 * Created by gtbzh on 2016/8/9.
 */
import express from 'express';
import render from '../service/render/render.lib';
let router = express.Router();

router.get('/:codeId', (req, res, next) => {
    return render.CompleteRender(req, res, next);
})
/*

router.get('/:project', (req, res, next) => {
    return render.DataDynamicRenderToShow(req, res, next);
})
*/

module.exports = router;
