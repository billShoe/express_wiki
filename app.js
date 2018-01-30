var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var expressLayouts = require('express-ejs-layouts');
var Rivets = require('./models').Rivet;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressLayouts);
app.set('view engine', 'ejs');


app.get('/', function (req, res) {
  Rivets.findAll().then(function(Rivets){
    res.render('index', {Rivets: Rivets})
  }).catch(function(error){
    res.send("Couldn't fetch Rivets")
  })
});

app.get('/rivets', function (req, res) {
  Rivets.findAll().then(function(Rivets){
    res.render('index', {Rivets: Rivets})
  }).catch(function(error){
    res.send("Couldn't fetch Rivets")
  })
});


app.get('/rivets/new' , function(req, res){
  Rivets.findAll().then( function(){
    res.render('new')
  }).catch(function(error){
    res.send("Could not fetch Rivets")
  })
});

app.post('/rivets/new', function(req, res){
  Rivets.create({
    name: req.body.name,
    material: req.body.material,
    shape: req.body.shape,
    size: req.body.size,
    summary: req.body.summary,
  }).then(function(Rivets){
    res.redirect('/rivets/' + Rivets.id)
  }).catch(function(error){
    res.send("Could not create rivet")
  })
});

app.get('/rivets/:id', function(req, res){
  Rivets.findById(req.params.id).then(function(Rivets){
    res.render('rivets', {Rivets: Rivets})
  }).catch(function(error){
    res.send("Could not fetch rivet")
  })
});

app.post('/rivets/:id/delete', function(req, res){
  Rivets.findById(req.params.id).then(function(Rivets){
    return Rivets.destroy(Rivets)
  }).then(
    res.redirect('/rivets')
  ).catch(function(error){
    res.send("Failed to delete")
  })
});

app.get('/rivets/:id/edit', function(req, res){
  Rivets.findById(req.params.id).then(function(Rivets){
    res.render('edit', {Rivets: Rivets})
  }).catch(function(error){
    res.send("Failed to fetch edit")
  })
});

app.post('/rivets/:id/edit', function(req, res){
  Rivets.findById(req.params.id).then(function(Rivets){
    return Rivets.update({
      name: req.body.name,
      material: req.body.material,
      shape: req.body.shape,
      size: req.body.size,
      summary: req.body.summary,})
  }).then(function(Rivets){
    res.redirect('/rivets/' + Rivets.id)
  }).catch(function(error){
    res.send("Failed to edit")
  })
});

app.listen(3000, function () {
 console.log('Example app listening on port 3000!');
});
