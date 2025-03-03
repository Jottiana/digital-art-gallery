const express = require("express");
const multer = require("multer");
const fs = require("fs");

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

app.post("/upload", upload.single("image"), (req, res) => {
    if (!req.file) return res.status(400).send("Aucun fichier reçu.");

    const ext = req.file.originalname.split(".").pop();
    const newPath = `uploads/${req.file.filename}.${ext}`;
    fs.renameSync(req.file.path, newPath);

    let images = [];
    if (fs.existsSync("images.json")) {
        images = JSON.parse(fs.readFileSync("images.json"));
    }
    images.push(`${req.file.filename}.${ext}`);
    fs.writeFileSync("images.json", JSON.stringify(images, null, 2));

    res.redirect("/");
});

app.listen(3000, () => console.log("Serveur démarré sur http://localhost:3000"));
