myApp.service('ChartsService', function($http){


  var month_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep",
  "Oct", "Nov", "Dec");


this.getMonthYearList=function(){
  return $http.get("/charts").then(function(response){
    console.log('getMonthYearList call successful',response);
    return response.data;
  }).catch(function(err){
  console.log("Error getting getMonthYearList",err);
});
}

this.getChartData=function(tranPeriod){
  console.log('Inside getChartData',tranPeriod);
  if(tranPeriod=="" || tranPeriod==undefined){
    console.log('inside if loop getChartData');
    var currentDate=new Date();
    transMonth=month_names[currentDate.getMonth()];
    transYear=currentDate.getFullYear();
    tranPeriod={month:transMonth,year:transYear};
  }
  console.log(tranPeriod);
  return $http.post("/charts",tranPeriod).then(function(response){
    console.log('getChartData call successful',response);
    return response.data;
  }).catch(function(err){
  console.log("Error getting charts data",err);
});
} // end of getChartData


});
