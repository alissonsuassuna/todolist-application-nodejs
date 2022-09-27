const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/data.js')


const app = express();

app.set('view engine', 'ejs');

//app.use(bodyParser.urlencoded({extended: true}))

const items = ['Peixe', 'Arroz', 'Carne']
const workItems = []

app.use(express.urlencoded({ extended: true}))
app.use(express.static('public'))

app.get('/', (req, res) => {

   const day = date.getDate() //! ou .getDay()

   res.render('list', {listTitle: day, newListItems: items})
});

app.post('/', (req, res) => {

   const item = req.body.newItem

   if(req.body.list === 'trabalho') {
      workItems.push(item)
      res.redirect('/trabalho')
   } else {
      items.push(item)
      res.redirect('/')
   }

})

app.get('/trabalho', (req, res) => {
   res.render('list', {listTitle: 'trabalho', newListItems: workItems})
})

app.post('/trabalho', (req, res) => {
   const item = req.body.newItem
   workItems.push(item)
   res.redirect('/trabalho')
})

app.get('/sobre', (req, res) => {
   res.render('about')
})

app.listen(4000, () => {
    console.log('Servidor rodando na porta 4000');
});