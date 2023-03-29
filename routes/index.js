var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

var rider_num = 12;

router.post('/rider_number', function (req, res, next) {
  let receive_info = req.body.send_info;
  // console.log(receive_info);
  rider_num = receive_info;
  // console.log(req.body.send_info);
  console.log(rider_num);
  res.sendStatus(200);
});

router.post('/send_rider_number', function (req, res, next) {
  console.log(rider_num);
  res.send(JSON.stringify(rider_num));
  // res.Status(200).send(rider_num);
});

module.exports = router;
