
const express = require('express');
const path = require('path');
const router = express.Router();
const fs = require("fs");


// Blocks
let blockData = [];
router.get("/", (req, res) => {
  const districtName = req.query.districtName;
  // console.log("districtName: ", districtName);
  if (!districtName) {
    return res.status(400).json({ message: "DistrictName is required" });
  }

  fs.readFile(
    path.join(__dirname, "../../Public", "Blocks.json"),
    "utf8",
    (err, data) => {
      if (err) {
        console.error("Error reading JSON file:", err);
        return;
      }
      blockData = JSON.parse(data).Odisha.district_select.filter(
        (data) => data.name.toLowerCase() === districtName.toLowerCase()
      );
      // blockData = JSON.parse(data).filter((data) => data.state === blockName);
      // const districts = districtData.filter((data) => data.state === stateName);
      // console.log(blockData);

      if (!blockData) {
        return res
          .status(404)
          .json({ message: `No districts found for state: ${districtName}` });
      }

      res.status(200).json(blockData);
    }
  );
});

module.exports = router;