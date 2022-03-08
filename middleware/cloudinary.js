const { cloudinary } = require('../config/cloudinary');

const CLOUDINARY_DOMAIN = 'https://res.cloudinary.com';
const cloudinaryUploader = {};

cloudinaryUploader.single = function(fieldName, folderName) {
    return (req, res, next) => {
        // If no value is provided, do nothing.
        if (typeof req.body[fieldName] === "undefined" || req.body[fieldName] === '') {
            next();
            return;
        }

        const fieldValue = req.body[fieldName];

        // When user does not upload a new image, the field value is an url to the image on cloudinary. Then do nothing.
        // For example: https://res.cloudinary.com/XXXXX/scbmtx51mmpglxfghkma.jpg.
        if (fieldValue.startsWith(CLOUDINARY_DOMAIN)) {
            next();
            return;
        }

        // When no file data is uploaded, throw an error.
        if (!fieldValue.startsWith('data:')) {
            res.status(400).json({ message: `Invalid ${fieldName} ${fieldValue}` });
            return;
        }

        if (typeof folderName === "function") {
            folderName = folderName(req);
        }

        // Upload the image to cloudinary.
        cloudinary.uploader.upload(fieldValue, {
            overwrite: true,
            invalidate: true,
            folder: folderName,
        }, function(error, result) {
            if (error) {
                res.status(500).json({ message: "Could not upload to cloudinary, please check server console" });

                return
            }

            req.body[fieldName] = result.secure_url;
            next()
        });
    };
}

cloudinaryUploader.multiple = function(fieldName, folderName) {
    return (req, res, next) => {
        // If no value is provided, do nothing.
        if (typeof req.body[fieldName] === "undefined" || !Array.isArray(req.body[fieldName]) || req.body[fieldName] === []) {
            next();
            return;
        }

        if (typeof folderName === "function") {
            folderName = folderName(req);
        }

        const promises = req.body[fieldName].map((fileData, idx) => {
            // When user does not upload a new image, the field value is an url to the image on cloudinary. Then do nothing.
            // For example: https://res.cloudinary.com/XXXXX/scbmtx51mmpglxfghkma.jpg.
            if (fileData.startsWith(CLOUDINARY_DOMAIN)) {
                return Promise.resolve(fileData);
            }

            // When no file data is uploaded, throw an error.
            if (!fileData.startsWith('data:')) {
                return Promise.reject({ code: 400, message: `Invalid ${fieldName}[${idx}] ${fileData}` });
            }

            // Upload the image to cloudinary.
            return new Promise((resolve, reject) => {
                cloudinary.uploader.upload(fileData, {
                    overwrite: true,
                    invalidate: true,
                    folder: folderName,
                }, function(error, result) {
                    if (error) {
                        console.log(error);
                        return reject({ code: 500, message: `Could not upload ${fieldName}[${fileIdx}] to cloudinary, please check server console` });
                    }

                    resolve(result.secure_url);
                })
            });
        });

        Promise.all(promises)
            .then(imageUrls => {
                req.body[fieldName] = imageUrls;

                next();
            })
            .catch(({ code, message }) => {
                res.status(code).json({ message });
            });
    }
}

module.exports = {
    cloudinaryUploader
}