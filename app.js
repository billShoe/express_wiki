var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var expressLayouts = require('express-ejs-layouts');
var rivets = require('./models').Rivet;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressLayouts);
app.set('view engine', 'ejs');

//Function for home page redirect
function homePage(req, res) {
  rivets.findAll().then(function(rivets){
    res.render('index', {rivets: rivets})
  }).catch(function(error){
    res.send("Couldn't fetch rivets")
  })
}

//all three of these render homepage
app.get('/', homePage);
app.get('/rivets', homePage);
app.get('/rivets/', homePage);


app.get('/rivets/new' , function(req, res){
  rivets.findAll().then( function(rivets){
    res.render('new', {rivets: rivets})
  }).catch(function(error){
    res.send("Could not fetch rivets")
  })
});

app.post('/rivets', function(req, res){
  const { name, material, shape, size, summary } = req.body

  rivets.create({
    name: name,
    material: material,
    shape: shape,
    size: size,
    summary: summary,
  }).then(function(rivet){
    res.redirect('/rivets/' + rivet.id)
  }).catch(function(error){
    res.send("Could not create rivet")
  })
});

app.get('/rivets/:id', function(req, res){
  rivets.findAll().then(function(rivets) {
    let rivet;

    for (let i = 0; i < rivets.length; i++) {
      if (rivets[i].id == parseInt(req.params.id)){
        rivet = rivets[i]
      }
    }

    res.render('rivets', {
      rivets: rivets,
      rivet: rivet
    })
  })
});

app.post('/rivets/:id/delete', function(req, res){
  rivets.findById(req.params.id).then(function(rivet){
    return rivet.destroy(rivet).then(function() {
      res.redirect('/')
    })
  }).catch(function(error){
    res.send("Failed to delete")
  })
});

app.get('/rivets/:id/edit', function(req, res){
  rivets.findAll().then(function(rivets){
    let rivet;

    for (let i = 0; i < rivets.length; i++) {
      if (rivets[i].id == parseInt(req.params.id)){
        rivet = rivets[i]
      }
    }

    res.render('edit', {
      rivets: rivets,
      rivet: rivet
    })
  }).catch(function(error){
    res.send("Failed to fetch edit")
  })
});

app.post('/rivets/:id/edit', function(req, res){
  rivets.findById(req.params.id).then(function(rivets){
    return rivets.update({
      name: req.body.name,
      material: req.body.material,
      shape: req.body.shape,
      size: req.body.size,
      summary: req.body.summary,})
  }).then(function(rivets){
    res.redirect('/rivets/' + rivets.id)
  }).catch(function(error){
    res.send("Failed to edit")
  })
});

app.listen(3000, function () {
 console.log('Example app listening on port 3000!');
});
