const https = require('https');
const fs = require('fs');
const path = require('path');

const url = 'https://fakestoreapi.com/products';
const dest = path.join(__dirname, 'client', 'public', 'images', 'leather-biker-jacket.jpg');

console.log('Fetching product list...');

https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        try {
            const products = JSON.parse(data);
            const jacket = products.find(p => p.title.toLowerCase().includes('jacket'));

            if (jacket) {
                console.log(`Found Jacket: ${jacket.title} - ${jacket.image}`);
                downloadImage(jacket.image, dest);
                // Also update the products.js file with this new URL just in case
                updateProductFile(jacket.image);
            } else {
                console.log('No jacket found');
            }
        } catch (e) {
            console.error('Error parsing JSON:', e.message);
        }
    });
}).on('error', (err) => {
    console.error('Error fetching list:', err.message);
});

function downloadImage(imgUrl, destination) {
    const file = fs.createWriteStream(destination);
    console.log(`Downloading ${imgUrl} to ${destination}...`);

    https.get(imgUrl, (response) => {
        if (response.statusCode === 200) {
            response.pipe(file);
            file.on('finish', () => {
                file.close(() => {
                    console.log('Download completed successfully.');
                });
            });
        } else {
            console.error(`Download failed with status code: ${response.statusCode}`);
            file.close();
            fs.unlink(destination, () => { });
        }
    }).on('error', (err) => {
        fs.unlink(destination, () => { });
        console.error(`Error downloading image: ${err.message}`);
    });
}

function updateProductFile(newUrl) {
    const productsPath = path.join(__dirname, 'server', 'data', 'products.js');
    try {
        let content = fs.readFileSync(productsPath, 'utf8');
        // Replace the old failing URL or just the field for the leather jacket
        // We look for the line containing "Leather Biker Jacket" and then the image line after it
        // Or simpler: replace the specific known bad URL if it's there, or just the text we put in previously

        // The previous URL we put was: https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg
        // Let's replace that specific string
        const oldUrl = 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg';

        if (content.includes(oldUrl)) {
            content = content.replace(oldUrl, newUrl);
            fs.writeFileSync(productsPath, content, 'utf8');
            console.log('Updated products.js with correct URL');
        } else {
            console.log('Could not find old URL in products.js to replace, manual check needed.');
        }
    } catch (err) {
        console.error('Error updating products.js:', err.message);
    }
}
