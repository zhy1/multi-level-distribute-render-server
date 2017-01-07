import express from 'express';
let router = express.Router();

/* GET home page. */
router.get('/', (req, res, next)=> {
    //res.render('index', { title: 'Express' });
    res.render('test', {title: 'Express'});
});

module.exports = router;
