var router = require('express').Router();
var Charts = require('../models/charts');

//function to populate drop down list for transaction perod in the charts tab.
router.get('/', function(req, res) {
    Charts.getMonthYearList().then(function(list) {
        res.send(list);
    }).catch(function(err) {
        console.log('Error fetching  getMonthYearList');
        res.sendStatus(500);
    });
});

// function to retrieve income,expense & investment data for a transaction period
router.post('/', function(req, res) {
    var chartData = {};
    Charts.getIncomeData(req.user.id, req.body.month, req.body.year).then(function(incomeData) {
        chartData.month = incomeData[0].month;
        chartData.year = incomeData[0].year;
        chartData.income = incomeData[0].income;
        Charts.getExpenseData(req.user.id, req.body.month, req.body.year).then(function(expenseData) {
            chartData.expense = expenseData[0].expense;
            Charts.getInvestmentData(req.user.id, req.body.month, req.body.year).then(function(investmentData) {
                if (investmentData.length > 0) {
                    chartData.investment = investmentData[0].investment;
                } else {
                    chartData.investment = 0;
                }
                res.send(chartData);
            });
        });
    }).catch(function(err) {
        console.log('Error fetching chart data');
        res.sendStatus(500);
    });
}); // end of post call

module.exports = router;
