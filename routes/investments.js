var router = require('express').Router();
var Investments = require('../models/investments');
var User = require('../models/user');
var googleFinance = require('google-finance');
var rp = require('request-promise');
var INCOME_CATEGORY=2; // investment category id from income_category table

//gets ticker price through external api call
router.get('/searchticker/',function(req,res){
  getPriceByTicker(req.query.ticker,req.query.date).then(function(quotes){
    res.send(quotes);
  });
});

// create new investment
router.post('/', function(req, res){
  Investments.createInvestment(req.user.id,req.body.ticker,req.body.name, req.body.quantity,
    req.body.price,req.body.price,req.body.purchasedate,0)
    .then(function(investment){
      res.sendStatus(201);
    }).catch(function(err){
      console.log('Error creating investment');
      res.sendStatus(500);
    });
  });

  // gets investment list to be displayed under investment history
  router.get('/',function(req,res){
    Investments.getinvestmentList(req.user.id).then(function(investmentList){
      res.send(investmentList);
    }).catch(function(err){
      console.log('Error fetching  investmentList');
      res.sendStatus(500);
    });
  });

 // calculates profit/lost from stock sale and makes an entry in the income table under investment category
  router.put('/',function(req,res){
    var salePriceAmt=req.body.quantity * req.body.current_price;
    var purchasePriceAmt=req.body.quantity * req.body.purchase_price;
    var income=Number(salePriceAmt-purchasePriceAmt).toFixed(2);
    User.createIncome(req.user.id,INCOME_CATEGORY,income,req.body.name,new Date()).then(function(){
      if(req.body.quantity==req.body.old_quantity){
        Investments.deleteInvestment(req.body.id).then(function(){
          res.sendStatus(204);
        })
      }else {
        var updatedQuantity=req.body.old_quantity-req.body.quantity;
        var updatedProfit=Number(updatedQuantity *(req.body.current_price-req.body.purchase_price)).toFixed(2);
        Investments.updateInvestment(req.body.id,updatedQuantity,updatedProfit).then(function(){
          res.sendStatus(204);
        })
      }
    }).catch(function(err){
      console.log('Error updating investment sell');
      res.sendStatus(500);
    });
  });

  //gets list of user investments from DB.
  router.put('/updateprice',function(req,res){
    Investments.getinvestmentList(req.user.id).then(function(investmentList){
      updatePrice(investmentList).then(function(response){
        console.log('updatePrice successful');
        res.sendStatus(204);
      });
    }).catch(function(err){
      console.log('Error fetching  investmentList');
      res.sendStatus(500);
    });
  });

  //Makes an external api call based on  ticker symbol to retrive close price from  previous trading day.
  // Calculates profit and makes an DB update for each investment.
  function updatePrice(list) {
    return new Promise(function(resolve, reject) {
      var date=getLastTradeDate();
      var count=0;
      list.forEach(function(obj){
        getPriceByTicker(obj.ticker_symbol,date).then(function(tickerPrice){
          var tickerData=JSON.parse(tickerPrice).dataset_data.data;
          if(tickerData.length>0){
            var purchaseAmt=obj.quantity * Number(obj.purchase_price).toFixed(2);
            var currentAmt=obj.quantity * tickerData[0][4];
            var profit=currentAmt - purchaseAmt;
            Investments.setUpdatePrice(obj.id,tickerData[0][4],profit);
          }
          count++;
          if(list.length<=count){resolve();}
        });
      });
    });
  }  // end of updatePrice function

  //if(sunday,monday) then last trade date is set to friday else last trade date set to previous day
  function getLastTradeDate(){
    var dt=new Date();
    var month=dt.getMonth()+1;
    if(month.length=1){
      month='0'+month;
    }
    var year=dt.getFullYear();
    var date=dt.getDate();
    var dayOfWeek=dt.getDay();
    if(dayOfWeek==1){
      date=date-3;
    }else if(dayOfWeek==0){
      date=date-2;
    }else {
      date=date-1;
    }
    return year+'-'+month+'-'+date;
  }

// external api call to get price
  function getPriceByTicker(ticker,date){
    return rp('https://www.quandl.com/api/v3/datasets/WIKI/'+ticker+'/data.json?api_key=sK64LyybZ5dz3sg37-Ac&start_date='+date)
    .then(function (quotes) {
      console.log('response from api call',quotes);
      return quotes;
    }).catch(function(err){
      console.log("error getting quote",err);
    });
  };

  // function getPriceByTicker(ticker,date){
  //     console.log("getPriceByTicker call",ticker,date);
  //      return googleFinance.historical({
  //           symbol: ticker,
  //           from: date
  //         }).then( function (quotes) {
  //           console.log('response from api call',quotes);
  //               return quotes;
  //         });
  // }

  module.exports = router;
