myApp.controller('IncomeController', function($http, $location,IncomeService){
console.log("IncomeCOntroller Loaded");

var ctrl=this;


ctrl.incomeList=function(){
 console.log('inside incomeList');
 IncomeService.getIncomeList().then(function(data){
   console.log("income list",data);
   ctrl.incomelist=data;
 });
} // end of incomeList

ctrl.incomeCategoryList=function(){
 IncomeService.getIncomeCategoryList().then(function(list){
   ctrl.categoryList=list;
 });
}; //end of incomeCategoryList

ctrl.incomeList();
ctrl.incomeCategoryList();

ctrl.saveIncome=function(formdata){
 console.log('inside saveIncome',formdata);
 IncomeService.saveIncomeData(formdata).then(function(){
   console.log('*********');
   ctrl.incomeList();
 });
}; // end of saveIncome



ctrl.deleteIncome=function(id){
 console.log('inside deleteIncome',id);
 IncomeService.setDeleteIncome(id).then(function(){
   ctrl.incomeList();
 });
} // end of deleteIncome



ctrl.reset=function(){
  console.log('inside reset ::');
}



//ctrl.categoryList=['salary','investments'];

});
