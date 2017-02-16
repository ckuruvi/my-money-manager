const router = require('express').Router();
var passport = require('passport');

router.post('/', passport.authenticate('local'), function(req, res){
  console.log('************************');
  console.log('inside login post router::',req.user.id);
  console.log('***********************');
  res.sendStatus(200);
  //res.send({userid:req.user.id});
});

router.delete('/', function(req, res){
  req.logout();
  res.sendStatus(204);
});

module.exports = router;
