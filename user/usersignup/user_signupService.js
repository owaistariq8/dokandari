var app = angular.module('myApp');

app.factory('SignupService', ['$http',"$rootScope",function($http,$rootScope) {
    var isAuthenticated = false;
    return {
        signup : async function(username, password, email,phonenumber) {
            let data = {
                username:username, 
                password:$rootScope.md5(password).toString(), 
                email:email,
                phonenumber:phonenumber,
                userType:'user'
            };
            console.log(data)
            let response = await $http.post($rootScope.baseurl+'/signup',data,{headers: {'Content-Type': 'application/json'}});
            console.log(response);
            if(typeof response=='object' && typeof response.data=='object' && response.data.success=='yes') {
                console.log('Success');
                $rootScope.showMessage(response.data.message);
                return true;
            }
            else {

                try{
                    $rootScope.showMessage(response.data.message);
                }catch(e) {
                    $rootScope.showMessage("Signup Failed");
                }
                console.log('Failed');
                return false;
            }
        },
        
    };
}]);