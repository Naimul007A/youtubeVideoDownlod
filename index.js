const express = require('express')
const download = require('./handler/download')
const app = express()
const port = 3200
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.get('/',function(req,res){
    res.render('home');
});
app.post('/download',download )
app.get('/download',function(req,res){
    console.log(req.query.url);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
module.exports = app;