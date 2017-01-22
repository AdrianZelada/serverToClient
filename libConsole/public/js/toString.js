/**
 * Created by iZel on 1/21/17.
 */
angular.module('console').filter('tostring',function () {
   return function (input) {
       console.log(input);
       return input
   }
});