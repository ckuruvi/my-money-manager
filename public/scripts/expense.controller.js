myApp.controller('ExpenseController', function($http, $location, ExpenseService) {
    console.log("ExpenseController Loaded");

    var ctrl = this;
    ctrl.expenseList = function() {
        ExpenseService.getExpenseList().then(function(data) {
            console.log("expense list", data);
            ctrl.expenselist = data;
        });
    } // end of expenseList

    ctrl.expenseCategoryList = function() {
        ExpenseService.getExpenseCategoryList().then(function(list) {
            ctrl.categoryList = list;
        });
    }; //end of expenseCategoryList

    ctrl.expenseList();
    ctrl.expenseCategoryList();

    ctrl.saveExpense = function(formdata) {
        ExpenseService.saveExpenseData(formdata).then(function() {
            ctrl.expenseList();
        });
    }; // end of saveExpense

    ctrl.deleteExpense = function(id) {
        ExpenseService.setDeleteExpense(id).then(function() {
            ctrl.expenseList();
        });
    } // end of deleteExpense

    ctrl.reset = function() {
        console.log('inside reset ::');
    }

    ctrl.logout = function() {
        $http.delete('/login').then(function() {
            $location.path('/');
        }).catch(function(err) {
            console.log('Error logging out');
        });
    }
});
