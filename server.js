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
      host : 'salty-scrubland-21115.herokuapp.com',
      user : '',
      password : '',
      database : 'smart-brain-db'
    }
  });

const app = express()

app.use(express.json());
app.use(cors())

app.post('salty-scrubland-21115.herokuapp.com/signin', (req, res) => signin.handleSignIn(req, res, db, bcrypt))  
app.post('salty-scrubland-21115.herokuapp.com/register', (req,res) => register.handleRegister(req, res, db, bcrypt))
app.get('salty-scrubland-21115.herokuapp.com/profile/:id', (req, res) => profile.handleProfile(req, res, db)) 
app.put('salty-scrubland-21115.herokuapp.com/image', (req, res) => image.handleImage(req, res, db))
app.post('salty-scrubland-21115.herokuapp.com/imageurl', (req, res) => image.handleApiCall(req, res))

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`)
})


