const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
var json2xls = require('json2xls');
const fs = require("fs");//npm install fs

const Code = require('../models/code');
//hah
router.get('/',(req, res, next) =>{
    Code.find()
    .exec()
    .then(doc =>{ 
        console.log(doc);
        res.status(200).json(doc);
    })
    .catch(err =>{
        console.log(error);
        res.status(500).json(
            errror = err
        );
    });

    
});

router.get('/export',(req, res, next) =>{
    Code.find()
    .exec()
    .then(doc =>{ 
        coolnew = doc;
        console.log(coolnew);
        res.status(200).json(doc);
        //checking
        //var rawFile = fs.coolnew//dir of your json file as param
        //var raw = JSON.parse(coolnew)
        //console.log(raw);
        //res.status(200).json(raw);
        var xls = json2xls(coolnew,{
            fields : {_id:'string',title:'string',body:'string',code:'string',author:'string'}
        });
        fs.writeFileSync('data.xlsx', xls, 'binary');
        res.download('data.xlsx');
    })
    .catch(err =>{
        console.log(error);
        res.status(500).json(
            errror = err
        );
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