var express = require('express');
var router = express.Router();
const Order = require('../models/orders').model;

router.get('/', async function(req, res, next) {
  const list = await Order.find()
    return res.send(list);
});

module.exports = router;
