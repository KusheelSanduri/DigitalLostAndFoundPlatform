import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/coudinary";

const storage = new CloudinaryStorage({
	cloudinary,
	params: {
		folder: "posts",
		resource_type: "image",
		allowed_formats: ["jpg", "jpeg", "png", "webp"],
	} as any, // issue in multer-storage-cloudinary --> types incomplete
});

const upload = multer({ storage });

export default upload;
