require("dotenv").config();

const express = require("express");
const multer = require("multer");
const helmet = require("helmet");
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const app = express();
app.use(
	helmet({
		contentSecurityPolicy: {
			directives: {
				defaultSrc: ["'self'"],
				scriptSrc: ["'self'", "'unsafe-inline'"],
				imgSrc: ["'self'", "data:", "https://res.cloudinary.com"],
			},
		},
	}),
);

const cors = require("cors");
app.use(cors());

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
	console.log("🖼️ Images enregistrées :", images);
});

app.get("/images", (req, res) => {
	const fs = require("fs");
	if (fs.existsSync("images.json")) {
		return res.json(JSON.parse(fs.readFileSync("images.json")));
	}
	res.json([]);
});

app.post("/delete", express.json(), (req, res) => {
	const { imageUrl } = req.body;

	if (!imageUrl) {
			return res.status(400).json({ success: false, error: "Aucune URL fournie" });
	}

	const fs = require("fs");
	let images = [];

	if (fs.existsSync("images.json")) {
			images = JSON.parse(fs.readFileSync("images.json"));
	}

	const newImages = images.filter(url => url !== imageUrl);
	fs.writeFileSync("images.json", JSON.stringify(newImages, null, 2));

	const publicId = imageUrl.split('/').pop().split('.')[0];
	cloudinary.uploader.destroy(`galerie_art/${publicId}`, (error, result) => {
			if (error) {
					console.error("🚨 Erreur suppression Cloudinary :", error);
					return res.status(500).json({ success: false, error });
			}
			console.log("✅ Image supprimée de Cloudinary :", result);
			res.json({ success: true });
	});
});


app.listen(PORT, "0.0.0.0", () =>
	console.log(`✅ Serveur en ligne sur port ${PORT}`),
);
