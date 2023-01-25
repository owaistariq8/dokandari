var app = angular.module('myApp');
app.factory('GetNewPasswordService',["$http","$rootScope" ,function($http,$rootScope) {

    return {
        request : async function(password,userType,resetToken) {
            let url = $rootScope.baseurl+'/updateShopPassword';
            if(userType=='user')
                url = $rootScope.baseurl+'/updateUserPassword';
            let response = await $http.post(url,{password:$rootScope.md5(password).toString(),resetToken:resetToken},{headers: {'Content-Type': 'application/json'}});
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