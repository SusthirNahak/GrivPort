const express = require("express");
const router = express.Router();

const grievanceGetRoutes = require('./GrievanceGet');
const stateGetRoutes = require('./StateGet');
const districtGetRoutes = require('./DistrictGet');
const blockGetRoutes = require('./BlockGet');
const gpGetRoutes = require('./GPGet');
const villageGetRoutes = require('./VillageGet');

router.use('/grievances', grievanceGetRoutes);
router.use('/states', stateGetRoutes);
router.use('/districts', districtGetRoutes);
router.use('/blocks', blockGetRoutes);
router.use('/gps', gpGetRoutes);
router.use('/villages', villageGetRoutes);


module.exports = router;