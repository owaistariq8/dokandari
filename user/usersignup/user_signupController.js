var app = angular.module('myApp');
app.controller('SignupController', function($scope, $rootScope, $stateParams, $state, SignupService) {
    $rootScope.title = "Signup Page";
    $scope.formSubmit = async function() {
        let signResponse = await SignupService.signup($scope.username, $scope.password ,$scope.email, $scope.phonenumber);
        if(signResponse) {
            $rootScope.userName = $scope.username;
            $scope.error = '';
            $scope.username = '';
            $scope.password = '';
            $scope.password = '';
            $scope.email = '';
            $scope.phonenumber = '';
            // $rootScope.showMessage('Signup Successfull');
            $state.transitionTo('home');
        } else {
            // $rootScope.showMessage('Signup Failed');

            // alert('signup failed')
        }   
    };    
});