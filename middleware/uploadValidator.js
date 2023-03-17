const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    const filename = file.originalname.split(" ").join("-");
    cb(null, Date.now() + "-" + filename);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 3000000 },
  fileFilter: (req, file, cb) => {
    const filetype = /jpeg|jpg|png|gif|svg/;
    if (filetype.test(file.originalname.split(".").pop())) {
      cb(null, true);
    } else {
      cb(null, false);
      cb(new Error("File yang boleh di upload hanya jpg, png, gif, svg"));
    }
  },
});

module.exports = upload;
