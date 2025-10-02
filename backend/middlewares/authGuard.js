// aqui temos que chamar o modelo de usuarios/ o jwt e o secret
const User = require("../models/User");
const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET


const authGuard = async (req, res, next) => {
    const authHeader = req.headers ["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    // ver se o header tem o token
    if(!token) return res.status(401).json({errors: ["Acess Denied!"]})

    //ver se o token e valido
    try {

        const verified = jwt.verify(token,jwtSecret)

        req.user = await User.findById(verified.id).select("-password")

        next()
        
    } catch (error) {
        res.status(401).json({errors:["Token is not valid."]})
    }
}

module.exports = authGuard