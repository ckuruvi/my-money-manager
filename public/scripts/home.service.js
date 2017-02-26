myApp.service('HomeService', function($http){

  this.getChartData=function(){
    return $http.get("/home").then(function(response){
      return response.data;
    }).catch(function(err){
      console.log("Error getting chart data",err);
    });
  }; // end of getChartData

  this.getTransactionList=function(){
    return $http.get("/home/transactions").then(function(response){
      return response.data;
    }).catch(function(err){
      console.log("Error getting list of transaction data",err);
    });
  }; // end of getTransactionList

});
