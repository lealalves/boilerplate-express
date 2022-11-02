let express = require('express');
let app = express();


app.use('/public', express.static(__dirname + '/public'))

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`)
  next()
})


app.route('/name')
.get((req, res) => {
  let {first, last} = req.query
  res.send({name: `${first} ${last}`})
})


app.get('/:word/echo', (req, res) => {
  res.send({echo: req.params.word})
})

app.get('/now', function(req, res, next){
  req.time = new Date().toString()
  next()
}, function(req, res) {
  res.send({time: req.time})
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

app.get('/json', (req, res) => {
  let msg

  if(process.env.MESSAGE_STYLE === 'uppercase'){
    msg = 'hello json'.toUpperCase()
  } else {
    msg = 'Hello json'
  }
  
  res.json({message: msg})
})

































 module.exports = app;
