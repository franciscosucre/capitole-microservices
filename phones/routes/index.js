var express = require('express');
var router = express.Router();
const Phone = require('../models/phones').model;

router.get('/', async function(req, res, next) {
  const list = await Phone.find()
    return res.send(list);
});

module.exports = router;
