function testInterceptor($rootScope, $q) {
    return {
        request: function(config) {
            console.log(config);
            return config;
        },

//        response: function(result) {
//            console.log("Repos: ");
//            result.data.splice(0, 10).forEach(function(repo) {
//                console.log(repo.name);
//            });
//        },

        responseError: function (res) {
            var status = res.status,
                statusText = res.statusText,
                exceptionMessage = res.data.ExceptionMessage,
                errorMessage = res.data.Message,
                url = res.config.url;

            console.log(status);
            console.log(statusText);
            console.log(exceptionMessage);
            console.log(errorMessage);
            console.log(url);

            $rootScope.$broadcast('ApplicationError', {
                type: 'httpError',
                status: status,
                statusText: statusText,
                exceptionMessage: exceptionMessage,
                errorMessage: errorMessage,
                url: url
            });

            return $q.reject(res);
        }
    }
}

var app = angular.module('app', []);

app.factory('testInterceptor', testInterceptor);

app.config(function($httpProvider) {
    $httpProvider.interceptors.push('testInterceptor');
});

app.controller('NewController', function($scope, $http) {
    $http.get('/api/Text/Greeting').then(function (response) {
        $scope.greeting = response.data;
    });

    $scope.go = function (shouldFail) {
        if (shouldFail) {
            $http.get('/api/Text/Fail/')
                .success(function(response) {
                    $scope.responseMessage = response;
                });
        }
        else {
            $http.get('/api/Text/Success/HelloFromMvc')
                .success(function (response) {
                    $scope.responseMessage = response;
                });
        }
    }
});

app.controller('ErrorController', function ($scope) {
    $scope.$on('ApplicationError', function(somethingWeird, message) {
        $scope.errorMessage = message.errorMessage;
    });
});

app.run(function($http) {
    $http.get('https://api.github.com/users/bclinkinbeard/repos');
});
