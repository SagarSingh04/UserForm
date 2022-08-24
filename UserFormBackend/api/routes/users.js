const { response } = require('express');
const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/getUsers', async(req, res, next) => {
    try{
        const response = await User.find().exec();
        console.log(response);
        res.status(200).json({
            message: "success",
            response: response
        })
    }
    catch(error) {
        res.status(500).send({
            message: 'error',
            error: error
        })
    }
    
});

router.post('/createUser', async(req, res, next) => {
    try{
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            imgPath: req.body.imgPath
        });
        const response = await user.save();
        console.log(response);
        res.status(200).json({
            message: "success",
            response: response
        });
    }
    catch(error) {
        res.status(500).json({
            message: "error",
            error: error
        });
    }
    
});

router.patch('/updateUser/:id', async(req, res, next) => {
    try{
        const id = req.params.id;
        const response = await User.findByIdAndUpdate({_id: id}, {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            imgPath: req.body.imgPath
        }).exec();
        console.log(response);
        res.status(200).json({
            message: "success",
            response: response
        })
    }
    catch(error) {
        res.status(500).send({
            message: 'error',
            error: error
        });
    }
});

router.delete('/deleteUser/:id', async(req, res, next) => {
    try{
        let id = req.params.id;
        const response = await User.remove({_id: id}).exec();
        res.status(200).json({
            message: "success",
            response: response
        });
    }
    catch(error) {
        res.status(500).send({
            message: 'error',
            error: error
        })
    }
    
});

router.get('/getUserDetails/:id', async(req, res ,next) => {
    try{
        let id = req.params.id;
        const response = await User.findById(id).exec();
        console.log(response);
        res.status(200).json({
            message: "success",
            response: response
        });
    }
    catch(error) {
        res.status(500).send({
            message: 'error',
            error: error
        })
    }
    
});

module.exports = router;