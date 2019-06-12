const express = require('express');
const router = express.Router();

const listing = require('./listing.js');

router.get("/listings", listing.getAll);
router.get("/listing/:id", listing.get);
router.post("/listing", listing.post);
router.put("/listing/:id", listing.put);
router.delete("/listing/:id", listing.del);

module.exports = router;