function generateRandomPublicIP() {
    let octet1, octet2, octet3, octet4;

    do {
        octet1 = Math.floor(Math.random() * 256);
        octet2 = Math.floor(Math.random() * 256);
        octet3 = Math.floor(Math.random() * 256);
        octet4 = Math.floor(Math.random() * 256);

        // Exclude private IP address ranges
    } while ((octet1 === 10) ||                          // 10.0.0.0 - 10.255.255.255
    (octet1 === 172 && octet2 >= 16 && octet2 <= 31) ||  // 172.16.0.0 - 172.31.255.255
        (octet1 === 192 && octet2 === 168));        // 192.168.0.0 - 192.168.255.255

    return `${octet1}.${octet2}.${octet3}.${octet4}`;
}

document.getElementById('generateIPBin').addEventListener('click', () => {

    const randomIP = generateRandomPublicIP();
    document.getElementById('randomIP').textContent = `Generated IP: ${randomIP}`;

    fetch(`/userself-ip?ip=${randomIP}`)
        .then(response => response.json())
        .then(data => {
            console.log('Display all data:', data)
            const display = ['ip', 'continent_code', 'continent_name', 'country_code',
                'country_name', 'region_code', 'region_name', 'city', 'zip', 'latitude', 'longitude']
            document.getElementById('showRandomBin').innerHTML = `<pre>${JSON.stringify(data, display, 2)}</pre>`;

            // Simultaneously contributes this data to supabase
            contributeVisitor(data);
        })
    .catch(error => console.error('Error Fetching IP Address: ', error));
})

async function contributeVisitor(data) {
    console.log('Adding Visitor.');

    const IPInfo = {
        ip: data.ip,
        continent_code: data.continent_code,
        continent_name: data.continent_name,
        country_code: data.country_code,
        country_name: data.country_name,
        region_code: data.region_code,
        region_name: data.region_name,
        city: data.city,
        zip: data.zip,
        latitude: data.latitude,
        longitude: data.longitude
    };

    // Post ip information to supabase
    fetch('/visitors', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(IPInfo),
    })
    .then(response => response.json())
    .then(result => {
        console.log('Data successfully contributed to Supabase:', result);
    })
}

document.addEventListener('DOMContentLoaded', function() {
    // Fetch the visitors data when the page loads
    fetchVisitorsData();
});

// Fetch data from Supabase and display it in a table
function fetchVisitorsData() {
    fetch('/visitors')
        .then(response => response.json())
        .then(data => {
            console.log('Fetched data:', data);
            createTable(data);
        })
        .catch(error => {
            console.error('Error fetching visitors data:', error);
        });
}

function createTable(data) {
    const tableContainer = document.getElementById('visitorTable');
    const table = document.createElement('table');

    const headers = ['ID', 'IP', 'Continent', 'Country', 'Region', 'City', 'Zip', 'Latitude', 'Longitude'];
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body and rows
    const tbody = document.createElement('tbody');
    data.forEach(visitor => {
        const row = document.createElement('tr');
        
        const cells = [
            visitor.id, 
            visitor.ip, 
            visitor.continent_name, 
            visitor.country_name, 
            visitor.region_name, 
            visitor.city, 
            visitor.zip, 
            visitor.latitude, 
            visitor.longitude
        ];
        
        cells.forEach(cellData => {
            const td = document.createElement('td');
            td.textContent = cellData;
            row.appendChild(td);
        });

        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    tableContainer.innerHTML = ''; 
    tableContainer.appendChild(table);
}



