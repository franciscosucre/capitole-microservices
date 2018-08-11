var express = require('express');
var router = express.Router();
const Phone = require('../models/phones').model;

router.get('/', async function (req, res, next) {
  const list = await Phone.find(req.query)
  const count = await Phone.countDocuments(req.query)
  return res.send({
    list,
    count
  });
});

router.post('/', async function (req, res, next) {
  const phone = new Phone(req.body);
  await phone.save();

  return res.json({
    object: phone,
  });
});

router.put('/mark_as_sold', async function (req, res, next) {
  const phone_ids = req.body.phones;
  const phones = await Phone.find({
    _id: {
      $in: phone_ids
    }
  })
  await Phone.updateMany({_id: {
    $in: phone_ids
  }}, { sold: true } )

  return res.json({
    list: phones,
  });
});

router.put('/:id', async function (req, res, next) {
  const phone = Phone.findByIdAndUpdate(req.params.id);
  return res.json({
    object: phone,
  });
});

router.delete('/:id', async function (req, res, next) {
  const phone = Phone.findByIdAndRemove(req.params.id);

  return res.json({
    object: phone,
  });
});

module.exports = router;