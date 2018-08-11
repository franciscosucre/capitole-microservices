var express = require('express');
var router = express.Router();
const PhoneModel = require('../models/phoneModel').model;

router.get('/', async function (req, res, next) {
    const list = await PhoneModel.find()
    return res.send(list);
});

module.exports = router;