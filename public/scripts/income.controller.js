myApp.controller('IncomeController', function($http, $location, IncomeService) {
    console.log("IncomeCOntroller Loaded");

    var ctrl = this;
    ctrl.incomeList = function() {
        IncomeService.getIncomeList().then(function(data) {
            //console.log("income list",data);
            ctrl.incomelist = data;
        });
    } // end of incomeList

    ctrl.incomeCategoryList = function() {
        IncomeService.getIncomeCategoryList().then(function(list) {
            ctrl.categoryList = list;
        });
    }; //end of incomeCategoryList

    ctrl.incomeList();
    ctrl.incomeCategoryList();

    ctrl.saveIncome = function(formdata) {
        IncomeService.saveIncomeData(formdata).then(function() {
            ctrl.incomeList();
        });
    }; // end of saveIncome

    ctrl.deleteIncome = function(id) {
        IncomeService.setDeleteIncome(id).then(function() {
            ctrl.incomeList();
        });
    } // end of deleteIncome

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
