const express = require('express');
const router = express.Router();
const auth = require('../auth');
const travelService = require('../services/travel');

router.post('/addTravel', auth.authenticate, auth.isAdmin, travelService.addTravel);
router.get('/', travelService.vratiTravels);
router.get('/:id', travelService.vratiTravelId);
router.delete('/:id', auth.authenticate, auth.isAdmin, travelService.deleteTravel);
router.post('/odaberi/:id', auth.authenticate, travelService.odabirTravel);

module.exports = router;