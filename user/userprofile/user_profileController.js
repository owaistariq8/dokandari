var app = angular.module('myApp');
app.controller('ProfileController', function($scope, $rootScope, $stateParams, $state, UserProfileService, userDetail, $window) {
    $rootScope.title = "Signup Page";

    let userType = $window.localStorage.getItem('userType');
    this.isOwnUser = false;
    this.profile = {};
    // console.log($rootScope.shop);
    // console.log($rootScope.user);
    try {
        this.profile = userDetail;

    }catch(e) {
        console.log(e)
    }
    console.log(this.profile)
    this.followedShopCount = 0;
    try{
        this.followedShopCount = this.profile.followers.length
    }catch(e) {

    }
    $scope.id = this.profile.id;
    this.loggedInUserID = $window.localStorage.getItem('userId');
    this.profilePhoto = this.profile.filePath
    $scope.shopID = this.profile.id;
    console.log(this.profilePhoto);

    if(this.loggedInUserID==this.profile.id) {
        this.isOwnUser = true;
    }

    this.followedShops = this.profile.followers;

    $scope.changeProfilePhoto = async function(file) {
        let response = await UserProfileService.updateProfilePicture(file,$scope.id);
        if(response)
            $window.location.reload();
    }
    
});