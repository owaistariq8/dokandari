var app = angular.module('myApp');
app.controller('PostController', function($scope, $rootScope, $stateParams, $state, PostProductService, $window) {
    $rootScope.title = "Add Product page";
    $scope.shopID = $window.localStorage.getItem('shopId');

    $scope.handleFile = function(file,index) {
        if(index==1)
            $scope.file1 = file;
        if(index==2)
            $scope.file2 = file;
        if(index==3)
            $scope.file3 = file;
        if(index==4)
            $scope.file4 = file;
        
        // if (file) {
        //     let imageResult = document.getElementById("imageResult");
        //     imageResult.src = URL.createObjectURL(file)
        //     // console.log(imageResult);
        // }
        // console.log(file)
    }
    $scope.addProduct = async function() {

        console.log($scope.name);
        console.log($scope.price);
        console.log($scope.description);
        console.log($scope.condition);
        console.log($scope.file1);
        console.log($scope.file2);
        console.log($scope.file3);
        console.log($scope.file4);

        if(await PostProductService.addProduct($scope.shopID,$scope.name, $scope.price ,$scope.description, $scope.condition, $scope.file1, $scope.file2 ,$scope.file3, $scope.file4)) {
             $rootScope.userName = $scope.username;
             $scope.error = '';
             $scope.name = '';
             $scope.price = '';
             $scope.description = '';
             $scope.condition = '';
             $scope.file1 = '';
             $scope.file2 = '';
             $scope.file3 = '';
             $scope.file4 = '';


             $state.transitionTo('home');
        } else {

        }   

     };    
});