myApp.service('ExpenseService', function($http){

  this.saveExpenseData = function(formdata){
    console.log('Inside saveExpenseData',formdata);
    return $http.post("/expense",formdata).catch(function(err){
    console.log("Error saving expense",err);
  });
} // end of saveexpenseData


this.getExpenseCategoryList=function(){
  console.log('Inside getExpenseCategoryList');
  return $http.get("/expense/categorylist").then(function(response){
    console.log('getExpenseCategoryList call successful',response);
    return response.data;
  }).catch(function(err){
  console.log("Error getting expense category list",err);
});
} // end of getExpenseCategoryList

this.getExpenseList=function(){
  console.log('Inside getExpenseList');
  return $http.get("/expense").then(function(response){
    console.log('getExpenseList call successful',response.data);
    return response.data;
  }).catch(function(err){
  console.log("Error getting expense list",err);
});
} // end of getExpenseCategoryList


this.setDeleteExpense=function(id){
  console.log('Inside setDeleteExpense',id);
  return $http.delete("/expense/"+id).catch(function(err){
  console.log("Error deleting  expense from list",err);
});
} // end of setDeleteExpense

});
