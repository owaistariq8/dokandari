var app = angular.module('myApp');
app.factory('LoginService', ["$http","$window","$rootScope",function($http,$window,$rootScope) {
    var isAuthenticated = $window.localStorage.getItem("loggedIn");;
    return {
        login : async function(email, password) {
            let data = {
                email:email, 
                password:$rootScope.md5(password).toString(), 
                userType:'shop'
            };
            if(isAuthenticated=="yes")
                return;

            console.log(data)
            let response = await $http.post($rootScope.baseurl+'/shopLogin',data,{headers: {'Content-Type': 'application/json'}});
            console.log(response);
            if(typeof response=='object' && typeof response.data=='object' && response.data.success=='yes') {
                console.log('Success');
                isAuthenticated = true;
                $rootScope.shop = response.data.user;
                $window.localStorage.setItem("username",response.data.user.fullname);
                $window.localStorage.setItem("email",response.data.user.email);
                $window.localStorage.setItem("loggedIn","yes");
                $window.localStorage.setItem("userType","shop");
                $window.localStorage.setItem("shopId",response.data.user.id);
                $window.localStorage.setItem("shop", JSON.stringify(response.data.user));
                $rootScope.showMessage(response.data.message);

                return isAuthenticated;
            }
            else {
                try{
                    $rootScope.showMessage(response.data.message);
                }catch(e) {
                    $rootScope.showMessage("Signup Failed");
                }
                isAuthenticated = false;
                return isAuthenticated;
                console.log('Failed');
            }
        },
        isAuthenticated : function() {
            return isAuthenticated;
        }
    };
}]);