/**
 * Created by iZel on 1/24/17.
 */
angular.module('console').directive('consoleLog',function () {
    return{
        restrict:'E',
        scope:{
            responseServer:'='
        },
        controller:function ($scope,$element,$attrs) {
            console.log('test')
            $scope.fn= {
                keysRes: function (obj) {
                    var newObj = {};
                    Object.keys(obj).forEach(function (val) {
                        if (val != '$$hashKey') {
                            newObj[val] = obj[val];
                            newObj.key = val;
                        }
                    });
                    obj.status = false;
                    obj.value = newObj[newObj.key];
                    obj.key = newObj.key;
                },
                canColap:function (object) {
                    if(object["1"]){
                        return true;
                    }else{
                        return angular.isObject(object["0"]);
                    }
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
                isObject:function (item) {
                    return angular.isObject(item);
                },
                clear:function () {
                    $scope.responseServer=[]
                }
            }
        },
        templateUrl:'public/directives/console-log.html'
    }
}).directive('consoleError',function () {
    return{
        restrict:'E',
        scope:{
            responseError:'='
        },
        controller:function ($scope) {
            $scope.fn={
                clear:function () {
                    $scope.responseError=[];
                }
            }
        },
        templateUrl:'public/directives/console-error.html'
    }
}).directive('consoleRequest',function () {
    return {
        restrict: 'E',
        scope: {
            requestServer: '='
        },
        controller:function ($scope) {
            $scope.fn={
                clear:function () {
                    $scope.requestServer=[];
                }
            }
        },
        templateUrl:'public/directives/console-request.html'
    }
});