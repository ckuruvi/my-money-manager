var router = require('express').Router();
var Charts = require('../models/charts');



router.get('/',function(req,res){
   Charts.getMonthYearList().then(function(list){
     console.log('getMonthYearList',list);
     res.send(list);
   }).catch(function(err){
      console.log('Error fetching  getMonthYearList');
     res.sendStatus(500);
    });
});


router.post('/',function(req,res){
  var chartData={};
  Charts.getIncomeData(req.user.id,req.body.month,req.body.year).then(function(incomeData){

    chartData.month=incomeData[0].month;
    chartData.year=incomeData[0].year;
    chartData.income=incomeData[0].income;

    Charts.getExpenseData(req.user.id,req.body.month,req.body.year).then(function(expenseData){

      chartData.expense=expenseData[0].expense;

      Charts.getInvestmentData(req.user.id,req.body.month,req.body.year).then(function(investmentData){

        chartData.investment=investmentData[0].investment;
        res.send(chartData);
      });
    });
  }).catch(function(err){
    console.log('Error fetching chart data');
    res.sendStatus(500);
  });
});

module.exports = router;
