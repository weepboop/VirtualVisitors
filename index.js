require('dotenv').config();
const express = require('express')
const supabaseClient = require('@supabase/supabase-js')

const app = express()
const port = 3000
app.use(express.static(__dirname + '/public'))

const supabaseUrl = process.env.supabaseUrl;
const supabaseKey = process.env.supabaseKey;

app.get('/visitors', (req, res) => {
    console.log('Attempting to get all vistors.')
    res.send('Blah')
})

app.post('/visitor', (req, res) => {
    console.log('Attempting to add vistor.')
})

app.listen(port, () => {
    console.log('App is Live.')
})