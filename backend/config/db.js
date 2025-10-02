const mongoose = require("mongoose")
// vai buscar os dados la .env
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

//Funcao assyncrona para conectar com o banco de dados

const connection = async () => {
    try {
        const dbConnection = await mongoose.connect(
            `mongodb+srv://${dbUser}:${dbPassword}@reactgram.oaxoru0.mongodb.net/?retryWrites=true&w=majority&appName=ReactGram`

        );

        console.log('Conectou ao banco de dados!!');

        return dbConnection;

    } catch (error) {
        console.log(error)
    }
}


//meter a connecçao a dar
connection()

module.exports = connection;