var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  console.info({nombre:'adrian',apellido:'Zelada'});
  console.log('holaa');
  res.render('index', { title: 'Expresss' });
});

module.exports = router;
