/**
 * Created by iZel on 1/16/17.
 */

angular.module('console',['ngJsonExplorer']).
    factory('socket', function ($rootScope) {
        var socket = io.connect('http://localhost:8888');
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
            delete data.$$hashKey;
            $scope.responseServer.push(data)
        });

        $scope.fn={
            keysRes:function (obj) {
                console.log($scope.responseServer);
                var newObj={};
                Object.keys(obj).forEach(function (val) {
                    if(val != '$$hashKey'){
                        newObj[val]=obj[val];
                        newObj.key=val;
                    }
                });
                obj.value=newObj[newObj.key];
                obj.key=newObj.key;
            }
        }
    });