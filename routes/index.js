var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
var y=null;
  console.info({nombre:'adrian',apellido:'Zelada'},'Adrian Zelada',[{a:'a',b:'b',c:'c'},{a:'a',b:'b',d:'d'}]);
  console.info('pepito');
  console.log('holaa');
    y.d=2;
  res.render('index', { title: 'Expresss' });
});

module.exports = router;
