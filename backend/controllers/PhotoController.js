const { json } = require("express")
const Photo = require ("../models/Photo")
const User = require("../models/User")

const mongoose = require ("mongoose")

//Insert the photo, with an user related to it
const insertPhoto = async (req, res) => {

    const {title} = req.body
    const image = req.file.filename

    const reqUser = req.user

    const user = await User.findById(reqUser._id)

    //Create photo
    const newPhoto = await Photo.create({
        image,
        title, 
        userId: user._id,
        userName: user.name,
    })

    // ver se a photo creada com sucesso
    if (!newPhoto){
        res.status(422).json({
            errors:["there was a problem, please try again later!"]
        })
    }

    res.status(201).json(newPhoto)
}

// Remover as fotos da Db
const deletePhoto = async (req,res) => {
    const {id} = req.params 

    const reqUser = req.user

// 1) id inválido (formato errado) -> 400
if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      errors: ["Invalid photo id."]
    })
}


try {
    
    const photo = await Photo.findById(id)

    // validaçao para ver se a foto existe

    if(!photo){
        return res.status(404).json({
            errors:["Photo not found."]
        })
    }

    // ver se a foto pertence ao usuario
    if(!photo.userId.equals(reqUser._id)){
       return res.status(422).json({errors:["You are not allowed to delete this photo."]
       })
    }

    await Photo.findByIdAndDelete(photo._id)

    return res.status(200).json({
        id:photo._id,message:"Photo deleted successfully."
    })
  } catch (error) {
    return res.status(500).json({
      errors: ["Something went wrong. Please try again later."]
    })
  }
}

// Buscar todas as fotos
const getAllPhotos = async (req,res) => {

    // ir buscar todas as fotos pela mais recente em 1
    const photos = await Photo.find({}).sort({createdAt:-1}).exec()

    return res.status(200).json(photos)
}

//buscar todas as fotos do usuario

const getUserPhotos = async (req,res) => {

     //ir buscar a foto do usuario
     const {id} = req.params

     const photos = await Photo.find({userId: id}).sort({createdAt: -1}).exec()

     return res.status(200).json(photos)
}

// buscar a foto por id
const getPhotoById = async (req, res) => {
    const {id} = req.params

    const photo = await Photo.findById(id)

    // ver se a foto existe
    if (!photo){
        return res.status(404).json({errors:["Photo not found"]})
    }

    res.status(200).json(photo)
}

// update da photo
const updatePhoto = async (req, res) => {

    const {id} = req.params
    const { title } = req.body || {};  // se não vier ttile no
    //  body, não crasha

    const reqUser = req.user

    const photo = await Photo.findById(id)

    // ver se a foto existe

    if(!photo){
        return res.status(404).json({errors:["Photo not found"]})
    }

    // ver se a foto pertence ao usuario
    if (!photo.userId.equals(reqUser._id)){
        return res.status(403).json({errors:["You are not allowed to update this photo"]})
    }

    if(title){
        photo.title = title
    }

    await photo.save()
    res.status(200).json({photo, message:"Photo has been updated successfully"})

}

// likes nas fotos

const likePhoto = async(req,res) =>{

    const {id} = req.params

    const reqUser = req.user

    // ver a foto por id para validacoes
    const photo = await Photo.findById(id)

    // ver se a foto existe
    if(!photo){
        return res.status(404).json({errors:["Photo not found"]})
    }

    // ver se o user ja deu like
    if(photo.likes.includes(reqUser._id)){
        return res.status(422).json({errors:["Photo already have a like"]})
    }

    // adicionar os likes do usuario em um array

    photo.likes.push(reqUser._id)

    photo.save()

    res.status(200).json({photoId: id, userId: reqUser._id, message:"You have like this Pic"})
}

// comentarios das fotos

const commentPhoto = async (req,res) => {
    
    const {id} = req.params
    
    const reqUser = req.user
    const { comment } = req.body

    const user = await User.findById(reqUser._id)

    // ver a foto por id para validacoes
    const photo = await Photo.findById(id)

    // ver se a foto existe
    if(!photo){
        return res.status(404).json({errors:["Photo not found"]})
    }

    //adicionar o comentario
    const userComment = {
        comment,
        userName:user.name,
        userImage: user.profileImage,
        userId: user._id
    }

    photo.comments.push(userComment)

    await photo.save()


    return res.status(200).json({
        comment: userComment,
        message:"The comment was added successfully",
    })
}

// procurar de photos
const searchPhoto = async(req,res) => {

    const{q} = req.query

    const photos = await Photo.find({title: new RegExp(q, "i")}).exec()

    return res.status(200).json(photos)
}

module.exports ={
    insertPhoto,
    deletePhoto,
    getAllPhotos,
    getUserPhotos,
    getPhotoById,
    updatePhoto,
    likePhoto,
    commentPhoto,
    searchPhoto,
}