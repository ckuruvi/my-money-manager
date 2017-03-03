myApp.controller('InvestmentsController', function($http, $location, InvestmentService) {
    console.log("InvestmentsController Loaded");

    var ctrl = this;

    ctrl.logout = function() {
        $http.delete('/login').then(function() {
            console.log('Successfully logged out!');
            $location.path('/');
        }).catch(function(err) {
            console.log('Error logging out');
        });
    }

    ctrl.searchTicker = function(tickersymbol) {
        //console.log('inside searchTicker',tickersymbol);
        InvestmentService.getSearchTicker(tickersymbol).then(function(data) {
            ctrl.formdata.price = data;
        });
    }; // end of searchTicker

    ctrl.investmentList = function() {
        InvestmentService.getInvestmentList().then(function(data) {
            ctrl.investmentlist = data;
        });
    } // end of investmentList

    ctrl.investmentList();

    ctrl.saveInvestment = function(formdata) {
        InvestmentService.saveInvestmentData(formdata).then(function() {
            ctrl.investmentList();
        });
    }; // end of saveInvestment

    ctrl.sellInvestment = function(old_quantity, tddata) {
        tddata.old_quantity = old_quantity;
        InvestmentService.setSellInvestment(tddata).then(function() {
            ctrl.investmentList();
        });
    } // end of sellInvestment

    ctrl.updatePrice = function() {
        InvestmentService.setUpdatePrice().then(function() {
            ctrl.investmentList();
        });
    } // end of updatePrice

});
