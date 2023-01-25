var app = angular.module('myApp');
app.controller('ShopSignUpController', function($scope, $rootScope, $stateParams, $state, ShopSignupService) {
    $rootScope.title = "Signup Page";

    $scope.handleFile = function(file) {
        $scope.file = this.file = file;
        if (file) {
            let imageResult = document.getElementById("imageResult");
            imageResult.src = URL.createObjectURL(file)
            // console.log(imageResult);
        }
        // console.log(file)
    }
    $scope.formSubmit = async function() {
        console.log($scope.file);
        if(await ShopSignupService.signup($scope.name,$scope.email,$scope.phone,$scope.pass,$scope.city,$scope.market,$scope.shoptype,$scope.file,$scope.shopname,$scope.shopphone,$scope.shopaddr,$scope.opentime,$scope.closetime)) {
            $scope.name = ''
            $scope.email = ''
            $scope.phone = ''
            $scope.pass = ''
            $scope.city = ''
            $scope.market = ''
            $scope.shoptype = ''
            $scope.file = ''
            $scope.shopname = ''
            $scope.shopphone = ''
            $scope.shopaddr = '' 
            $scope.opentime = ''
            $scope.closetime = ''
            $scope.error = '';
            $state.transitionTo('home');
        } else {
            $scope.error = "Incorrect username/password !";
        }   
    };    
});