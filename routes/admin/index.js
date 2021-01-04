const express = require('express')
const router = express.Router()
const category = require('../../models/category')

router.get('/', (req, res) => {
    res.render('admin/index')
})
router.get('/categories', (req, res) => {
    category.find({}).sort({$natural: -1}).lean().then(categories => {
        res.render('admin/categories', {categories:categories})
    })
})

router.post('/categories', (req, res) => {
    category.create(req.body, (error, category) => {
        if(!error)[
            res.redirect("categories")
        ]
    })
})
router.delete('/categories/:_id', (req, res) => {
    category.remove({_id : req.params._id}).lean().then(() =>{
        res.redirect("/admin/categories")
    })
})
module.exports = router