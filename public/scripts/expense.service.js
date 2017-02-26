myApp.service('ExpenseService', function($http){

  this.saveExpenseData = function(formdata){
    return $http.post("/expense",formdata).catch(function(err){
      console.log("Error saving expense",err);
    });
  } // end of saveexpenseData

  this.getExpenseCategoryList=function(){
    return $http.get("/expense/categorylist").then(function(response){
      return response.data;
    }).catch(function(err){
      console.log("Error getting expense category list",err);
    });
  } // end of getExpenseCategoryList

  this.getExpenseList=function(){
    return $http.get("/expense").then(function(response){
      return response.data;
    }).catch(function(err){
      console.log("Error getting expense list",err);
    });
  } // end of getExpenseCategoryList

  this.setDeleteExpense=function(id){
    return $http.delete("/expense/"+id).catch(function(err){
      console.log("Error deleting  expense from list",err);
    });
  } // end of setDeleteExpense

});
