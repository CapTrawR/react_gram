// estamos a "ligar" o programa à biblioteca mongoose, que nos ajuda a trabalhar com a base de dados MongoDB.
const { default: mongoose } = require("mongoose")
const {Schema} = mongoose

// schema e o esqueleto do model o que vamos usar para ler procurar e inserir

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    profileImage: String,
    bio: String,
    
},
{
    // quando o ususario for atualizado ou inserido isto marca a hora data 
    timestamps : true
}
);

const User = mongoose.model("User", userSchema)

module.exports = User;