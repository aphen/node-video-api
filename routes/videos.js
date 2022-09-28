var express = require("express");
const path = require("path");
var router = express.Router();
//var mongoose = require('mongoose');
//mongoose.Promise = global.Promise;
var Video = require("../models/videos");
const tokenYZ = require("../utils/checkToken");

const multer = require("multer");
// const upload = multer({
//     dest: 'uploads/'
// });
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.use(tokenYZ);

/* GET home page. */
let body = [];
let chunk = "";
router.get("/", function (req, res, next) {
  console.log("req");
  
  //   const options = {
  //     hostname: "10.80.31.26",
  //     port: "8765",
  //     path: "/api/admin/role/page?roleName&page=1&limit=10",
  //     Headers: {
  //       "Content-Type": "application/json",
  //       Authorization:
  //         "eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInVzZXJJZCI6IjEiLCJuYW1lIjoi6LaF57qn566h55CG5ZGYIiwicm9sZU5hbWUiOiLotoXnuqfns7vnu5_nrqHnkIblkZgsIiwiaWQiOiJoOTVQY0VvRyIsImV4cCI6MTY0MzIwMzE1Nn0.dHeVjKLTIWGTkQBVGKJ5cd9ZUrJFtNc_g6qLTYKd4wTMJBmp_FCSy4iuwbd_OrHodj3p1Hhf2qh9wvNA2dlMD7BWbfyryF2uYhE92znSXlmoLix9k2Ftk3VwLRA2lqXvxQj6HwQ2Z3UQ9h5oEh0InsGIVyE-vzDZRbzDS587NaJdQT680BohwFgvF9YPU080lIR36ugjHl0hPVWfzaixNzO94-HTcSutC3DNIaT0VBj2qwLbwT1xl9SnrXONKEzgw47ugsPzJws6j-wKJ5IcoGQQhwmeLvf_LbEcQdb5NUWgPLXtDRSBMqZfD4QUZL912xaRDPfOjvsU7EbZBU4myg",
  //     },
  //   };
  //   const httpQuest = http
  //     .request(options, (res2) => {
  //       res2
  //         .on("data", (resp) => {
  //           body.push(resp);
  //         })
  //         .on("end", () => {
  //           body = Buffer.concat(body).toString();
  // console.log(body, "body");
  //           res.json(body);
  //         });
  //     });
  //     httpQuest.on("error", (err) => {
  //       console.log(err);
  //       // 检查是否需要重试
  //       //   if (req.reusedSocket && err.code === 'ECONNRESET') {
  //       //     retriableRequest();
  //       //   }
  //     });
  //     httpQuest.end();
  //var db = mongoose.connection;
  Video.find({}, (err, videos) => {
    if (err) throw err;
    res.json(videos);
  });
});
router.post("/", function (req, res, next) {
  //var db = mongoose.connection;
  req.body.id = Date.now();
  console.log(req.body);
  Video.create(req.body, (err, video) => {
    if (err) return next(err);
    res.json(video);
  });
});
router.put("/:id", function (req, res, next) {
  //var db = mongoose.connection;
  console.log(req.params.id, req.body);
  Video.findByIdAndUpdate(req.params.id, req.body, (err, video) => {
    if (err) return next(err);
    res.json(video);
  });
});
router.delete("/", function (req, res, next) {
  //var db = mongoose.connection;
  console.log(req.params, req.body);
  Video.findByIdAndRemove(req.query.id, (err, video) => {
    if (err) return next(err);
    res.json(video);
  });
});
router.post("/upload", upload.array("files[]", 12), function (req, res, next) {
  //var db = mongoose.connection;
  console.log(req.protocol + "://" + req.get("host"))
  const filePaths = [];
  req.files.forEach((item) => {
      filePaths.push({ url: '/uploads/' + item.filename })
  })
  res.json({filePaths})
});

module.exports = router;
