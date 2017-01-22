/**
 * Created by iZel on 1/12/17.
 */

var http = require('http'),
    express = require('express'),
    router = express.Router(),
    io = require('socket.io')(8888),
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

_console.error = function (stack) {
    console.log(stack);
    io.sockets.emit('error', stack)
};

var request= {
        skip: function (req, res) {
            io.sockets.emit('response',{
                status:res.statusCode,
                host:req.header('host'),
                method:req.method,
                url:req.protocol + '://' + req.get('host') + req.originalUrl
        });
            return false;
        }
    };

router.get('/',function (req,res) {
    res.render('../libConsole/index.ejs')
});

function _logErrors (err, req, res, next) {
    console.error(err.stack)
    next(err)
}


module.exports={
    router:router,
    morgan:request,
    logErrors:_logErrors
};
