export default (express, bodyParser, createReadStream, crypto, http, connect, writeFileSync) => {
    const app = express();
    
    app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,OPTIONS,DELETE');
    res.append("Access-Control-Allow-Headers", "Accept, Content-Type, Authorization, X-Requested-With");
    next();
});

app.get('/login/', (req, res) => {
  res.send('itmo286135');
})

app.use(bodyParser.json()); 
app.set('view engine','pug');

app.get('/wordpress/wp-json/wp/v2/posts/1', (req,res) => {
  res.json({
    id: 1,
    title: {rendered: 'itmo286135'}
})
})

app.post('/render/', (req, res) => {
  const {random2, random3} = req.body

  http.get( req.query.addr,{headers: {
    'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Methods':'GET,POST,PUT,PATCH,OPTIONS,DELETE'
  }}, (resFrom) => {
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
        writeFileSync('views/template.pug', rawData, function (err) {
          if (err) throw err;
          console.log('Saved!');
        }); 
        res.render('template.pug', {random2, random3})
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
