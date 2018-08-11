const express = require('express'),
  router = express.Router(),
  Order = require('../models/orders').model,
  axios = require('axios');

router.get('/', async function (req, res, next) {
  const list = await Order.find(req.query)
  const count = await Order.countDocuments(req.query)
  return res.send({
    list,
    count
  });
});

router.post('/', async function (req, res, next) {
  const client = {
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
  }
  const phone_ids = req.body.phones;
  const response = await axios.get('http://phones:3001/?sold=false');
  const catalog = response.data.list;
  const phones = catalog.filter(phone => phone_ids.includes(phone._id));

  if (phones.length != phone_ids.length) {
    return res.json({
      detail: "Some of the requested phones are not available",
    })
  }

  const total = phones.reduce(function (oldValue, newValue) {
    return oldValue + newValue.price;
  }, 0);

  const order = new Order({
    client:client,
    phones:phones,
    total:total
  })
  await order.save()
  
  await axios.put('http://phones:3001/mark_as_sold', {
    phones : phone_ids
  });

  return res.json({
    object:order
  });
});


module.exports = router;