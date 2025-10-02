//➡️ Estamos a "ligar" o programa à biblioteca mongoose, que nos ajuda a trabalhar com a base de dados MongoDB.
const mongoose = require("mongoose")
const {Schema} = mongoose

//➡️ Aqui definimos o esquema da foto — ou seja, que informações é que vamos guardar para cada foto:
const photoSchema = new Schema({
    image: String,
    title: String,
    likes : Array,
    comments: Array,
    userId: mongoose.ObjectId,
    userName: String,
},
{
    //🕒 timestamps: true: Guarda automaticamente a data de criação e de atualização da foto.
    timestamps: true
}
);

//➡️ Aqui estamos a dizer:
// "Cria um modelo chamado Photo baseado neste esquema."
// Vamos usá-lo para guardar, procurar, e modificar fotos na base de dados.
const Photo = mongoose.model("Photo", photoSchema);

//➡️ Isto serve para exportar o modelo, para que possamos usá-lo noutros ficheiros do projeto (como por exemplo, para mostrar fotos numa página web).
module.exports = Photo;


