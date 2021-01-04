const express = require('express')
const router = express.Router()
const post = require('../models/post')
const user = require('../models/user')
const path = require('path')

router.get('/new', (req, res) => {
    if (req.session.userId) {
        res.render('addpost')
    } else {
        res.redirect('/users/login')
    }

})
router.get('/:id', (req, res) => {
    post.findById(req.params.id).populate({path:'author', model: user}).lean().then(post => {
        res.render('post', { post: post })
    })
})
router.post('/test', (req, res) => {

    let post_img = req.files.post_img
    post_img.mv(path.resolve(__dirname, '../public/img/post_img', post_img.name))
    post.create({
        ...req.body,
        post_img: `/img/post_img/${post_img.name}`,
        author: req.session.userId
    }, )

    req.session.sessionFlash = {
        type: 'alert alert-success',
        message: 'your post shared'
    }
    res.redirect('/blog')
})

module.exports = router