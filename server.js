require("dotenv").config();

const express = require("express");
const multer = require("multer");
const helmet = require("helmet");
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const app = express();
app.use(helmet());

const PORT = process.env.PORT || 3000;

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
	cloudinary,
	params: {
		folder: "galerie_d_art",
		allowed_formats: ["jpg", "png", "jpeg"],
	},
});

const upload = multer({ storage });

app.use(express.static("public"));

app.post("/upload", upload.single("image"), (req, res) => {
	if (!req.file) return res.status(400).send("Aucun fichier reçu.");

	const imageUrl = req.file.path;

	const fs = require("fs");
	let images = [];

	if (fs.existsSync("images.json")) {
		images = JSON.parse(fs.readFileSync("images.json"));
	}

	images.push(imageUrl);
	fs.writeFileSync("images.json", JSON.stringify(images, null, 2));

	res.redirect("/");
});

app.get("/images", (req, res) => {
	const fs = require("fs");
	if (fs.existsSync("images.json")) {
		return res.json(JSON.parse(fs.readFileSync("images.json")));
	}
	res.json([]);
});

app.listen(PORT, "0.0.0.0", () =>
	console.log(`✅ Serveur en ligne sur port ${PORT}`),
);
