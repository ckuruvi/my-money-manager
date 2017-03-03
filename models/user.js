var pool = require("../db/connection");
var bcrypt = require("bcrypt");
var SALT_ROUNDS = 10;

// find by username
exports.findByUsername = function(username) {
    return query("SELECT * FROM users WHERE username = $1", [username])
        .then(function(users) {
            return users[0];
        })
        .catch(function(err) {
            console.log("Error finding user by username", err);
        });
};

// find by id
exports.findById = function(id) {
    return query("SELECT * FROM users WHERE id = $1", [id])
        .then(function(users) {
            return users[0];
        })
        .catch(function(err) {
            console.log("Error finding user by id", err);
        });
};

// compare password
// takes a username and a password, looks up the user by the given username
// and returns promise which resolves to a boolean indicating whether the
// passwords matched
exports.findAndComparePassword = function(username, password) {
    return exports.findByUsername(username).then(function(user) {
        return bcrypt
            .compare(password, user.password)
            .then(function(match) {
                return {
                    match: match,
                    user: user
                };
            })
            .catch(function(err) {
                return false;
            });
    });
};

exports.create = function(username, password, firstname, lastname) {
    return bcrypt
        .hash(password, SALT_ROUNDS)
        .then(function(hash) {
            return query(
                "INSERT INTO users (username, password,first_name,last_name) VALUES ($1, $2, $3, $4) RETURNING *", [username, hash, firstname, lastname]
            ).then(function(users) {
                return users[0];
            });
        })
        .catch(function(err) {
            console.log("Error creating user", err);
        });
};

exports.getIncomeCategoryList = function() {
    return query(
            "SELECT * FROM  income_category; "
        ).then(function(list) {
            return list;
        })
        .catch(function(err) {
            console.log("Error getting Income category list", err);
        });
}

// create new income
exports.createIncome = function(userid, category, amount, description, dateSelected) {
    return query(
            "INSERT INTO user_income (user_id,income_category_id,income_amount,income_desc,income_date) " +
            "VALUES ($1, $2, $3, $4,$5) RETURNING *", [userid, category, amount, description, dateSelected]
        ).then(function(income) {
            return income[0];
        })
        .catch(function(err) {
            console.log("Error creating Income", err);
        });
};


//get income list
exports.getIncomeList = function(userid) {
    return query(
            "SELECT u.id,income_category_name,income_amount,income_desc,income_date FROM  user_income u inner join" +
            " income_category c on u.income_category_id=c.id and u.user_id=$1 order by income_date desc; ", [userid]
        ).then(function(list) {
            return list;
        })
        .catch(function(err) {
            console.log("Error getting Income List", err);
        });
}

// delete income
exports.deleteIncome = function(id) {
    return query(
            "DELETE from user_income where id=$1 RETURNING *", [id]
        ).then(function(users) {
            return users[0];
        })
        .catch(function(err) {
            console.log("Error deleting  income", err);
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
//
