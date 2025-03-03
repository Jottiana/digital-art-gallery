require("dotenv").config();

const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("node:path");
const helmet = require("helmet");

const app = express();

app.use(helmet());

const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use("/uploads", express.static("uploads", { dotfiles: "deny" }));

const storage = multer.diskStorage({
	destination: "uploads/",
	filename: (req, file, cb) => {
		const ext = path.extname(file.originalname).toLowerCase();
		const allowedExts = [".png", ".jpg", ".jpeg"];

		if (!allowedExts.includes(ext)) {
			return cb(new Error("Format de fichier non autorisé"), false);
		}

		cb(null, `${Date.now()}-${Math.round(Math.random() * 1000)}${ext}`);
	},
});

const upload = multer({
	storage: storage,
	limits: { fileSize: 2 * 1024 * 1024 },
});

app.post("/upload", upload.single("image"), (req, res) => {
	if (!req.file) return res.status(400).send("Aucun fichier reçu.");

	let images = [];
	if (fs.existsSync("images.json")) {
		images = JSON.parse(fs.readFileSync("images.json"));
	}
	images.push(req.file.filename);
	fs.writeFileSync("images.json", JSON.stringify(images, null, 2));

	res.redirect("/");
});

app.listen(PORT, "0.0.0.0", () =>
	console.log(`✅ Serveur en ligne sur port ${PORT}`),
);
