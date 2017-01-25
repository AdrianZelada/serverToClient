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
        $scope.requestServer=[];
        $scope.requestError=[];
        $scope.oldIndex=0;

        socket.on('console',function (data) {
            $scope.responseServer.unshift(data);
        });

        socket.on('response',function (data) {
            $scope.requestServer.unshift(data);
            console.log(data);
        });

        socket.on('error',function (data) {
            var error = new Object({
                error:data
            });
            $scope.requestError.unshift(error)
        });



        $scope.fn={
            keysRes:function (obj) {
                var newObj={};
                Object.keys(obj).forEach(function (val) {
                    if(val != '$$hashKey'){
                        newObj[val]=obj[val];
                        newObj.key=val;
                    }
                });
                obj.status=false;
                obj.value=newObj[newObj.key];
                obj.key=newObj.key;
            },
            isObject:function (item) {
                return angular.isObject(item);
            },
            objectToString:function (item,parent) {
                var array=[],
                    word='',
                    limit=50;

                for(var key in item){
                    if(angular.isObject(item[key])){
                        array.push(JSON.stringify(item[key]));
                    }else{
                        array.push(item[key])
                    }
                }
                word=array.toString();
                if(word.length >=limit){
                    word=word.substr(0,limit)+' ...'
                }
                parent.toString=word;
            },
            canColap:function (object) {
                if(object["1"]){
                    return true;
                }else{
                    return angular.isObject(object["0"]);
                }
            },
            onLostFocus:function () {
                console.log('lostFocus')
                $scope.oldIndex=$scope.responseServer.length;
            }
        }
    });