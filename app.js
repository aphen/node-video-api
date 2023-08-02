var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
var logger = require("morgan");
const httpProxy = require("http-proxy");
//创建一个代理服务
const proxyServer = httpProxy.createProxyServer();

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var videosRouter = require("./routes/videos");

var app = express();
var mongoose = require("mongoose");

mongoose.set("useFindAndModify", false);
mongoose
  .connect("mongodb://127.0.0.1:27017/vidzy")
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => {
    console.log(err);
  });

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(bodyParser.json);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("uploads"));

//CORS跨域资源共享
app.all("*", function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", "*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers", "*");
  //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == "options") res.send(200); //让options尝试请求快速结束
  else {
    // //将用户的请求转发
    // proxyServer.web(req, res, {
    //   target: "http://10.81.209.31:8765",
    // });
    // //监听代理服务错误
    // proxyServer.on("error", function (err) {
    //   console.log(err);
    // });
    next();
  }
});

app.use("/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/videos", videosRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  console.log(req);
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
