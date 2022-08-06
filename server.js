
const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()
const connectionString = 'mongodb+srv://idarionmgi:UqZ4xrqtp7N@shreckvampsnyc.0r6jr.mongodb.net/?retryWrites=true&w=majority';


MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('vamp-names')
    const vampCollection = db.collection('names')

    app.use(bodyParser.urlencoded({ extended: true }))

    app.listen(3000, function() {
    console.log(`listening on 3000`)
        })

    app.get(`/`, (req,res) => {
    res.sendFile(__dirname + `/index.html`)
    })

    app.post('/names', (req, res) => {
        vampCollection.insertOne(req.body)
          .then(result => {
            res.redirect('/')
          })
          .catch(error => console.error(error))
      })

    })
    .catch(error => console.error(error))

