
const express = require('express');
const path = require('path');
const router = express.Router();
const fs = require("fs");


// GPs
let GPData = [];
router.get("/", (req, res) => {
  const { stateName, districtName, blockName } = req.query;
  if (!stateName && !districtName && !blockName) {
    return res
      .status(400)
      .json({ message: "StateName, DistrictName & BlockName is required" });
  }

  fs.readFile(
    path.join(__dirname, "../../Public", "GPs.json"),
    "utf8",
    (err, data) => {
      if (err) {
        console.error("Error reading JSON file:", err);
        return;
      }

      const state = JSON.parse(data)?.state;
      if (
        !state ||
        state?.state_name?.toLowerCase() !== stateName?.toLowerCase()
      ) {
        return res.status(404).json({ error: "State not found" });
      }

      const district = state?.districts?.find(
        (d) => d?.district_name?.toLowerCase() === districtName?.toLowerCase()
      );
      if (!district) {
        return res.status(404).json({ error: "District not found" });
      }

      const block = district?.blocks?.find(
        (b) => b?.block_name?.toLowerCase() === blockName?.toLowerCase()
      );
      if (!block) {
        return res.status(404).json({ error: "Block not found" });
      }

      GPData = {
        state: state?.state_name,
        district: district?.district_name,
        block: block?.block_name,
        gram_panchayats: block?.gram_panchayats || [],
      };

      if (!GPData) {
        return res.status(404).json({
          message: `No Grama Panchayata found for Block: ${blockName}`,
        });
      }

      res.status(200).json(GPData);
    }
  );
});

module.exports = router;