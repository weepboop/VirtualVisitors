require('dotenv').config();
const express = require('express')
const supabaseClient = require('@supabase/supabase-js')
const bodyParser = require('body-parser')

const app = express()
const port = 3000
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))

app.listen(port, () => {
    console.log('App is Live.')
})

const supabaseUrl = process.env.supabaseUrl;
const supabaseKey = process.env.supabaseKey;
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);

app.get('/', (req, res) => {
    res.sendFile('public/html_files/home.html', {root: __dirname})
})

app.get('/visitors', async (req, res) => {
    console.log('Attempting to get all vistors.')

    const {data, error} = await supabase.from('visitors').select();
    
    if (error) {
        console.log('Error: ', error)
        res.send(error);
    } else {
        console.log('Successfully Retrieved Data.');
        res.send(data);
    } 
})

app.post('/visitors', async (req, res) => {
    console.log('Attempting to add vistor.')
    console.log('Request: ', req.body)

    const ip = req.body.ip;
    const continent_code = req.body.continent_code;
    const continent_name = req.body.continent_name;
    const country_code = req.body.country_code;
    const country_name = req.body.country_name;
    const region_code = req.body.region_code;
    const region_name = req.body.region_name;
    const city = req.body.city;
    const zip = req.body.zip;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;

    const {data, error} = await supabase.from('visitors').insert({
        ip: ip,
        continent_code: continent_code,
        continent_name: continent_name,
        country_code: country_code,
        country_name: country_name,
        region_code: region_code,
        region_name: region_name,
        city: city,
        zip: zip,
        latitude: latitude,
        longitude: longitude
    })
    .select();

    if (error) {
        console.log('Error: ', error)
        res.send(error);
    } else {
        console.log('Successfully Retrieved Data.');
        res.send(data);
    } 
})

// 
const axios = require('axios');
const ipstackKey = process.env.ipstackKey;

async function fetchIPData(ipAddress) {
    const ipstackUrl = `http://api.ipstack.com/${ipAddress}?access_key=${ipstackKey}`;
    try {
        const response = await axios.get(ipstackUrl);
        return response.data;
    } catch (error) {
        console.error('Error fetching IPStack Data', error.message);
        throw new Error('Failed to fetch IPStack data.')
    }
}

app.get('/userself-ip', async (req, res) => {
    const userIP = req.query.ip;
    const ipstackData = await fetchIPData(userIP);
    res.json(ipstackData);
})