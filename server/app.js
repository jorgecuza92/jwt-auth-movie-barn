
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const cors = require('cors')

app.use(cors())
app.use(express.json())

const users = [{
  username: 'jorge123',
  password: 'password'
}]


const movies = [
  {title: 'Joker', year: '2019', director: 'Todd Phillips', genre: 'Drama', username: 'jorge123'},
  {title: 'The Fly', year: '1986', director: 'David Cronenberg', genre: 'Horror/Sci-Fi', username: 'jorge123'}
]

app.get('/movies/:username', (req, res) => {

  let headers = req.headers['authorization']
  if (headers) {
    const token = headers.split(' ')[1]
    const decoded = jwt.verify(token, 'THATSECRETSAUCE')
    if (decoded) {
      const username = decoded.username
      const authUser = users.find(user => user.username == username)
      if (authUser) {
        const userMovies = movies.filter(movie => movie.username == username)
        res.json(userMovies)
      } else {
        res.json({error: 'Unable to authenticate'})
      }
    } else {
      res.json({error: 'Unable to authenticate'})
    }
  } else {
    res.json({error: 'Required headers are missing...'})
  }
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