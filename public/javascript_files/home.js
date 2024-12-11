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
