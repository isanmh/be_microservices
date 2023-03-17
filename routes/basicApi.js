const express = require("express");
const basicController = require("../controllers/basicController");
const router = express.Router();

// route untuk api
// router.get("/", (req, res) => {
//   res.status(200).json({
//     message: "api berhasil diakses",
//   });
// });

// dari controller
router.get("/", basicController.index);
router.post("/", basicController.basic);

module.exports = router;
