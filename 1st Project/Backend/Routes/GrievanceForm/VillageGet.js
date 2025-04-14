
const express = require('express');
const path = require('path');
const router = express.Router();
const fs = require("fs");

// Villages
let villageData = [];
router.get("/", (req, res) => {
  const { stateName, districtName, blockName, gpName } = req.query;
  console.log("blockName: ", stateName, districtName, blockName, gpName);
  if (!stateName && !districtName && !blockName && !gpName) {
    return res
      .status(400)
      .json({
        message:
          "StateName, DistrictName, BlockName & Grama Panchayata Name is required",
      });
  }

  fs.readFile(
    path.join(__dirname, "../../Public", "All.json"),
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

      const gp = block?.gram_panchayats?.find(
        (g) => g?.gram_panchayat_name?.toLowerCase() === gpName?.toLowerCase()
      );
      if (!gp) {
        return res.status(404).json({ error: "Grama Panchayata not found" });
      }

      villageData = {
        state: state?.state_name,
        district: district?.district_name,
        block: block?.block_name,
        gram_panchayat: gp?.gram_panchayat_name,
        villages: gp?.villages || []
      };

      // console.log(GPData);

      if (!villageData) {
        return res.status(404).json({
          message: `No Villages found for Grama Panchayata : ${gpName}`,
        });
      }

      res.status(200).json(villageData);
    }
  );
});

module.exports = router;