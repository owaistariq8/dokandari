
(function() {
var app = angular.module('myApp', ['ui.router']);
app.run(function($rootScope, $location, $state, LoginService,$window) {
    // console.clear();
    console.log('running');
    $rootScope.baseurl =  "http://dokandari1.com:9000";
    $rootScope.frontBaseurl =  "http://dokandari1.com";
    $rootScope.localStorage = $window.localStorage;
    try{
        $rootScope.shop = JSON.parse($window.localStorage.getItem("shop"));
        $rootScope.user = JSON.parse($window.localStorage.getItem("user"));
    }catch(e) {
        console.log(e)     
    }

    $rootScope.logOut = ()=>{
        delete $rootScope.user;
        delete $rootScope.shop;
        $rootScope.localStorage.clear();
        $window.location.href = '/'
    }
    $rootScope.showMessage = (message)=>{
        var x = document.getElementById("snackbar");

        // Add the "show" class to DIV
        x.className = "show";
        x.innerHTML = message;
        // After 3 seconds, remove the show class from DIV
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }

    $rootScope.md5 = (text)=>{
        return CryptoJS.MD5(text)

    }
    if(!LoginService.isAuthenticated()) {
        $state.transitionTo('home');
    }
});
app.config(['$stateProvider', '$urlRouterProvider', 
function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('userlogin', {
            url : '/userlogin',
            templateUrl : '/user/userlogin/user_login.html',
            controller : 'UserloginController'
        })
        .state('shoplogin', {
            url : '/shoplogin',
            templateUrl : '/shop/shoplogin/shop_login.html',
            controller : 'LoginController as vm'
        })
        .state('signup', {
            url : '/signup',
            templateUrl : '/user/usersignup/user_signup.html',
            controller : 'SignupController'
        })
        .state('userprofile', {
            url : '/userprofile/:id',
            templateUrl : '/user/userprofile/user_profile.html',
            controller : 'ProfileController as vm',
            resolve: {
                userDetail: function($rootScope,$http,$stateParams) {
                    return new Promise((resolve, reject) => {
                        console.log($stateParams);
                        let url = $rootScope.baseurl+"/userProfile?id="+$stateParams.id;
                        $http.get(url).then((data)=>{
                            let responseData = data.data.data;

                            try{
                                responseData.filePath = JSON.parse(responseData.filePath) 

                            }catch(e) {
                                responseData.filePath = {}
                            }

                            let followers = responseData.followers;
                            try{
                                responseData.followers.forEach((follower)=>{
                                    try{
                                        follower.filePath = JSON.parse(follower.filePath) 
                                    }catch(e) {
                                        follower.filePath = {}
                                    }
                                });
                            }catch(e) {

                            }
                            console.log(responseData)

                            resolve(responseData)
                        });
                    });
                },
            },
        })   
        .state('market', {
            url : '/market',
            templateUrl : '/shop/signup/market.html',
            controller : 'MarketController'
        })
         .state('shopdetail', {
            url : '/shopdetail',
            templateUrl : '/shop/signup/shop_detail.html',
            controller : 'ShopdetailController'
        })
        .state('shopsignup', {
            url : '/shopsignup',
            templateUrl : '/shop/signup/shop_signup.html',
            controller : 'ShopSignUpController as vm'
        }) 
        .state('shopprofile', {
            url : '/shopprofile/:id',
            templateUrl : '/shop/shopprofile/shop_profile.html',
            controller : 'ShopprofileController as vm',
            resolve: {
                shopDetail: function($rootScope,$http,$stateParams) {
                    return new Promise((resolve, reject) => {
                        // console.log($stateParams);
                        let url = $rootScope.baseurl+"/shopProfile?id="+$stateParams.id;
                        $http.get(url).then((data)=>{
                            let responseData = data.data.data;
                            try{
                                responseData.products.forEach((product)=>{
                                    product.file1 = JSON.parse(product.file1);        
                                })

                            }catch(e) {

                            }
                            resolve(responseData)
                        });
                    });
                },
            },
        })
        .state('forgotpassword', {
            url : '/forgotpassword',
            templateUrl : 'forgot_password/forgot_password.html',
            controller : 'ForgotpasswordController'
        })
        .state('getnewpassword', {
            url : '/getnewpassword',
            templateUrl : 'get_new_password/get_new_password.html',
            controller : 'GetNewPasswordController as vm'
        })
         .state('post', {
            url : '/post',
            templateUrl : 'shop/shopprofile/post/create_post.html',
            controller : 'PostController as vm',
            
        })
        .state('terms_conditions', {
            url : '/terms_conditions',
            templateUrl : 'terms_conditions/termsConditions.html',
            controller : 'TermsController'
        })
        .state('about', {
            url : '/about',
            templateUrl : 'about_us/about.html',
            controller : 'AboutController'
        })
         .state('help', {
            url : '/help',
            templateUrl : 'help/help.html',
            controller : 'HelpController'
        })
          .state('privacy', {
            url : '/privacy',
            templateUrl : 'privacy_policy/privacy_policy.html',
            controller : 'PrivacyController'
        }) 
           .state('contact', {
            url : '/contact',
            templateUrl : 'contact_us/contact_us.html',
            controller : 'ContactController'
        })  
        .state('home', {
            url : '/home',
            templateUrl : '/home_page/home.html',
            controller : 'HomeController as vm',
            resolve: {
                homeData: function($rootScope,$http,$stateParams) {
                    return new Promise((resolve, reject) => {
                        // console.log($stateParams);
                        let url = $rootScope.baseurl+"/home";
                        $http.get(url).then((data)=>{
                            console.log(data)
                            let shops = data.data.data.shops;
                            shops.forEach((shop)=>{
                                try{
                                    shop.filePath = JSON.parse(shop.filePath) 
                                }catch(e) {
                                    shop.filePath = {}
                                }
                            });

                            let products = data.data.data.products;

                            products.forEach((product)=>{
                                try{
                                    product.file1 = JSON.parse(product.file1) 
                                }catch(e) {
                                    product.file1 = {}
                                }
                            });
                            resolve({shops:shops,products:products})
                        });
                    });
                },
            },
        });
        $urlRouterProvider.otherwise('/home');
}]);
})();