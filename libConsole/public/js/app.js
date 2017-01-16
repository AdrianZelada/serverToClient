/**
 * Created by iZel on 1/16/17.
 */

angular.module('console',['ngJsonExplorer']).
    factory('socket', function ($rootScope) {
        var socket = io.connect('http://localhost:8000');
        return {
            on: function (eventName, callback) {
                socket.on(eventName, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        callback.apply(socket, args);
                    });
                });
            },
            emit: function (eventName, data, callback) {
                socket.emit(eventName, data, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        if (callback) {
                            callback.apply(socket, args);
                        }
                    });
                })
            }
        };
    }).controller('consoleCtrl',function ($scope,socket) {

        $scope.responseServer=[];

        socket.on('console',function (data) {
            $scope.responseServer.push(data)
        });


    });