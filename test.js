//CRUD işlemleri
const mongoose = require('mongoose')
const post = require('./models/post')


mongoose.connect('mongodb://127.0.0.1/node_blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})



/* post.findByIdAndUpdate('5f32570f5556fd1d9443c261',{
    title: 'third post'
}, (error, post) => {
        console.log(error, post)
}) */


/* post.findById('5f325646410bd537f4dc20ca',
    (error, post) => {
        console.log(error, post)
    }) */


/* post.find({ // bırakırsan hepsini maplar
    //aradığın içeriği sağdaki gibi yazarsan filtreyebilirsin//
    title: "second title"
}, (error, post) => {
    console.log(error, post)
}) */


/* post.create({
    title: 'second title',
    content: 'default content'
}, (error, post) => {
    console.log(error, post)
})   */