var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
    res.json({nombre:'Walter'});
})
    .get('/:id',function(req,res,next){
        res.json({nombre:'idid id'});
    })
    .post('/',function (req,res) {
    res.json({code:'javascript'})
})

module.exports = router;
