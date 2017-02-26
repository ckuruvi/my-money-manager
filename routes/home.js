var router = require('express').Router();
var Home = require('../models/home');
var incomeList=[];

// retrieves monthly income and expense for last 6 months to be used as input for the line chart
router.get('/',function(req,res){
  Home.getIncomeList(req.user.id).then(function(list){
    incomeList=list;
    Home.getExpenseList(req.user.id).then(function(expenseList){
      expenseList.forEach(function(expenseObj){
        incomeList.find(function(incomeObj){
          if(expenseObj.month==incomeObj.month){
            expenseObj.income=incomeObj.income;
          }
        });
      });
      res.send(expenseList);
    });
  }).catch(function(err){
    console.log('Error fetching  chart list');
    res.sendStatus(500);
  });
});

// retrieves latest five transactions from a union of income, expense & investments data
router.get('/transactions',function(req,res){
  Home.getTransactionList(req.user.id).then(function(transactionslist){
    res.send(transactionslist);
  }).catch(function(err){
    console.log('Error fetching  transactions list');
    res.sendStatus(500);
  });
});

module.exports = router;
