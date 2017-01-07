import express from 'express';
import sfs from './../service/file/files.lib';
let router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next)=> {
  res.render('instance/instance', { title: 'Express' });
});

module.exports = router;
