myApp.service('InvestmentService', function($http){

this.getSearchTicker=function(tickersymbol){
  console.log('Inside getSearchTicker',tickersymbol);
  var getDate=getLastTradeDate();
  return $http.get("/investments/searchticker/",{params:{ date:getDate,ticker:tickersymbol}}).then(function(response){
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



this.setUpdatePrice=function(){
  console.log('Inside setUpdatePrice');
  return $http.put("/investments/updateprice").catch(function(err){
  console.log("Error deleting  investment from list",err);
});
} // end of setUpdatePrice


function getLastTradeDate(){
  var dt=new Date();
  var month=dt.getMonth()+1;
  if(month.length=1){
    month='0'+month;
  }
  var year=dt.getFullYear();
  var date=dt.getDate();
  var dayOfWeek=dt.getDay();
  if(dayOfWeek==1){
    date=date-3;
  }else if(dayOfWeek==0){
    date=date-2;
  }else {
    date=date-1;
  }
  console.log("*****",date);
  console.log('date****',year+'-'+month+'-'+date);
  return year+'-'+month+'-'+date;
}

});
