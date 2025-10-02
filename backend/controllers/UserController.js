const User = require("../models/User")

//➡️ Estamos a importar o bcryptjs, uma ferramenta para encriptar palavras-passe.
// Ou seja, quando alguém cria uma conta, a password não é guardada "à vista". Fica encriptada — por segurança.
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");

const jwtSecret = process.env.JWT_SECRET;


//funcao para gerar o token
/*➡️ Esta função cria um token para o utilizador com base no ID dele.

{id} → o conteúdo do token (só guarda o ID do user)

jwtSecret → a chave secreta para "assinar" o token (só o servidor sabe)

expiresIn: "7d" → o token expira em 7 dias (precisa de fazer login outra vez depois disso) */
const generateToken = (id) =>{
    return jwt.sign({id}, jwtSecret,{
        expiresIn: "7d"
    });
};


//parte do registro  do usuario e sign in
const register = async(req, res) => {

    // vamos buscar o nome email e password do corpo da requesiçao
    const {name, email, password} = req.body

    // vamos ver se o usuario existe com o email.. porque o email e unico
    //este metodo findOne e do monngose
    const user = await User.findOne({email})
    
    // se o user com aquele email for encontrado vamos lançar um erro
    if(user){
        res.status(422).json({errors: ["This email is already in use"]})
        return
    }

    // Gerar a hash da password isto e feito com a bcrypt 
    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password,salt)

    // criar o usuario
    //este metodo findOne e do monngose
    const newUser = await User.create({
        name,
        email,
        password: passwordHash
    })

    // ver se o usuario foi criado com sucesso, retorna o token
    if(!newUser){
        res.status(422).json({errors: ["Error, please try again later"]})
        return
    }

    res.status(201).json({
        _id: newUser._id,
        token: generateToken(newUser._id)
    })
};

//parte do log in
const login = async (req, res) => {
    const {email,password} = req.body

    const user = await User.findOne({email})

    // verificar se o usuario existe
    if(!user){   
        res.status(404).json({errors:["User not found!"]})
        return
    }

    // console.log("Password from request:", password);
    console.log("Password from user in DB:", user?.password);

    // ver se a password esta valida
    if(!(await bcrypt.compare(password, user.password))){
        res.status(422).json({errors:["Password not valid"]})
        return
    }

    // retorno do usuario com log in efectuado com o token
    res.status(201).json({
        _id: user._id,
        profileImage: user.profileImage,
        token: generateToken(user._id)
    })
}

// buscar o usuario que esta loged in naquele momento
const getCurrentUser = async(req,res) =>{
    const user = req.user

    // quando isto acontece a resposta e um 200 ok
    res.status(200).json(user)
}

// update an user
const update = async (req ,res) => {
    const {name, password, bio} = req.body 

    let profileImage = null

    if(req.file){
        profileImage = req.file.filename
    }

    const reqUser = req.user

    const user = await User.findById(reqUser._id).select("-password");

    if (!user) {
    
        return res.status(404).json({ errors: ["User not found."] });
    
    }


    if (name) {
        user.name = name
    }

        if (password) {
        // Gerar a Hash da password
            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(password, salt)

            user.password = passwordHash
    }

    if (profileImage){
        user.profileImage = profileImage
    }

    if (bio){
        user.bio = bio
    }
    await user.save()

    // dizer que tudo correu bem
    res.status(200).json(user)

}


// buscar o usuario 
const getUserById = async (req, res) => {
    const {id} = req.params 

    // 1) valida o ID antes de chamar o Mongo
    if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ errors: ["Invalid user ID."] });

    }


    try {

    const user = await User.findById(id).select("-password")

    //ver se o usuario existe

    if (!user){
        res.status(404).json({errors:["User not found!"]})
        return
    }


    res.status(200).json(user)


    } catch (error) {
    
    res.status(404).json({ errors: ["Invalid User."] });

        }
    }



module.exports = {
    register,
    login,
    getCurrentUser,
    update,
    getUserById,
};
