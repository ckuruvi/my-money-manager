myApp.service('ChartsService', function($http){

  var month_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep",
  "Oct", "Nov", "Dec");

  this.getMonthYearList=function(){
    return $http.get("/charts").then(function(response){
      return response.data;
    }).catch(function(err){
      console.log("Error getting getMonthYearList",err);
    });
  }

  this.getChartData=function(tranPeriod){
    if(tranPeriod=="" || tranPeriod==undefined){
      var currentDate=new Date();
      transMonth=month_names[currentDate.getMonth()];
      transYear=currentDate.getFullYear();
      tranPeriod={month:transMonth,year:transYear};
    }
    return $http.post("/charts",tranPeriod).then(function(response){
      return response.data;
    }).catch(function(err){
      console.log("Error getting charts data",err);
    });
  } // end of getChartData
});
