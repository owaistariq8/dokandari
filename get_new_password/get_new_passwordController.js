var app = angular.module('myApp');
app.controller('GetNewPasswordController', function($scope, $rootScope, $stateParams, $state, GetNewPasswordService, $location) {
    $rootScope.title = "Get_new_password Page";
    let userType =  $location.search().userType;
    let resetToken =  $location.search().resetToken;

    $scope.formSubmit = async function() {
        if($scope.password!=$scope.cpassword) {
            $rootScope.showMessage("Both password are not same");
        }
        else {

            if(await GetNewPasswordService.request($scope.password, userType ,resetToken)) {
                $scope.error = '';
                $scope.cpassword = '';
                $scope.password = '';
                if(userType=='user')
                    $state.transitionTo('userlogin');
                else 
                    $state.transitionTo('shoplogin');
            } else {

            }   
        }
    };    
});