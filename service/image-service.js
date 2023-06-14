const cloudinary = require("cloudinary");
const multer = require("multer");
const { promisify } = require("util");

const storage = multer.memoryStorage();
const upload = multer({ storage });
const uploadSingleAsync = promisify(upload.single("file"));

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

class ImageService {
    async setImage(req, res) {
        try {
            await uploadSingleAsync(req, res);
            if (!req.file) {
                throw ApiError.BadRequest("No file uploaded");
            }

            const result = await new Promise((resolve, reject) => {
                cloudinary.v2.uploader.upload_stream({ resource_type: "auto" }, (error, result) => {
                    if (error) {
                        throw ApiError.BadRequest("Error uploading image to Cloudinary");
                    } else {
                        resolve({ url: result.secure_url });
                    }
                }).end(req.file.buffer);
            });

            return result;
        } catch (error) {
            throw ApiError.BadRequest("Error uploading image");
        }
    }
}

module.exports = new ImageService();