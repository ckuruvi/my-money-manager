myApp.controller('InvestmentsController', function($http, $location,InvestmentService){
console.log("InvestmentsController Loaded");

var ctrl=this;


ctrl.optionList=[{value:'Buy'},{value:'Sell'}];

ctrl.logout = function() {
  $http.delete('/login').then(function(){
    console.log('Successfully logged out!');
    $location.path('/');
  }).catch(function(err){
    console.log('Error logging out');
  });
}

ctrl.searchTicker=function(tickersymbol){
 console.log('inside searchTicker',tickersymbol);
 //'2017-02-16'
 // var dt=new Date();
 // console.log('date',dt.getDate(),dt.getMonth()+1,dt.getFullYear(),dt.getDay());
 InvestmentService.getSearchTicker(tickersymbol).then(function(data){
  console.log('response from ticker search',data);
  ctrl.formdata.ticker=data[0].symbol;
  ctrl.formdata.price=data[0].close;
 });
}; // end of searchTicker


ctrl.investmentList=function(){
 console.log('inside investmentList');
 InvestmentService.getInvestmentList().then(function(data){
   console.log("investment list",data);
   ctrl.investmentlist=data;
 });
} // end of investmentList

ctrl.investmentList();



ctrl.saveInvestment=function(formdata){
  console.log('inside saveInvestment',formdata);

    InvestmentService.saveInvestmentData(formdata).then(function(){
      ctrl.investmentList();
    });
}; // end of saveInvestment

ctrl.sellInvestment=function(old_quantity,tddata){
   tddata.old_quantity=old_quantity;
 console.log('inside sellInvestment',tddata);
 InvestmentService.setSellInvestment(tddata).then(function(){
  ctrl.investmentList();
 });
} // end of sellInvestment

});
