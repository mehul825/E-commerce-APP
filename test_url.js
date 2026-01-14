const https = require('https');
const fs = require('fs');

const urls = [
    'https://images.unsplash.com/photo-v-G21d5J7lY?auto=format&fit=crop&w=800&q=80', // Kettle
    'https://images.unsplash.com/photo-H-LIL5JA8K0?auto=format&fit=crop&w=800&q=80', // Blender candidate
];

const options = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
};

urls.forEach((url, index) => {
    console.log(`Downloading URL ${index + 1}: ${url}...`);
    https.get(url, options, (response) => {
        console.log(`URL ${index + 1} Status: ${response.statusCode}`);
        if (response.statusCode >= 300 && response.statusCode < 400) {
            console.log(`URL ${index + 1} Redirect to: ${response.headers.location}`);
        }
    }).on('error', (e) => {
        console.error(`URL ${index + 1} Error: ${e.message}`);
    });
});
