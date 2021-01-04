const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new mongoose.Schema({
    title: {type:String, required: true},
    author: {type:Schema.Types.ObjectId, ref: "users"},
    content: {type:String, required: true},
    date: {type:Date, default: Date.now},
    post_img: { type: String, required: true}
})

module.exports = mongoose.model('Post', PostSchema)