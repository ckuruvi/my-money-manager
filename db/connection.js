var pg = require('pg');

var pool = new pg.Pool({
  database: 'money_manager'
});

module.exports = pool;
