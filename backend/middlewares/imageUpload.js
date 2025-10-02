const multer = require ("multer")
const path = require("path")

//Destino de gravar imagem

const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = ""

        if (req.baseUrl.includes("users")){
            folder = "users"
        } else if (req.baseUrl.includes("photos")){
            folder = "photos"
        }

        //configura o destino da imagem
        cb(null, `uploads/${folder}/`)
    },

    filename : (req,file,cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const imageUpload  = multer ({
    storage: imageStorage,
    fileFilter (req, file, cb) {

        //expressao regular para filtrar o que metemos
        if (!file.originalname.match(/\.(png|jpg)$/)){

            // so da upload se for png ou jpg
            return cb(new Error("Please insert only PNG or JPG files!"))
        }
        cb(undefined, true)
    }
})

module.exports = {imageUpload}

//PS:
//usar uuid seria a melhor maneira de fazer
