

const jwt = require('jsonwebtoken')

function authenticate(req, res, next) {

  let headers = req.headers['authorization']
  if (headers) {
    const token = headers.split(' ')[1]
    const decoded = jwt.verify(token, 'THATSECRETSAUCE')
    if (decoded) {
      const username = decoded.username
      const authUser = users.find(user => user.username == username)
      if (authUser) {
        next() // perform the original request
      } else {
        res.json({error: 'Unable to authenticate'})
      }
    } else {
      res.json({error: 'Unable to authenticate'})
    }
  } else {
    res.json({error: 'Required headers are missing...'})
  }
}

module.exports = authenticate 

