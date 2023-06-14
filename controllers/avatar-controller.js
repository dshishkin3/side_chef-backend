const ImageService = require("../service/image-service");

class AvatarController {
    async uploadAvatar(req, res, next) {
        try {
            const avatar = await ImageService.setImage(req, res)
            return res.json(avatar);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new AvatarController();