const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Code = require('../models/code');
//hah
router.get('/',(req, res, next) =>{
    res.status(200).json({
        message : 'It worksee get'
    });
});

router.post('/',(req, res, next) => {
    
    const Blog = new Code({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        body: req.body.body,
        code: req.body.code,
        author: req.body.author
    });
    Blog
    .save()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message : 'It worksee post',
            createdBlog : result
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        });
    }) 

});

router.get('/:codeId',(req, res, next) => {
    const id = req.params.codeId;
    Code.findById(id)
    .exec()
    .then(doc => {
        console.log("From database",doc);
        res.status(200).json(doc);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({error : err});
    });

    
});

router.patch('/:codeId',(req, res, next) =>{
    const id = req.params.codeId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Code.update({_id: id},{$set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });

        });

});

router.delete('/:codeId',(req, res, next) =>{
    const id = req.params.codeId;
    Code.remove({ _id: id})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            errror :err
        });
    });
});



module.exports = router;