getAll = (req, res, next) => {
  // TODO: Can only parse one query at a time right now
  if (req.query.city) {
    req.models.Listing.find(
      {
        "location.city": req.query.city
      })
      .then((listings) => {
        return res.send(listings);
      }).catch((error) => next(error))
  }
  else if (req.query.type) {
    req.models.Listing.find(
      {
        type: req.query.type
      })
      .then((listings) => {
        return res.send(listings);
      }).catch((error) => next(error))
  }
  else if (req.query.max_price) {
    req.models.Listing.find(
      {
        price: { $lte: req.query.max_price }
      })
      .then((listings) => {
        return res.send(listings);
      }).catch((error) => next(error))
  }
  else {
    req.models.Listing.find()
      .then((listings) => {
        return res.send(listings);
      }).catch((error) => next(error))
  }
}

get = (req, res, next) => {
  req.models.Listing.findById(req.params.id)
    .then((listing) => {
      if (listing) {
        return res.status(200).send(listing);
      }
    }).catch((error) => next(error))
}

post = (req, res, next) => {
  req.models.Listing.create(req.body)
    .then((listing) => {
      if (listing) {
        return res.status(201).send(listing);
      }
    }).catch((error) => next(error))
}

put = (req, res, next) => {
  req.models.Listing.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        "coordinates.lng": req.body.coordinates ? req.body.coordinates.lng : undefined,
        "coordinates.lat": req.body.coordinates ? req.body.coordinates.lat : undefined,
        street: req.body.street ? req.body.street : undefined,
        "location.municipality": req.body.location ? req.body.location.municipality : undefined,
        "location.city": req.body.location ? req.body.location.city : undefined,
        type: req.body.type ? req.body.type : undefined,
        price: req.body.price ? req.body.price : undefined,
        monthly_fee: req.body.monthly_fee ? req.body.monthly_fee : undefined,
        active: req.body.active ? req.body.active : undefined
      }
    }
    , { omitUndefined: true })
    .then((listing) => {
      if (listing) {
        return res.status(200).send(listing);
      }
    }).catch((error) => next(error))
}

del = (req, res, next) => {
  req.models.Listing.findByIdAndDelete(req.params.id)
    .then((listing) => {
      if (listing) {
        return res.status(200).send(listing);
      }
    }).catch((error) => next(error))
}

module.exports = {
  getAll,
  get,
  post,
  put,
  del
}