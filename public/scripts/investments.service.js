myApp.service('InvestmentService', function($http){

this.getSearchTicker=function(tickersymbol){
  console.log('Inside getSearchTicker',tickersymbol);
  return $http.get("/investments/searchticker/"+tickersymbol).then(function(response){
    console.log('getSearchTicker call successful',response.data);
    return response.data;
  }).catch(function(err){
  console.log("Error from API call for ticker price",err);
});
} // end of getSearchTicker

this.saveInvestmentData = function(formdata){
  console.log('Inside saveInvestmentData',formdata);
  return $http.post("/investments",formdata).catch(function(err){
  console.log("Error saving investment",err);
});
} // end of saveinvestmentData

this.getInvestmentList=function(){
  console.log('Inside getInvestmentList');
  return $http.get("/investments").then(function(response){
    console.log('getInvestmentList call successful',response.data);
    return response.data;
  }).catch(function(err){
  console.log("Error getting investment list",err);
});
} // end of getinvestmenList


this.setSellInvestment=function(data){
  console.log('Inside setSellInvestment',data);
  return $http.put("/investments",data).catch(function(err){
  console.log("Error deleting  investment from list",err);
});
} // end of setSellInvestment

});
