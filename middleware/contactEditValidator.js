const { check } = require("express-validator");

module.exports = [
  check("name")
    .isLength({ min: 3 })
    .withMessage("Nama minimal 3 karakter")
    .isString()
    .withMessage("Nama harus berupa string"),
  check("email").isEmail().withMessage("Email tidak valid"),
  check("phone").isMobilePhone("id-ID").withMessage("Format phone tidak valid"),
];
