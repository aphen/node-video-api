var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/sse', function(req, res, next) {
  console.log('sse')
  const url = req.url;
  // 如果请求 /events 路径，建立 SSE 连接
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

module.exports = router;
