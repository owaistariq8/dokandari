var app = angular.module('myApp');
app.controller('ForgotpasswordController', function($scope, $rootScope, $stateParams, $state, ForgetPasswordService,$location) {
    $rootScope.title = "Forgot_password Page";
    let userType =  $location.search().userType;
    console.log(userType)

    $scope.formSubmit = async function() {
        if(await ForgetPasswordService.request($scope.email,userType)) {
            $rootScope.userName = $scope.username;
            $scope.error = '';
            $scope.username = '';
            $scope.password = '';
            $scope.password = '';
            $scope.email = '';
            $scope.phonenumber = '';
            $state.transitionTo('home');
        } else {

        }   
    };    
});