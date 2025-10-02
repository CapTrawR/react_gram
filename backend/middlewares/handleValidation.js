const {validationResult} = require ("express-validator")

const validate = (req, res, next) => {

    const errors = validationResult(req)

    // ver se nao tem erro se nao tiver continua
    if(errors.isEmpty()){
        return next()
    }

    // se nao esta vazio ele tem erro entao esta variavel vao ter esses erros
    const extractedErrors = []

    // aqui meto as mensagens de erro e vou mandar isto para o front end para mostar os erros
    errors.array().map((err) => extractedErrors.push(err.msg))

    return res.status(422).json({
        errors: extractedErrors
    })
}

module.exports = validate