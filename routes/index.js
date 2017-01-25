var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  console.info({nombre:'adrian',apellido:'Zelada'},'Adrian Zelada',[{a:'a',b:'b',c:'c'},{a:'a',b:'b',d:'d'}]);
  res.render('index', { title: 'Expresss' });
});

module.exports = router;
