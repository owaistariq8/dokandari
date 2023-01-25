var app = angular.module('myApp');
app.controller('HomeController', function($scope, $rootScope, $stateParams, $state, SignupService, UserloginService, $window, homeData) {
    $rootScope.title = "Home Page";
    $rootScope.isLoggedIn = (UserloginService.isAuthenticated()=="yes")?true:false;
    this.$rootScope = $rootScope;
    this.$state = $state;
    console.log($rootScope.isLoggedIn);
    this.userName = $window.localStorage.getItem('username');
    this.userType = $window.localStorage.getItem('userType');
    this.shopId = $window.localStorage.getItem('shopId');
    this.userId = $window.localStorage.getItem('userId');
    console.log(homeData);
    this.products = [];
    this.shops = [];
    
    // console.log(this.products);
    this.randomArrayShuffle = (array)=> {
      var currentIndex = array.length, temporaryValue, randomIndex;
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    }

    try{
        this.products = homeData.products
        let products = JSON.parse(JSON.stringify(this.products))
        this.recomendedProducts = this.randomArrayShuffle(products);
    }catch(e) {

    }
    try{
        this.shops = homeData.shops
        let shops = JSON.parse(JSON.stringify(this.shops))
        this.recomendedShops = this.randomArrayShuffle(shops);

    }catch(e) {
        console.log(e)
    }

    
});


