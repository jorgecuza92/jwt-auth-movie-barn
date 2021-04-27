
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const cors = require('cors')
const authenticate = require('./authMiddleware')

app.use(cors())
app.use(express.json())

global.users = [{
  username: 'jorge123',
  password: 'password'
}]


const movies = [
  {title: 'Joker', year: '2019', director: 'Todd Phillips', genre: 'Drama', username: 'jorge123'},
  {title: 'The Fly', year: '1986', director: 'David Cronenberg', genre: 'Horror/Sci-Fi', username: 'jorge123'}
]

app.get('/movies', (req,res) => {
  res.json([])
})

app.get('/my-movies', authenticate, (req,res) => {
  res.json([{title: 'Kill List', year: '2011', director: 'Ben Wheatley', genre: 'Horror/Thriller'}])
})

app.get('/movies/:username', authenticate, (req, res) => {
  const username = req.params.username
  const userMovies = movies.filter(movie => movie.username == username)

  res.json(userMovies)
})


app.post('/login', (req,res) => {
  
  const username = req.body.username
  const password = req.body.password

  const authUser = users.find((user) => user.username == username && user.password == password)
  if(authUser) {
    // generate a token!
   const token = jwt.sign({ username: username }, 'THATSECRETSAUCE')
    res.json({success: true, token: token, username: username})
  } else {
    res.json({success: false})
  }
})

app.listen(8080, () => {
  console.log('Server is running...')
})