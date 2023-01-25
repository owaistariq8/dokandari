var app = angular.module('myApp');
app.factory('ShopProfileService', ["$rootScope","$http",function($rootScope,$http) {
    return {
        updateProfilePicture : async function(file, id) {
            const formData = new FormData();
            formData.append("id", id);
            formData.append("file", file);

            let response = await $http.post($rootScope.baseurl+'/updateProfilePicture',formData,{transformRequest: angular.identity,
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
        followShop : async function(followerType,follower,following) {
            let data = {
                followerType:followerType,
                follower:follower,
                following:following
            }
            let response = await $http.post($rootScope.baseurl+'/follow',data,{headers: {'Content-Type': 'application/json'}});
            console.log(response);
            if(typeof response=='object' && typeof response.data=='object' && response.data.success=='yes') {
                console.log('Success');
                let userType = $rootScope.localStorage.getItem('userType');
                let object = $rootScope.localStorage.getItem(userType);
                try{
                    object = JSON.parse(object)
                }catch(e) {
                    object = {followers:[]}
                }
                object.followers.push(following);
                $rootScope.localStorage.setItem(userType,JSON.stringify(object));
                $rootScope.showMessage(response.data.message);
                return true;
            }
            else {
                try{
                    $rootScope.showMessage(response.data.message);
                }catch(e) {
                    $rootScope.showMessage("Follow Failed");
                }
                return false;
            }
        },
        createNotice : async function(id,noticeTitle,details) {
            let data = {
                id:id, 
                noticeTitle:noticeTitle, 
                details:details
            };
            
            console.log(data)
            let response = await $http.post($rootScope.baseurl+'/createNotice',data,{headers: {'Content-Type': 'application/json'}});
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
        }
    };
}]);