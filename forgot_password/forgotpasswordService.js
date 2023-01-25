var app = angular.module('myApp');
app.factory('ForgetPasswordService',["$http","$rootScope", function($http,$rootScope) {
    return {
        request : async function(email,userType) {
            let url = $rootScope.baseurl+'/shopForgetPassword';
            if(userType=='user')
                url = $rootScope.baseurl+'/userForgetPassword';
            let response = await $http.post(url,{email:email},{headers: {'Content-Type': 'application/json'}});
            if(typeof response=='object' && typeof response.data=='object' && response.data.success=='yes') {
                // console.log('Success');
                $rootScope.showMessage(response.data.message);
                return true;
            }
            else {

                try{
                    $rootScope.showMessage(response.data.message);
                }catch(e) {
                    $rootScope.showMessage("Reset Password Failed");
                }
                console.log('Failed');
                return false;
            }
        },
    };
}]);