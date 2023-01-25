var app = angular.module('myApp');
app.factory('PostProductService', ["$http","$rootScope", function($http,$rootScope) {
     return {

          addProduct : async function(shopID,name,price ,description,condition,file1,file2 ,file3,file4) {
               const formData = new FormData();
               formData.append("shopID", shopID);
               formData.append("name", name);
               formData.append("price", price);
               formData.append("description", description);
               formData.append("condition", condition);
               formData.append("file1", file1);
               formData.append("file2", file2);
               formData.append("file3", file3);
               formData.append("file4", file4);
               // console.log(...formData)

               let response = await $http.post($rootScope.baseurl+'/createProduct',formData,{transformRequest: angular.identity,
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
     }
}]);