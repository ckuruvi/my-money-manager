var router = require('express').Router();
var Home = require('../models/home');


var incomeList=[];

router.get('/',function(req,res){
   Home.getIncomeList().then(function(list){
   incomeList=list;
   Home.getExpenseList().then(function(expenseList){
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


router.get('/transactions',function(req,res){
   Home.getTransactionList().then(function(transactionslist){
    res.send(transactionslist);
  }).catch(function(err){
      console.log('Error fetching  transactions list');
      res.sendStatus(500);
  });
});

module.exports = router;
