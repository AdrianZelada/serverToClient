/**
 * Created by iZel on 1/12/17.
 */
var http = require('http'),
    fs = require('fs');

module.exports=function (port) {
    var io = require('socket.io')(port || 8000);

    var _console= console;
    _console=console
    _console.info = function () {
        var stack = new Error().stack;
        var fileNumber = stack.split("\n")[2].split("/").length;
        var file = stack.split("\n")[2].split("/")[fileNumber - 1].split(')')[0];
        console.log(arguments)
        console.dir('Server >>> ' + file, arguments)
        io.sockets.emit('console', {file: file, arg: arguments})
    };

    io.on('connection',function (socket) {
        socket.emit('test')
        // var _console= _console || console
    });


    fs.readFile('./libConsole/index.html', function (err, html) {
        if (err) {
            throw err;
        }
        http.createServer(function(request, response) {
            response.writeHeader(200, {"Content-Type": "text/html"});
            response.write(html);
            response.end();
        }).listen(8100);
    });
};