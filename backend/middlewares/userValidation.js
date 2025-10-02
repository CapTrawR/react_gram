const {body} = require ("express-validator")

const userCreateValidation = () => {
    return [
        body("name")
        .isString()
        .withMessage("Name is required")
        .isLength({min: 3})
        .withMessage("Name must be at least 3 characters long."),

        body("email")
        .isString()
        .withMessage("Email is required.")
        .isEmail()
        .withMessage("Email must be valid."),

        body("password")
        .isString()
        .withMessage("Password is required.")
        .isLength({min: 8})
        .withMessage("Password must be at least 8 characters long.")
        .isStrongPassword()
        .withMessage("Password must be strong."),

        body("confirmpassword")
        .isString()
        .withMessage("The password confirmation its mandatory")
        // aqui fazemos a comparacao de password costume made
        .custom((value, {req})=>{
            if(value != req.body.password){
                throw new Error ("Password confirmation does not match password.")
            }
            return true;
        })
    ]

}

// fazer a validaçao do login
const loginValidation = () =>{
    return[
        body("email")
        .isString()
        .withMessage("Email is required.")
        .isEmail()
        .withMessage("Email must be valid."),

        body("password")
        .isString()
        .withMessage("Password is required.")
        .isLength({min: 8})
        .withMessage("Password must be at least 8 characters long.")
        .isStrongPassword()
        .withMessage("Password must be strong with one Capital letter and one special character.")

    ]
}

const userUpdateValidation = () => { 
    return [
        body("name")
            .optional()
            .isLength({min: 3})
            .withMessage("Name must be at least 3 characters long."),
        body("password")
            .optional()
            .isLength({min: 8})
            .withMessage("Password must be at least 8 characters long.")
    ]
}


module.exports = {
    userCreateValidation,
    loginValidation,
    userUpdateValidation,
}