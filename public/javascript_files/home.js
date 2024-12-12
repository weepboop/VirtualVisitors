// API that allows user to fetch their own ip address

document.getElementById('getUserIP').addEventListener('click', () => {
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            console.log('User IP Address:', data.ip);
            const userIP = data.ip;

            fetch(`/userself-ip?ip=${userIP}`)
                .then(response => response.json())
                .then(data => {
                    const display = ['ip', 'continent_code', 'continent_name', 'country_code',
                        'country_name', 'region_code', 'region_name', 'city', 'zip', 'latitude', 'longitude']
                    document.getElementById('displayBin').innerHTML = `<pre>${JSON.stringify(data, display, 2)}</pre>`;
                })
        })
        .catch(error => console.error('Error Fetching IP Address: ', error));
})

//Leaflet.js Map Creator
function createMap() {
    var map = L.map('map');

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        minZoom: 10,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    map.locate({setView: true})
    .on('locationerror', function(e){
        console.log(e);
        alert("Location access has been denied.");
    });
}

window.onload = createMap