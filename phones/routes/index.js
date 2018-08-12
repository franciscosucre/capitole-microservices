const express = require('express'),
  router = express.Router(),
  Phone = require('../models/phones').model;

router.get('/', async function (req, res, next) {
  /* We obtain the objects from the database, we use req.query so
  we can accept filter parameters in the url like ?sold=false */
  const list = await Phone.find(req.query)
  /* We obtain the number of elements found. Because list is a lazy
  query, we use count instead of the length of list */
  const count = await Phone.countDocuments(req.query)
  return res.status(200).send({
    list,
    count
  });
});

router.post('/', async function (req, res, next) {
  /* We create a phone using the data on the request */
  const phone = new Phone(req.body);
  /* We save it */
  await phone.save();
  return res.status(201).json({
    object: phone,
  });
});

router.put('/mark_as_sold', async function (req, res, next) {
  /* We obtain the phone ids from the request */
  const phone_ids = req.body.phones;
  /* We obtain the phones from the database */
  const phones = await Phone.find({
    _id: {
      $in: phone_ids
    }
  })
  /* We verify that we found all the phones requested */
  if (phones.length != phone_ids.length) {
    /* If not, we send an error message */
    return res.status(400).json({
      detail: "Some of the requested phones are not available",
    })
  }
  /* We update the sold status of the phones */
  await Phone.updateMany({
    _id: {
      $in: phone_ids
    }
  }, {
    sold: true
  })

  return res.status(200).json({
    list: phones,
  });
});

router.put('/:id', async function (req, res, next) {
  /* We find and update the phone with the id in the request */
  const phone = Phone.findByIdAndUpdate(req.params.id);
  return res.status(200).json({
    object: phone,
  });
});

router.delete('/:id', async function (req, res, next) {
  /* We find and remove the phone with the id in the request */
  const phone = Phone.findByIdAndRemove(req.params.id);
  return res.status(200).json({
    object: phone,
  });
});

module.exports = router;