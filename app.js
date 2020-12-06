export default (express, bodyParser, createReadStream, crypto, http) => {
    const app = express();
    
    app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,OPTIONS,DELETE');
    next();
});

app.get('/sha1/:input/', (req, res, next) => {
    const shasum = crypto.createHash('sha1')
    shasum.update(req.params.input)
    res.send(shasum.digest('hex'))
})

app.get('/login/', (req, res) => {
  res.send('itmo286135')
})

app.get('/code/', (req, res) => {

  const  reader = createReadStream(import.meta.url.substring(10))
  reader.on('data', function (chunk) { 
    res.send(chunk.toString()); 
  }); 

  reader.on('error', function (chunk) { 
        res.send('error')
  }); 

})

app.use(bodyParser.urlencoded({  
  extended: true
})); 

app.post('/req/', (req, res) => {
    
     http.get( req.body.addr, (resFrom) => {
  const { statusCode } = resFrom;
  let error;

  if (statusCode !== 200) {
    error = new Error('Request Failed.\n' +
                      `Status Code: ${statusCode}`);
    resFrom.resume();
    return;
  } 

  resFrom.setEncoding('utf8');
  let rawData = '';
  resFrom.on('data', (chunk) => { rawData += chunk; });
  resFrom.on('end', () => {
    try {
      res.send(rawData)
    } catch (e) {
      res.status(500)
       res.send('error')
    }
  });
    }).on('error', (e) => {
    res.status(500)
     res.send('error')
    }).end();

})


app.get('/req/', (req, res) => {
    
    http.get( req.query.addr, (resFrom) => {
  const { statusCode } = resFrom;
  let error;

  if (statusCode !== 200) {
    error = new Error('Request Failed.\n' +
                      `Status Code: ${statusCode}`);
    resFrom.resume();
    return;
  } 

  resFrom.setEncoding('utf8');
  let rawData = '';
  resFrom.on('data', (chunk) => { rawData += chunk; });
  resFrom.on('end', () => {
    try {
      res.send(rawData)
    } catch (e) {
      res.status(500)
    }
  });
    }).on('error', (e) => {
    res.status(500)
    }).end();
})

app.all('*', function( req, res) {
    res.send('itmo286135')
})

return app;
}
