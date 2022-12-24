const express = require('express')
const app = express()
const fs = require('fs')

app.use(express.json())

app.listen(3000, console.log('se inicio el servidor'))

app.get('/canciones', (req, res) => {
  const canciones = JSON.parse(fs.readFileSync('canciones.json'))
  res.send(canciones)
})

app.delete('/canciones/:id', (req, res) => {
  const { id } = req.params
  const canciones = JSON.parse(fs.readFileSync('canciones.json'))
  const index = canciones.findIndex((song) => song.id == id)
  canciones.splice(index, 1)
  fs.writeFileSync('canciones.json', JSON.stringify(canciones))
  res.send('cancion se elimino con exito')
})

app.put('/canciones/:id', (req, res) => {
  const { id } = req.params
  const cancion = req.body
  const canciones = JSON.parse(fs.readFileSync('canciones.json'))
  const index = canciones.findIndex((song) => song.id == id)
  canciones[index] = cancion
  fs.writeFileSync('canciones.json', JSON.stringify(canciones))
  res.send('cancion se modifico con exito')
})

app.post('/canciones', (req, res) => {
  const cancion = req.body
  const canciones = JSON.parse(fs.readFileSync('canciones.json'))
  var existe = false
  for (song of canciones) {
    if((song.titulo == cancion.titulo) && (song.artista == cancion.artista) && (song.tono == cancion.tono)){
        existe = true
    }
  }
  if (existe) {
    res.send('cancion ya se encuentra en la lista')
  } else {
    canciones.push(cancion)
    fs.writeFileSync('canciones.json', JSON.stringify(canciones))
    res.send('cancion se guardo con exito')
  }
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})
