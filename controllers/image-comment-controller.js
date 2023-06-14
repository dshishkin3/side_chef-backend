const ImageService = require("../service/image-service");

class ImageCommentController {
    async uploadImage(req, res, next) {
        try {
            const image = await ImageService.setImage(req, res)
            return res.json(image);
        } catch (e) {
            next(e);
        }
    }
}
module.exports = new ImageCommentController();