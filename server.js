const express = require('express')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')
const signin = require('./controllers/handleSignIn')
const register = require('./controllers/handleRegister')
const profile = require('./controllers/handleProfile')
const image = require('./controllers/image')

const db = knex({
    client: 'pg',
    connection: {
      host : 'https://salty-scrubland-21115.herokuapp.com/',
      user : '',
      password : '',
      database : 'smart-brain-db'
    }
  });

const app = express()

app.use(express.json());
app.use(cors())

app.get('/', (req, res) => res.send('It is running!'))
app.post('https://salty-scrubland-21115.herokuapp.com/signin', (req, res) => signin.handleSignIn(req, res, db, bcrypt))  
app.post('https://salty-scrubland-21115.herokuapp.com/register', (req,res) => register.handleRegister(req, res, db, bcrypt))
app.get('https://salty-scrubland-21115.herokuapp.com/profile/:id', (req, res) => profile.handleProfile(req, res, db)) 
app.put('https://salty-scrubland-21115.herokuapp.com/image', (req, res) => image.handleImage(req, res, db))
app.post('https://salty-scrubland-21115.herokuapp.com/imageurl', (req, res) => image.handleApiCall(req, res))

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`)
})


