const express = require('express');
const path = require('path');
const router = express.Router();

const Grievance = [
	"Pothole on Main Street",
	"Damaged Road Sign at Central Avenue",
	"Traffic Signal Out of Order at Oak Junction",
	"Flooding on Elm Road After Heavy Rain",
	"Cracked Pavement Near School Zone",
	"Unmarked Speed Bump on Pine Lane",
	"Construction Site Causing Traffic Blockage on River Road",
	"Street Light Out on Maple Avenue",
	"Poor Road Surface at Park Drive",
	"Dangerous Intersection at 5th and Highways"
];

router.get('/', (req, res) => {
  res.json(Grievance);
});

module.exports = router;
