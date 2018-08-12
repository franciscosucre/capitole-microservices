const express = require('express'),
  router = express.Router(),
  Order = require('../models/orders').model,
  axios = require('axios');

router.get('/', async function (req, res, next) {
  /* We obtain the objects from the database, we use req.query so
  we can accept filter parameters in the url like ?sold=false */
  const list = await Order.find(req.query)
  /* We obtain the number of elements found. Because list is a lazy
  query, we use count instead of the length of list */
  const count = await Order.countDocuments(req.query)
  return res.status(200).send({
    list,
    count
  });
});

router.post('/', async function (req, res, next) {
  /* We obtain the client information from the request */
  const client = {
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
  }
  /* We obtain the phone ids list from the request */
  const phone_ids = req.body.phones;
  /* We obtain the phone catalog from the other microservice */
  const response = await axios.get('http://phones:3001/?sold=false');
  const catalog = response.data.list;
  /* We obtain the phones whose id is included in the phone id list of
  the request */
  const phones = catalog.filter(phone => phone_ids.includes(phone._id));
  /* We verify that we found all the phones requested */
  if (phones.length != phone_ids.length) {
    /* If not, we send an error message */
    return res.status(400).json({
      detail: "Some of the requested phones are not available",
    })
  }
  /* We calculate the total price of the order */
  const total = phones.reduce(function (oldValue, newValue) {
    return oldValue + newValue.price;
  }, 0);
  /* We create the order */
  const order = new Order({
    client:client,
    phones:phones,
    total:total
  })
  await order.save()
  /* We call the other microservice to mark the phones as sold */
  await axios.put('http://phones:3001/mark_as_sold', {
    phones : phone_ids
  });
  /* As requested in the code challenge, the final order is sent 
  to the console */
  console.log("The order is: ", order)

  return res.status(200).json({
    object:order
  });
});


module.exports = router;