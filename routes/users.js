const express = require('express')
const router = express.Router()
const user = require('../models/user')

router.get('/register', (req, res) => {
    res.render('register')
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', (req,res) => {
    const {email,password} = req.body
    user.findOne({email}, (error, user) => {
        if(user){
            if (user.password  == password){
                req.session.userId = user._id
                req.session.sessionFlash = {
                    type: 'alert alert-dark',
                    message: "welcome " + user.username
                }
                res.redirect('/blog')
            }else{
                req.session.sessionFlash = {
                    type: 'alert alert-danger',
                    message: "I couldn't do this because you enter wrong password"
                }
                res.redirect('login')
            }
        }else{
            req.session.sessionFlash = {
              type: 'alert alert-dark',
              message: "I couldn't the e-mail adress if you wanna create new account"
          }
              res.redirect('register')
        }
    })
})

router.post('/register', (req,res) => {
    user.create(req.body, (user) => {
        req.session.sessionFlash = {
            type: 'alert alert-dark',
            message: "welcome... I think you should open your account"
        }
        res.redirect('login')
    })
})

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
})


module.exports= router