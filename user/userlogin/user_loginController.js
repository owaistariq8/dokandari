var app = angular.module('myApp');
app.controller('UserloginController', function($scope, $rootScope, $stateParams, $state, UserloginService,$window) {
    $rootScope.title = "Login Page";
    console.log('here');
    console.log(UserloginService.isAuthenticated())
    if(UserloginService.isAuthenticated()=='yes') {
        $state.transitionTo('home');
        return true;
    }

    $scope.formSubmit = async function() {
        console.log('formSubmit');
        if(await UserloginService.login($scope.username, $scope.password)) {
            $rootScope.userName = $scope.username;
            // console.log($window.localStorage)
            $scope.error = '';
            $scope.username = '';
            $scope.password = '';
            $scope.email = '';
            $scope.phonenumber = '';
            // console.log('here 2')
            // console.log($state)
            $state.transitionTo('userprofile',{id:$window.localStorage.getItem('userId')});
            $rootScope.showMessage('loggedin Successfully');
        } else {
            $scope.error = "Incorrect username/password !";
            console.log($scope.error);
            $rootScope.showMessage($scope.error);
        }   
    };    
});