myApp.controller('ChartsController', function($http, $location,ChartsService){
  console.log("ChartsController Loaded");

  var ctrl=this;
  ctrl.logout = function() {
    $http.delete('/login').then(function(){
      $location.path('/');
    }).catch(function(err){
      console.log('Error logging out');
    });
  }


  ctrl.monthYearList=function(){
    ChartsService.getMonthYearList().then(function(list){
      ctrl.monthYearlist=list;
    });
  }

  ctrl.chartData=function(){
    ChartsService.getChartData(ctrl.monthyear).then(function(obj){
      ctrl.displaydata=obj;
      var totalSavings=parseInt(obj.income)-(parseInt(obj.expense)+parseInt(obj.investment));
      ctrl.labels=['saving','expense','investment'];
      ctrl.data=[totalSavings,obj.expense,obj.investment];
      ctrl.options={ legend:
        { display: true,
          labels: {
            fontFamily:'Satisfy'
          }
        },
        tooltips:{
          titleFontFamily:'Satisfy',
          bodyFontFamily:'Satisfy'
        }};
      });
    } // end of chartData function
    
    ctrl.monthYearList();
    ctrl.chartData();
  });
