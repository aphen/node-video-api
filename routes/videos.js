var express = require('express');
var router = express.Router();
//var mongoose = require('mongoose');
//mongoose.Promise = global.Promise;
var Video = require('../models/videos');

/* GET home page. */
router.get('/', function(req, res, next) {
    //var db = mongoose.connection;
    Video.find({}, (err, videos)=>{
        if(err) throw err;
        res.json(videos);
    })
});
router.post('/', function(req, res, next) {
    //var db = mongoose.connection;
    req.body.id = Date.now();
<<<<<<< HEAD
=======
    console.log(req.body);
>>>>>>> d9691d754fbf2e3776925fbb9f63f732cb74eb4f
    Video.create(req.body, (err, video) => {
        if(err) return next(err);
        res.json(video);
    });
});
router.put('/:id', function(req, res, next) {
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
