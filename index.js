const express = require('express')
const download = require('./handler/download')
const app = express()
const port = 3200
app.set('view engine', 'ejs'); // Replace 'ejs' with your view engine if different
app.set('views', __dirname+'/views');
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.get('/',function(req,res){
    res.render('home');
});
app.route('/download')
    .get(function(req,res){
        res.render('getdownload');
    })
    .post(download)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
module.exports = app;