myApp.service('HomeService', function($http){




this.getChartData=function(){
  console.log('Inside getChartData');
  return $http.get("/home").then(function(response){
    //console.log('getChartData call successful',response.data);
    return response.data;
  }).catch(function(err){
  console.log("Error getting chart data",err);
});
}; // end of getChartData



this.getTransactionList=function(){
  console.log('Inside getTransactionList');
  return $http.get("/home/transactions").then(function(response){
    console.log('getTransactionList call successful',response.data);
    return response.data;
  }).catch(function(err){
  console.log("Error getting list of transaction data",err);
});
}; // end of getTransactionList

});
