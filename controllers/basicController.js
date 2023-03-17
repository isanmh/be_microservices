module.exports = {
  index: (req, res) => {
    res.json({
      message: "api berhasil diakses dari controller",
    });
  },
  basic: (req, res) => {
    res.status(201).json({
      message: "ini menggunakan request post",
    });
  },
};
