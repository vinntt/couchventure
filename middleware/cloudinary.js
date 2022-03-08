const { cloudinary } = require('../config/cloudinary');

const cloudinaryUploader = function(fieldName, folderName) {
    return (req, res, next) => {
        const fieldValueType = typeof req.body[fieldName];

        // If no value is provided, do nothing.
        if (fieldValueType === "undefined" || req.body[fieldName] === '') {
            next()
            return
        }

        const fieldValue = req.body[fieldName];

        // When user does not upload a new image, the field value is an url to the image on cloudinary. Then do nothing.
        // For example: https://res.cloudinary.com/XXXXX/scbmtx51mmpglxfghkma.jpg.
        if (fieldValue.startsWith('https://res.cloudinary.com')) {
            next();
            return;
        }

        // When no file data is uploaded, throw an error.
        if (!fieldValue.startsWith('data:')) {
            res.status(400).json({ mesage: `Invalid profile image ${fieldValue}` });
            return;
        }

        // Upload the image to cloudinary.
        cloudinary.uploader.upload(req.body[fieldName], {
            overwrite: true,
            invalidate: true,
            folder: folderName,
        }, function(error, result) {
            if (error) {
                res.status(500).json({ mesage: "Could not upload to cloudinary, please check server console" });

                return
            }

            req.body[fieldName] = result.secure_url;
            next()
        });
    };
}

module.exports = {
    cloudinaryUploader
}