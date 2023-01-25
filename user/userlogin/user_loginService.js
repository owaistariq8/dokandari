var app = angular.module('myApp');
app.factory('UserloginService', ["$http","$window","$rootScope",function($http,$window,$rootScope) {
    var isAuthenticated = $window.localStorage.getItem("loggedIn");;
    return {
        login : async function(username, password) {
            let data = {
                username:username, 
                password:$rootScope.md5(password).toString(), 
                userType:'user'
            };
            if(isAuthenticated=="yes")
                return;

            console.log(data)
            let response = await $http.post($rootScope.baseurl+'/login',data,{headers: {'Content-Type': 'application/json'}});
            console.log(response);
            if(typeof response=='object' && typeof response.data=='object' && response.data.success=='yes') {
                console.log('Success');
                isAuthenticated = true;
                $rootScope.user = response.data.user;
                $window.localStorage.setItem("username",response.data.user.username);
                $window.localStorage.setItem("email",response.data.user.email);
                $window.localStorage.setItem("loggedIn","yes");
                $window.localStorage.setItem("userType","user");
                $window.localStorage.setItem("userId",response.data.user.id);
                $window.localStorage.setItem("user", JSON.stringify(response.data.user));
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