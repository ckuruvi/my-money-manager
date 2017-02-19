//angular.module('passportApp').controller('HomeController', function($http, $location){
myApp.controller('HomeController', function($http, $location,HomeService){

  console.log('inside HomeController');
  var ctrl=this;
  ctrl.logout = function() {
    $http.delete('/login').then(function(){
      console.log('Successfully logged out!');
      $location.path('/');
    }).catch(function(err){
      console.log('Error logging out');
    });
  }

//   ctrl.displayChart=function(){
//     console.log('inside displayChart function');
//     ctrl.colors = ['#45b7cd', '#ff6384', '#ff8e72'];
//
//     ctrl.labels = ['Aug', 'Sept', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'];
//     ctrl.data = [
//       [1000, 1200, 1400, 500, 1400, 1200, 2000],
//       [1800, 2000, 1500, 1800, 1900, 2100, 1600]
//     ];
//     ctrl.datasetOverride = [
//       {
//         label: "Line chart",
//         borderWidth: 1,
//         type: 'line'
//       },
//       {
//         label: "Line chart",
//         borderWidth: 3,
//         hoverBackgroundColor: "rgba(255,99,132,0.4)",
//         hoverBorderColor: "rgba(255,99,132,1)",
//         type: 'line'
//       }
//     ];
// }

ctrl.chartData=function(){

  HomeService.getChartData().then(function(chartList){
    console.log(chartList);
    var labels=[],income=[],expense=[];
    chartList.forEach(function(obj){
      labels.push(obj.month);
      expense.push(obj.expense);
      income.push(obj.income);
    });
    ctrl.labels=labels;
    ctrl.data=[income,expense];
    ctrl.series = ['Income', 'Expense'];
    //console.log(labels,income,expense);
  });
}

ctrl.transactionList=function(){
 console.log('inside transcationList function');
  HomeService.getTransactionList().then(function(list){

    ctrl.transactionlist=list;
  });
}

ctrl.displayChart=function(){

  //ctrl.labels = ["January", "February", "March", "April", "May", "June", "July"];
//  ctrl.series = ['Series A', 'Series B'];
  // ctrl.data = [
  //   [65, 59, 80, 81, 56, 55, 40],
  //   [28, 48, 40, 19, 86, 27, 90]
  // ];
  // ctrl.onClick = function (points, evt) {
  //   console.log(points, evt);
  // };
//  ctrl.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
  // ctrl.options = {
  //   scales: {
  //     yAxes: [
  //       {
  //         id: 'y-axis-1',
  //         type: 'linear',
  //         display: true,
  //         position: 'left'
  //       }
  //     ]
  //   }
  // };
}
ctrl.chartData();
ctrl.transactionList();
//ctrl.displayChart();

});
