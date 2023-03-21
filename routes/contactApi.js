const express = require("express");
const contactApiController = require("../controllers/contactApiController");
const contactEditValidator = require("../middleware/contactEditValidator");
const contactValidator = require("../middleware/contactValidator");
const upload = require("../middleware/uploadValidator");
const router = express.Router();

router.get("/", contactApiController.index);
router.post(
  "/",
  contactValidator,
  // upload.single("image"),
  contactApiController.store
);
router.get("/:id", contactApiController.show);
router.put(
  "/:id",
  // upload.single("image"),
  contactEditValidator,
  contactApiController.update
);
router.delete("/:id", contactApiController.destroy);
// unttuk test upload
router.post("/upload", upload.single("image"), (req, res) => {
  try {
    res.json({
      message: "Upload success",
      data: {
        filename: req.file.filename,
        originalname: req.file.originalname,
        size: req.file.size,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Upload failed",
      data: {
        error: error.message,
      },
    });
  }
});

module.exports = router;
