const host = window.location.origin;
// API that allows user to fetch their own ip address

document.getElementById('getUserIP').addEventListener('click', () => {
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            console.log('User IP Address:', data.ip);
            const userIP = data.ip;
            document.getElementById('userIP').textContent = `User IP: ${userIP}`;
            fetch(`/userself-ip?ip=${userIP}`)
                .then(response => response.json())
                .then(data => {
                    const display = ['ip', 'continent_code', 'continent_name', 'country_code',
                        'country_name', 'region_code', 'region_name', 'city', 'zip', 'latitude', 'longitude']
                    document.getElementById('displayBin').innerHTML = `<pre>${JSON.stringify(data, display, 2)}</pre>`;
                    createMap(data.latitude, data.longitude);
                })
        })
        .catch(error => console.error('Error Fetching IP Address: ', error));
})

let mapInstance; // Keep track of the map instance to avoid multiple initializations

document.getElementById('getUserIP').addEventListener('click', () => {
    const host = window.location.origin;

    fetch(`${host}/userself-ip`)
        .then(response => response.json())
        .then(data => {
            console.log('IP Data:', data);

            // Display the user's IP address
            document.getElementById('userIP').textContent = `IP: ${data.ip}`;

            // Use latitude and longitude to create the map
            if (data.latitude && data.longitude && data.latitude !== 0 && data.longitude !== 0) {
                createMap(data.latitude, data.longitude);
            } else {
                console.error('Invalid geolocation data:', data);
                alert('Unable to retrieve geolocation data.');
            }
        })
        .catch(error => console.error('Error fetching IP data:', error));
});

function createMap(latitude, longitude) {
    // Check if the map already exists
    if (mapInstance) {
        mapInstance.setView([latitude, longitude], 15); // Update the view
    } else {
        // Initialize the map
        mapInstance = L.map('map').setView([latitude, longitude], 15);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            minZoom: 10,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(mapInstance);
    }
}