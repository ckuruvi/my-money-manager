var router = require('express').Router();
var Investments = require('../models/investments');
var User = require('../models/user');
var googleFinance = require('google-finance');
//var request = require('request');
var rp = require('request-promise');
var INCOME_CATEGORY=2;


router.get('/searchticker/',function(req,res){
//console.log('inside route get ',req.query.date,req.query.ticker);
          getPriceByTicker(req.query.ticker,req.query.date).then(function(quotes){
            res.send(quotes);
          });
});




// create new investment
router.post('/', function(req, res){
  console.log('inside routes > investment post > req.user.id :: ',req.user.id);
  Investments.createInvestment(req.user.id,req.body.ticker,req.body.name, req.body.quantity,
      req.body.price,req.body.price,req.body.purchasedate,0)
    .then(function(investment){
      console.log('Created new investment');
      res.sendStatus(201);
    }).catch(function(err){
    console.log('Error creating investment');
    res.sendStatus(500);
  });
});



router.get('/',function(req,res){
   Investments.getinvestmentList(req.user.id).then(function(investmentList){
     console.log('investmentList',investmentList);
     res.send(investmentList);
   }).catch(function(err){
      console.log('Error fetching  investmentList');
     res.sendStatus(500);
    });
});



router.put('/',function(req,res){
  //console.log(req.user.id, req.body,new Date());
    var salePriceAmt=req.body.quantity * req.body.current_price;
    var purchasePriceAmt=req.body.quantity * req.body.purchase_price;
    var income=Number(salePriceAmt-purchasePriceAmt).toFixed(2);
    console.log("calculation of income",salePriceAmt,purchasePriceAmt,income);
      //userid,category,amount,description,dateSelected
      User.createIncome(req.user.id,INCOME_CATEGORY,income,req.body.name,new Date()).then(function(){
        if(req.body.quantity==req.body.old_quantity){
          Investments.deleteInvestment(req.body.id).then(function(){
            res.sendStatus(204);
          })
        }else {
          var updatedQuantity=req.body.old_quantity-req.body.quantity;
          var updatedProfit=Number(updatedQuantity *(req.body.current_price-req.body.purchase_price)).toFixed(2);
          console.log("inside update call",req.body.id,updatedQuantity,updatedProfit);
          Investments.updateInvestment(req.body.id,updatedQuantity,updatedProfit).then(function(){
            res.sendStatus(204);
          })
        }
      }).catch(function(err){
          console.log('Error updating investment sell');
         res.sendStatus(500);
      });
});



router.put('/updateprice',function(req,res){

   Investments.getinvestmentList(req.user.id).then(function(investmentList){
     console.log('investmentList',investmentList);
    updatePrice(investmentList).then(function(response){
      console.log('updatePrice successful');
      res.sendStatus(204);
    });
   }).catch(function(err){
      console.log('Error fetching  investmentList');
     res.sendStatus(500);
    });
});

function updatePrice(list) {
  return new Promise(function(resolve, reject) {
    var date=getLastTradeDate();
    var count=0;
    list.forEach(function(obj){
     getPriceByTicker(obj.ticker_symbol,date).then(function(tickerPrice){
       console.log('*tickerPrice*',tickerPrice);
       console.log("jason parsed ",JSON.parse(tickerPrice).dataset_data.data);
       var tickerData=JSON.parse(tickerPrice).dataset_data.data;
      //console.log('*datalength*',JSON.parse(tickerPrice).dataset_data.data.length);
       if(tickerData.length>0){
      //  if(tickerPrice.dataset_data.data.length<0){
       var purchaseAmt=obj.quantity * Number(obj.purchase_price).toFixed(2);
       console.log("purchaseAmt",purchaseAmt,tickerData[0][4]);
       var currentAmt=obj.quantity * tickerData[0][4];
       //console.log("purchaseAmt & currentAmt ::",purchaseAmt,currentAmt);
       var profit=currentAmt - purchaseAmt;
       Investments.setUpdatePrice(obj.id,tickerData[0][4],profit);
       }
       count++;
       console.log("***count***",count);
       if(list.length<=count){resolve();}
     });
    });

  });
}  // end of updatePrice function


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

function getPriceByTicker(ticker,date){
  return rp('https://www.quandl.com/api/v3/datasets/WIKI/'+ticker+'/data.json?api_key=sK64LyybZ5dz3sg37-Ac&start_date='+date)
      .then(function (quotes) {
        console.log('response from api call',quotes);
         return quotes;
      }).catch(function(err){
        console.log("error getting quote",err);
      });
};


module.exports = router;
