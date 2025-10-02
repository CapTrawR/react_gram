const express = require("express");
const router = express.Router();

//chamar as funcoes do controler
// controler
const {register, login, getCurrentUser, update, getUserById} = require("../controllers/UserController");

//MidleWares
const validate = require("../middlewares/handleValidation");
const {userCreateValidation, loginValidation, userUpdateValidation} = require ("../middlewares/userValidation");
const authGuard = require("../middlewares/authGuard");
const { imageUpload } = require("../middlewares/imageUpload");

//Routes
router.post("/register", userCreateValidation(), validate, register);
router.post("/login", loginValidation(), validate, login);
//retorno da rota para o usuario nao esquecer as importaçoes
router.get("/profile", authGuard, getCurrentUser)
router.put("/", authGuard, imageUpload.single("profileImage"), userUpdateValidation(), validate, update)
router.get("/:id", getUserById)

module.exports = router;
