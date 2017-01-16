/**
 * Created by iZel on 1/16/17.
 */
/**
 * Created by iZel on 1/12/17.
 */

var io = require('socket.io')(8000),
    express = require('express'),
    router = express.Router(),
    _console= console;

_console=console;
_console.info = function () {
    var stack = new Error().stack;
    var fileNumber = stack.split("\n")[2].split("/").length;
    var file = stack.split("\n")[2].split("/")[fileNumber - 1].split(')')[0];
    var sendObj={};
    console.log(file);
    console.log(arguments);
    sendObj[file]=arguments;
    io.sockets.emit('console', sendObj)
};

io.on('connection',function (socket) {

});

router.get('/',function (req,res) {
    res.render('../libConsole/index.ejs')
});


module.exports=router;