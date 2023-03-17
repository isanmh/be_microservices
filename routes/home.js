const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  // res.send("root page");
  res.render("index", {
    layout: "layouts/main-layout",
  });
});

router.get("/about", (req, res) => {
  // res.json({
  //   msg: "About page",
  //   nama: "Ihsan Miftahul Huda",
  //   job: "Fullstack Developer",
  //   alamat: "Jl. Raya Cibaduyut No. 1",
  // });
  const pegawai = [
    {
      nama: "Ihsan Miftahul Huda",
      job: "Fullstack Developer",
      phone: "08123456789",
    },
    {
      nama: "Rine",
      job: "UI/UX",
      phone: "08123456789",
    },
    {
      nama: "Asep",
      job: "DevOps",
      phone: "08123456789",
    },
  ];

  res.render("about", {
    layout: "layouts/main-layout",
    data: pegawai,
  });
});

router.get("/services", (req, res) => {
  // res.sendFile("services.html", { root: "./views" });
  res.render("services", {
    judul: "Halaman Services",
    layout: "layouts/main-layout",
  });
});

// routing dengan parameter
router.get("/user/:id", (req, res) => {
  res.send(`User ID : ${req.params.id} \n email : ${req.query.email}`);
});

module.exports = router;
