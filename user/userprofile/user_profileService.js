var app = angular.module('myApp');
app.factory('UserProfileService', ["$http","$rootScope",function($http,$rootScope) {
    return {
        updateProfilePicture : async function(file, id) {
            const formData = new FormData();
            formData.append("id", id);
            formData.append("file", file);

            let response = await $http.post($rootScope.baseurl+'/updateProfilePictureUser',formData,{transformRequest: angular.identity,
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