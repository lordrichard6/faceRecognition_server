// https://www.udemy.com/the-complete-web-developer-zero-to-mastery/learn/lecture/8915974

/* lesson
To avoid your api key exposure and potencial stealing, move it from the front-end 
to the back-end.
-npm install clarifai
export it to the image controler.
 */
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signIn = require('./controllers/signIn');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : 'postgresql-reticulated-42326',
      user : 'reizinho',
      password : '',
      database : 'smart-brain'
    }
  });

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => { res.send('it is working') })
app.post('/signin', (req, res) => { signIn.handleSignIn(req, res, db, bcrypt) })
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
})

