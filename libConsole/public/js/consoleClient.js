/**
 * Created by iZel on 1/13/17.
 */
var socket = io('http://localhost:8000');

socket.on('test',function () {
    console.log('tests')
})

socket.on('console',function () {
    console.log('console')
})