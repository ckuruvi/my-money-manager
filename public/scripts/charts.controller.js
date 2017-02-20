myApp.controller('ChartsController', function($http, $location,ChartsService){
console.log("ChartsController Loaded");

  var ctrl=this;

  //this.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
  //this.data = [300, 500, 100];
   ctrl.monthYearList=function(){

ChartsService.getMonthYearList().then(function(list){
         console.log('month year list',list);
         ctrl.monthYearlist=list;

    });
}

   ctrl.chartData=function(){
     console.log(ctrl.monthyear)
   ChartsService.getChartData(ctrl.monthyear).then(function(obj){
      ctrl.displaydata=obj;
      var totalSavings=parseInt(obj.income)-(parseInt(obj.expense)+parseInt(obj.investment));
      ctrl.labels=['saving','expense','investment'];
      ctrl.data=[totalSavings,obj.expense,obj.investment];
      console.log(obj);
      console.log(ctrl.labels,ctrl.data);
     });
   }
   ctrl.monthYearList();
   ctrl.chartData();


});
