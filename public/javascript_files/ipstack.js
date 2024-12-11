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
    // Generate a random IP
    const randomIP = generateRandomPublicIP();

    // Display the random IP in the #random-ip div
    document.getElementById('randomIP').textContent = `Generated IP: ${randomIP}`;
})
