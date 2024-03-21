var express = require('express');
var router = express.Router();
const Websocket = require("ws");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/sse', function(req, res, next) {
  console.log('sse')
  const url = req.url;
  // 如果请求 /sse 路径，建立 SSE 连接
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    // 'Cache-Control': 'no-cache',
    // 'Connection': 'keep-alive',
    // 'Access-Control-Allow-Origin': '*', // 允许跨域
  })


  // 每隔 1 秒发送一条消息
  let id = 0
  const intervalId = setInterval(() => {
    res.write(`event: customEvent\n`)
    res.write(`id: ${id}\n`)
    res.write(`retry: 30000\n`)
    const params = url.split('?')[1]
    const data = { id, time: new Date().toISOString(), params }
    res.write(`data: ${JSON.stringify(data)}\n\n`)
    id++
    if (id >= 10) {
      clearInterval(intervalId)
      res.end()
    }
  }, 1000)

  // 当客户端关闭连接时停止发送消息
  req.on('close', () => {
    clearInterval(intervalId)
    id = 0
    res.end()
  })
})

// router.get('/ws', function(req, res, next) {
  
  const wss = new Websocket.Server({ port: 8080 });
    wss.on('connection', function(ws) {
      console.log('开启连接');
      function send(data) {
        if(ws.readyState ===  Websocket.OPEN){
          ws.send(data);
        } else {
          console.log('连接已关闭')
        }
      }

      ws.on("message", function (str) {
        console.log("Received: " + str);
        conn.send("Hello client");
      });

      ws.on("close", function (reason) {
        console.log("Connection closed (" + ws + " - " + reason + ")");
      });

      ws.on('error', (ws) => {
        console.log('异常关闭', ws)
      })
    })
    
  // 示例：定时发送数据给所有已连接的客户端
  setInterval(() => {
    wss.clients.forEach((client) => {
      if (client.readyState === Websocket.OPEN) {
        client.send(JSON.stringify({ time: new Date().toISOString() }));
      }
    });
  }, 5000); // 每5秒发送一次当前时间
// });

module.exports = router;
