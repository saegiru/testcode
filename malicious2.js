console.log('This script was remotely loaded and executed!');

// Simulate a side effect (e.g., creating a test file in AWS Cloud9)2342
const fs = require('fs');
const filePath = '/home/ec2-user/environment/test_file.txt'; // Adjust path as needed for Cloud9

fs.writeFile(filePath, 'Remote script executed successfully!', (err) => {
    if (err) {
        console.error('Error writing file:', err);
    } else {
        console.log(`File created: ${filePath}`);
    }
});
