const { validationResult } = require("express-validator");
const db = require("../database/models");
const path = require("path");
const fs = require("fs");

module.exports = {
  // get all data contacts
  async index(req, res) {
    const contacts = await db.Contact.findAll({});
    return res.status(200).json({
      status: "success",
      data: contacts,
    });
  },
  // store
  async store(req, res) {
    // console.log(req.file);
    const errors = validationResult(req);
    const { name, email, phone } = req.body;
    // logika jika error
    if (!errors.isEmpty()) {
      return res.status(422).send({ status: "error", errors: errors.array() });
    } else {
      // upload file
      if (req.files === null) {
        // return res.status(400).json({ msg: "No File Uploaded" });
        var image = null;
      } else {
        // console.log(req.files);
        const file = req.files.image;
        const fileSize = file.size;
        const ext = path.extname(file.name);
        // const fileName = Date.now() + ext;
        const fileName = Date.now() + "-" + file.name + ext;
        // const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
        const allowedType = [".png", ".jpg", ".jpeg", ".svg"];

        if (!allowedType.includes(ext.toLowerCase()))
          return res
            .status(422)
            .json({ msg: "Extensi file yang di ijinkan png, jpg, jpeg, svg" });
        if (fileSize > 3000000)
          return res.status(422).json({ msg: "Ukuran file maksimal 3 MB" });
        file.mv(`./public/images/${fileName}`);
        var image = fileName;
      }
      const contact = await db.Contact.create({
        name: name,
        email: email,
        phone: phone,
        image: image,
      });
      return res.status(201).send({
        status: "data berhasil di simpan",
        data: contact,
      });
    }
  },

  // detail data
  async show(req, res) {
    const id = req.params.id;
    const contact = await db.Contact.findOne({
      where: {
        id: id,
      },
      attributes: ["id", "name", "email", "phone", "image"],
    });
    // jika data gak ada
    if (!contact) {
      return res.status(404).json({ status: "data tidak ditemukan" });
    }
    return res.status(200).json({ data: contact });
  },

  // update data
  async update(req, res) {
    const errors = validationResult(req);
    const id = req.params.id;
    const { name, email, phone } = req.body;

    // logika jika error
    if (!errors.isEmpty()) {
      return res.status(422).json({ status: "error", errors: errors.array() });
    } else {
      const contact = await db.Contact.findOne({ where: { id: id } });
      if (contact) {
        // menggunakan multer
        // if (req.file) {
        //   // ada gk data image di database
        //   if (contact.image !== null) {
        //     const target = `public/images/${contact.image}`;
        //     // hapus file image
        //     fs.unlinkSync(target);
        //   }
        //   var image = req.file.filename;
        // } else {
        //   var image = contact.image;
        // }
        if (!errors.isEmpty()) {
          return res
            .status(422)
            .send({ status: "error", errors: errors.array() });
        } else {
          // upload file
          if (req.files === null) {
            var image = contact.image;
          } else {
            if (contact.image !== null) {
              const target = `public/images/${contact.image}`;
              fs.unlinkSync(target);
            }
            const file = req.files.image;
            const fileSize = file.size;
            const ext = path.extname(file.name);
            // const fileName = file.md5 + ext;
            const fileName = Date.now() + "-" + file.name;

            const allowedType = [".png", ".jpg", ".jpeg", ".svg"];

            if (!allowedType.includes(ext.toLowerCase()))
              return res.status(422).json({
                msg: "Extensi file yang di ijinkan png, jpg, jpeg, svg",
              });
            if (fileSize > 3000000)
              return res.status(422).json({ msg: "Ukuran file maksimal 3 MB" });
            file.mv(`./public/images/${fileName}`);
            var image = fileName;
          }
        }
        contact.name = name;
        contact.email = email;
        contact.phone = phone;
        contact.image = image;
        await contact.save();
        return res.status(201).json({ status: "berhasil update data" });
      } else {
        return res.status(404).json({ status: "data tidak ditemukan" });
      }
    }
  },

  // Delete data
  async destroy(req, res) {
    const id = req.params.id;
    const contact = await db.Contact.findOne({
      where: {
        id: id,
      },
    });
    // jika data
    if (contact) {
      // image ada gk
      if (contact.image !== null) {
        const target = `public/images/${contact.image}`;
        fs.unlinkSync(target);
      }
      await contact.destroy();
      return res.status(200).json({ status: "data berhasil dihapus" });
    } else {
      return res.status(404).json({ status: "data tidak ditemukan" });
    }
  },
};
