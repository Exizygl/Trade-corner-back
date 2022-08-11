const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) { //cb = callback
        cb(null, './public/products');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname.split(" ").join("_"));
    }
});  

// const fileFilter = (req, file, cb) => {
//     if((file.mimetype).includes('jpeg') || (file.mimetype).includes('png') || (file.mimetype).includes('jpg')){
//         cb(null, true);
//     } else{
//         cb(null, false);
//     }

// };

//let uploadProductPhotos = multer({ storage: storage, fileFilter: fileFilter,});
let uploadProductPhotos = multer({ storage: storage});

module.exports = uploadProductPhotos.array('photos', 5) // nom de la key où se trouve les photos et maxCount