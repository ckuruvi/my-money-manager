var pool = require("../db/connection");

var CONSTANT_VAL=0;


exports.getinvestmentList=function(id){
  return query(
    "SELECT * FROM  user_holding where user_id=$1; ",
    [id]
  ).then(function(list) {
    return list;
  })
.catch(function(err) {
  console.log("Error getting user holding list", err);
});
}

// create new expense
exports.createInvestment=function(userid,ticker,name,quantity,pruchaseprice,currentprice,purchasedate,CONSTANT_VAL){
  return query(
    "INSERT INTO user_holding(user_id,ticker_symbol,name,quantity,purchase_price,current_price,purchase_date,current_profit) "+
    "VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",
    [userid,ticker,name,quantity,pruchaseprice,currentprice,purchasedate,CONSTANT_VAL]
  ).then(function(expense) {
    return expense[0];
  })
.catch(function(err) {
  console.log("Error creating expense", err);
});
};

// undate investment
exports.updateInvestment = function(id,quantity,profit) {
        console.log("inside model updateInvestment ",id,quantity,profit);
      return query(
        "UPDATE user_holding SET quantity=$2,current_profit=$3 WHERE id=$1 RETURNING *",
        [ id,quantity,profit ]
      ).then(function(holding) {
        return holding[0];
      })
    .catch(function(err) {
      console.log("Error updating investment", err);
    });
};

// delete investment
exports.deleteInvestment = function(id) {
      return query(
        "DELETE FROM user_holding WHERE id=$1 RETURNING *",
        [ id ]
      ).then(function(holding) {
        return holding[0];
      })
    .catch(function(err) {
      console.log("Error deleting  investment", err);
    });
};



// undate current price & profit
exports.setUpdatePrice = function(id,price,profit) {
      return query(
        "UPDATE user_holding SET current_price=$2,current_profit=$3 WHERE id=$1 RETURNING *",
        [ id,price,profit]
      ).then(function(holding) {
        return holding[0];
      })
    .catch(function(err) {
      console.log("Error updating investment", err);
    });
};


function query(sqlString, data) {
  return new Promise(function(resolve, reject) {
    pool.connect(function(err, client, done) {
      try {
        if (err) {
          return reject(err);
        }

        client.query(sqlString, data, function(err, result) {
          if (err) {
            return reject(err);
          }

          resolve(result.rows);
        });
      } finally {
        done();
      }
    });
  });
}
