'use strict';

/**
 * @ngdoc function
 * @name sampleAppApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the sampleAppApp
 */
angular.module('sampleAppApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  })
  .controller('assessmentsCtrl', function ($scope, $routeParams, $rootScope, $http) {
        $rootScope.cat = $routeParams.categeory;
        $http({
                    method: 'POST',
                    url: '/getExams',
                    headers: {
                        'Content-Type': 'application/json'
                    },

                    data: {
                        'cat': $routeParams.categeory
                    }

              })
           .success(function (out) {
               $rootScope.exams = JSON.parse(out.data);
               var exam_names = [];
               for(var temp in $rootScope.exams){
                   if(exam_names.indexOf($rootScope.exams[temp].exam_name) == -1){
                       exam_names.push($rootScope.exams[temp].exam_name)
                   }
               }
              $scope.exam_names = exam_names;
            })
            .error(function (data, status) {

        });
  });
