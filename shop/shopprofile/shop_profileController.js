var app = angular.module('myApp');
app.controller('ShopprofileController', function($scope, $rootScope, $stateParams, $state, ShopProfileService,shopDetail,$window) {
    $rootScope.title = "Shop Profile Page";
    console.log(shopDetail)
    let userType = $window.localStorage.getItem('userType');
    this.isOwnShop = false;
    this.profileData = {};
    // console.log($rootScope.shop);
    // console.log($rootScope.user);
    try {
        this.profileData = shopDetail;

    }catch(e) {
        console.log(e)
    }
    $scope.id = this.profileData.id;
    this.loggedInShopID = $window.localStorage.getItem('shopId');

    this.alreadyFollowing = false;
    if(userType=='user' && $rootScope.user.followers.indexOf(this.profileData.id)>-1) {
        this.alreadyFollowing = true;
    }

    if(userType=='shop' && $rootScope.shop.followers.indexOf(this.profileData.id)>-1) {
        this.alreadyFollowing = true;
    }

    $scope.hideFollow = false;
    this.profilePhoto = JSON.parse(this.profileData.filePath);
    
    $scope.shopID = this.profileData.id;
    console.log(this.profilePhoto);
    if(this.loggedInShopID==this.profileData.id) {
        this.isOwnShop = true;
    }
    $scope.changeProfilePhoto = async function(file) {
        let response = await ShopProfileService.updateProfilePicture(file,$scope.id);
        if(response)
            $window.location.reload();
    }

    $scope.createNotice = async function() {
        console.log($scope.noticeTitle);
        console.log($scope.details);
        let response = await ShopProfileService.createNotice($scope.id, $scope.noticeTitle,$scope.details);
        console.log(response);
        if(response) {
            console.log('inside')
            angular.element(document.querySelector('#postModal')).modal('hide');
            $scope.noticeTitle = '';
            $scope.details = '';
            $state.reload();
        } else {
            $scope.error = "Notice failed";
        }   
    };   

    $scope.followShop = async function(controller){

        console.log("followShop called",controller)
        let userId = $window.localStorage.getItem('userId');
        let userType = $window.localStorage.getItem('userType');
        let shopId = $window.localStorage.getItem('shopId');
        let follower;
        let following = $scope.shopID;
        if(userType=='shop') follower = shopId;
        if(userType=='user') follower = userId;
        let response = await ShopProfileService.followShop(userType,follower,following);
        console.log(response)
        $scope.hideFollow = response;

        if(response) {
            $window.location.reload();
        }
    } 
});