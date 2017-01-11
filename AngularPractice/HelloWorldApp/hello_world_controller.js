var app = angular.module('HelloWorldApp', []);

app.controller('HelloWorldController', function($scope, $window, $http, $log) {
    $scope.greeting = "Hello!";

    $scope.go = function (shouldFail) {
        if (shouldFail) {
            $http.get('/api/Text/Fail').then(function(response) {
                $scope.responseMessage = response;
                $scope.errorMessage = '';
            });

            $http.get('/api/Text/Fail')
                .success(function(response) {
                    $scope.responseMessage = response;
                    $scope.errorMessage = '';
                }).error(function (response) {
                    $scope.errorMessage = 'An error has occurred.\n Message: \n' + response.Message + 'Message Detail: ' + response.MessageDetail;
                    $scope.responseMessage = '';
            });
        } else {
            $http.get('/api/Text/Success/HelloFromMvc').then(function(response) {
                $scope.responseMessage = response;
                $scope.errorMessage = '';
            });

            $http.get('/api/Text/Success/HelloFromMvc')
                .success(function (response) {
                    $scope.responseMessage = response;
                    $scope.errorMessage = '';
            }).error(function (response) {
                    $scope.errorMessage = 'An error has occurred.\n Message: \n' + response.Message + 'Message Detail: ' + response.MessageDetail;
                    $scope.responseMessage = '';
                });
        }
    }

    $scope.$log = $log;
    $scope.message = "hello world!";
});

app.factory('practiceFactory', function () {
    return {
        sayHello: function (text) {
            return "Factory says \"Hello " + text + "\"";
        },
        sayGoodbye: function (text) {
            return "Factory says \"Goodbye " + text + "\"";
        }
    }
});

function HelloCtrl($scope, practiceFactory) {
    $scope.fromFactory = practiceFactory.sayHello("World");
};
function GoodbyeCtrl($scope, practiceFactory) {
    $scope.fromFactory = practiceFactory.sayGoodbye("World");
};