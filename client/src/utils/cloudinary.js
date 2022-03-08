export default function cloudinaryResize(url, transform) {
    if (typeof url === 'undefined' || !url) {
        return "";
    }

    if (!url.includes('cloudinary.com')) {
        return url
    }

    return url.replace(/image\/upload\/v[0-9]+/g, `image/upload/${transform}`);
};