var app = angular.module('myApp');
app.factory('ShopSignupService', ["$http","$rootScope",function($http,$rootScope) {
    return {
        signup : async function(name,email,phone,pass,city,market,shopType,file,shopName,shopPhone,shopAddress,openTime,closeTime) {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("phone", phone);
            formData.append("password", $rootScope.md5(pass).toString());
            formData.append("city", city);
            formData.append("market", market);
            formData.append("shopType", shopType);
            formData.append("file", file);
            formData.append("shopName", shopName);
            formData.append("shopPhone", shopPhone);
            formData.append("shopAddress", shopAddress);
            formData.append("openTime", openTime);
            formData.append("closeTime", closeTime);
            // console.log(...formData)

            let response = await $http.post($rootScope.baseurl+'/shopSignup',formData,{transformRequest: angular.identity,
                headers: {'Content-Type': undefined,'Process-Data': false}});
            // console.log(response);
            if(typeof response=='object' && typeof response.data=='object' && response.data.success=='yes') {
                // console.log('Success');
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