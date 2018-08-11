var express = require('express');
var router = express.Router();
const Phone = require('../models/phones').model;

router.get('/', async function(req, res, next) {
  const list = await Phone.find(req.query)
  const count = await Phone.count(req.query)
    return res.send({
      list,
      count
    });
});

module.exports = router;
