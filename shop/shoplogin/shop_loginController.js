var app = angular.module('myApp');
app.controller('LoginController', function($scope, $rootScope, $stateParams, $state, LoginService,$window) {
    $rootScope.title = "Login Page";
    console.log('here');
    console.log(LoginService.isAuthenticated())
    if(LoginService.isAuthenticated()=='yes') {
        $state.transitionTo('home');
        return true;
    }
    $scope.formSubmit = async function() {
        if(await LoginService.login($scope.email, $scope.password)) {
            $scope.error = '';
            $scope.password = '';
            $scope.email = '';
            // $window.location.href = $rootScope.frontBaseurl+"/#/shopprofile/"+$window.localStorage.getItem("shopId");
            // console.log($window.location.href);
            $state.transitionTo('shopprofile',{id:$window.localStorage.getItem("shopId")});
            $rootScope.showMessage('loggedin Successfully');
        } else {
            $scope.error = "Incorrect username/password !";
            $rootScope.showMessage($scope.error);

        }   
     };    
 });