// Districts
const express = require('express');
const path = require('path');
const router = express.Router();
const fs = require("fs");


let districtData = [];
router.get("/", (req, res) => {
  const stateName = req.query.stateName;
  
  if (!stateName) {
	return res.status(400).json({ message: "stateName is required" });
  }

  fs.readFile(
	path.join(__dirname, "../../Public", "Districts.json"),
	"utf8",
	(err, data) => {
	  if (err) {
		console.error("Error reading JSON file:", err);
		return;
	  }
	  districtData = JSON.parse(data).filter(
		(data) => data.state === stateName
	  );

	  if (!districtData) {
		return res
		  .status(404)
		  .json({ message: `No districts found for state: ${stateName}` });
	  }

	  res.status(200).json(districtData);
	}
  );
});

module.exports = router;