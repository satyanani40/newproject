'use strict';

/**
 * @ngdoc function
 * @name sampleAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sampleAppApp
 */
angular.module('sampleAppApp')
.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}])
.directive('file', function () {
    return {
        scope: {
            file: '='
        },
        link: function (scope, el, attrs) {
            el.bind('change', function (event) {
                var file = event.target.files[0];
                scope.file = file ? file : undefined;
                scope.$apply();
            });
        }
    };
}).service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl){
        var fd = new FormData();
        fd.append('file', file);

        data = JSON.stringify({'file':fd, 'data':'suresh'})
        $http.post(uploadUrl, data, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(){
        })
        .error(function(){
        });
    }
}]).controller('CreateChapterCtrl', function ($scope, $http, $routeParams) {

         if(($scope.chapter_name == 'undefined' || $scope.file == 'undefined' || $routeParams.categeory == 'undefined')){
            alert('please enter all fields');
            return;
        }

        $scope.uploadFile = function(){
              console.log($scope.file)

              $http({
                method: 'POST',
                url: '/chapter',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: {
                    'chaptername': $scope.chapter_name,
                    'upload': $scope.file,
                    'cat': $routeParams.categeory
                },
                transformRequest: function (data, headersGetter) {
                    var formData = new FormData();
                    angular.forEach(data, function (value, key) {
                        formData.append(key, value);
                    });

                    var headers = headersGetter();
                    delete headers['Content-Type'];

                    return formData;
                }
            })
           .success(function (out) {
                if(out.status == 200){
                    $scope.error = 'successfully created'

                }else{
                    $scope.error = 'failed to created a chapter please refresh and try again'
                }
               console.log(out);
            })
            .error(function (data, status) {

            });
        };
  })
  .controller('createAssessmentCtrl', function ($scope, $http, $routeParams) {
        if($scope.exam_name == 'undefined' || $scope.file == 'undefined'||
        $scope.exam_time == 'undefined' || $scope.exam_pass_mark == 'undefined' || $routeParams.categeory == 'undefined'){
            alert('please enter all fields');
            return;
        }

        $scope.create_examination = function(){
              $http({
                    method: 'POST',
                    url: '/create_exam',
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },

                    data: {
                        'exam_name': $scope.exam_name,
                        'upload': $scope.file,
                        'cat': $routeParams.categeory,
                        'exam_time': $scope.exam_time,
                        'exam_pass_mark': $scope.exam_pass_mark
                    },
                    transformRequest: function (data, headersGetter) {
                        var formData = new FormData();
                        angular.forEach(data, function (value, key) {
                            formData.append(key, value);
                        });

                        var headers = headersGetter();
                        delete headers['Content-Type'];

                        return formData;
                    }
              })
           .success(function (out) {
                if(out.status == 200){
                    $scope.error = 'successfully created'

                }else{
                    $scope.error = 'failed to create a chapter'
                }
               console.log(out);
            })
            .error(function (data, status) {

            });
        };
  });