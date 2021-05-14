var express = require('express');
var router = express.Router();
//var mongoose = require('mongoose');
//mongoose.Promise = global.Promise;
var Video = require('../models/videos');
const tokenYZ = require('../utils/checkToken');

/* GET home page. */
router.get('/', tokenYZ, function(req, res, next) {
    //var db = mongoose.connection;
    Video.find({}, (err, videos)=>{
        if(err) throw err;
        res.json(videos);
    })
});
router.post('/', tokenYZ, function(req, res, next) {
    //var db = mongoose.connection;
    req.body.id = Date.now();
    console.log(req.body);
    Video.create(req.body, (err, video) => {
        if(err) return next(err);
        res.json(video);
    });
});
router.put('/:id', tokenYZ, function(req, res, next) {
    //var db = mongoose.connection;
    console.log(req.params.id, req.body);
    Video.findByIdAndUpdate(req.params.id, req.body, (err, video) => {
        if(err) return next(err);
        res.json(video);
    });
});
router.delete('/', function(req, res, next) {
    //var db = mongoose.connection;
    console.log(req.params, req.body);
    Video.findByIdAndRemove(req.query.id, (err, video) => {
        if(err) return next(err);
        res.json(video);
    });
});
module.exports = router;
