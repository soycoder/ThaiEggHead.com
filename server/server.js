// const express = require('express')
import express from 'express'

const app = express()
const port = 5000 || process.env.PORT

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api', (req, res) => {
    res.send('Hello API')
  })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})