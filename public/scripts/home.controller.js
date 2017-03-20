myApp.controller('HomeController', function($http, $location, HomeService) {

    console.log('inside HomeController');
    var ctrl = this;
    ctrl.logout = function() {
        $http.delete('/login').then(function() {
            $location.path('/');
        }).catch(function(err) {
            console.log('Error logging out');
        });
    } // end of logout function

    ctrl.chartData = function() {
        HomeService.getChartData().then(function(chartList) {
            var labels = [],
                income = [],
                expense = [];
            chartList.forEach(function(obj) {
                labels.unshift(monthNames[parseInt(obj.month) - 1]);
                expense.unshift(obj.expense);
                income.unshift(obj.income);
            });
            ctrl.labels = labels;
            ctrl.data = [income, expense];
            ctrl.series = ['Income', 'Expense'];
            ctrl.options = {
                legend: {
                    display: true,
                    labels: {
                        fontFamily: 'Satisfy'
                    }
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            display: false
                        },
                        ticks: {
                            fontFamily: 'Satisfy',
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            display: false
                        },
                        ticks: {
                            fontFamily: 'Satisfy',
                        }
                    }]
                },
                tooltips: {
                    titleFontFamily: 'Satisfy',
                    bodyFontFamily: 'Satisfy'
                }
            };
        });
    } // end of chartData function

    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    ctrl.transactionList = function() {
        HomeService.getTransactionList().then(function(list) {
            ctrl.transactionlist = list;
        });
    } // end of transactionList function

    ctrl.chartData();
    ctrl.transactionList();
});
