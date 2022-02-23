const Clarifai = require('clarifai')
const cors = require('cors')

const app = new Clarifai.App({
    apiKey: 'bea8b3a0cef84ba2a34213c5480a85c7'
})

const handleApiCall = (req, res) => {
    console.log(req.body.input)
    app.models
    .predict(
      {
        id: "a403429f2ddf4b49b307e318f00e528b",
        version: "34ce21a40cc24b6b96ffee54aabff139",
      },
      req.body.input
        )
        //.predict('c0c0ac362b03416da06ab3fa36fb58e3', req.body.input) // Clarifai.FACE_DETECT_MODEL,- use this or the string  <-----
        .then(data => res.send(data))
        .catch(err => res.status(400).json('Unable to work with API'))
}

const handleImage = (req, res, db) => {
    const { id } = req.body
    db('users').where('id', '=', id)
        .increment({'entries': 1})
        .returning('entries')
        .then(entries => res.send(entries[0].entries))
        .catch(err => res.status(400).send('entry could not be updated'))
}

module.exports = {
            handleImage,
            handleApiCall
            }