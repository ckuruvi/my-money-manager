var router = require('express').Router();
var User = require('../models/user');


// create new income
router.post('/', function(req, res){
  console.log('inside routes > income post > req.user.id :: ',req.user.id);
  User.createIncome(req.user.id,req.body.category,req.body.amount, req.body.description,  req.body.dateSelected)
    .then(function(income){
      console.log('Created new Income');
      res.sendStatus(201);
    }).catch(function(err){
    console.log('Error creating Income');
    res.sendStatus(500);
  });
});

router.get('/categorylist',function(req,res){
   User.getIncomeCategoryList().then(function(incomeCategoryList){
     console.log('incomeList',incomeCategoryList);
     res.send(incomeCategoryList);
   }).catch(function(err){
      console.log('Error fetching  incomeCategoryList');
     res.sendStatus(500);
    });
});

router.get('/',function(req,res){
   User.getIncomeList(req.user.id).then(function(incomeList){
     console.log('incomeList',incomeList);
     res.send(incomeList);
   }).catch(function(err){
      console.log('Error fetching  incomeList');
     res.sendStatus(500);
    });
});

router.delete('/:id',function(req,res){
   User.deleteIncome(req.params.id).then(function(){
     res.sendStatus(204);
   }).catch(function(err){
      console.log('Error deleting income form list');
     res.sendStatus(500);
    });
});

module.exports = router;
