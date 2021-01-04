const express = require('express')
const router = express.Router()
const post = require('../models/post')
const user = require('../models/user')


router.get('/', (req,res) => {
    //res.render('home')
    res.redirect('blog')
})

router.get('/categories', (req,res) => {
    res.render('categories')
})
router.get('/blog', (req,res) => {
    post.find({}).populate({path:'author', model: user}).sort({$natural: -1}).lean().then(posts =>{
        res.render('blog', {posts:posts})
    })
})
router.get('/contact', (req,res) => {
    res.render('contact')
})



module.exports = router