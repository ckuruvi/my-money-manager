myApp.service('IncomeService', function($http){

  this.saveIncomeData = function(formdata){
    console.log('Inside saveIncomeData',formdata);
    return $http.post("/income",formdata).catch(function(err){
    console.log("Error saving income",err);
  });
} // end of saveIncomeData


this.getIncomeCategoryList=function(){
  console.log('Inside getIncomeCategoryList');
  return $http.get("/income/categorylist").then(function(response){
    console.log('getIncomeCategoryList call successful',response);
    return response.data;
  }).catch(function(err){
  console.log("Error getting income category list",err);
});
} // end of getIncomeCategoryList

this.getIncomeList=function(){
  console.log('Inside getIncomeList');
  return $http.get("/income").then(function(response){
    console.log('getIncomeList call successful',response.data);
    return response.data;
  }).catch(function(err){
  console.log("Error getting income list",err);
});
} // end of getIncomeCategoryList


this.setDeleteIncome=function(id){
  console.log('Inside setDeleteIncome',id);
  return $http.delete("/income/"+id).catch(function(err){
  console.log("Error deleting  income from list",err);
});
} // end of setDeleteIncome

});
