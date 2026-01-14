const fs = require('fs');
const path = require('path');
const https = require('https');
const products = require('./server/data/products');

const imageDir = path.join(__dirname, 'client', 'public', 'images');

if (!fs.existsSync(imageDir)) {
    fs.mkdirSync(imageDir, { recursive: true });
}

const http = require('http');

const downloadImage = (url, filepath) => {
    return new Promise((resolve, reject) => {
        const get = (currentUrl) => {
            const options = {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                }
            };

            const protocol = currentUrl.startsWith('https') ? https : http;

            protocol.get(currentUrl, options, (response) => {
                if (response.statusCode === 301 || response.statusCode === 302) {
                    const nextUrl = new URL(response.headers.location, currentUrl).href;
                    return get(nextUrl);
                }
                if (response.statusCode === 200) {
                    const file = fs.createWriteStream(filepath);
                    response.pipe(file);
                    file.on('finish', () => {
                        file.close(resolve);
                    });
                } else {
                    if (fs.existsSync(filepath)) {
                        fs.unlink(filepath, () => { });
                    }
                    reject(new Error(`Status Code: ${response.statusCode}`));
                }
            }).on('error', (err) => {
                if (fs.existsSync(filepath)) {
                    fs.unlink(filepath, () => { });
                }
                reject(err);
            });
        };
        get(url);
    });
};

const processProducts = async () => {
    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        const filename = product.title.toLowerCase().replace(/[^a-z0-9]/g, '-') + '.jpg';
        const filepath = path.join(imageDir, filename);

        // Skip if already downloaded (optional, but good for retrying)
        // if (fs.existsSync(filepath)) {
        //     console.log(`Skipping ${product.title} (already exists)`);
        //     product.image = `/images/${filename}`;
        //     product.images = [`/images/${filename}`];
        //     continue;
        // }

        console.log(`Downloading [${i + 1}/${products.length}] ${product.title}...`);

        try {
            await downloadImage(product.image, filepath);
            product.image = `/images/${filename}`;
            product.images = [`/images/${filename}`];
            successCount++;
        } catch (error) {
            console.error(`FAILED to download ${product.title}: ${error.message}`);
            // Keep the old URL if download fails so we can fix it manually
            failCount++;
        }
    }

    const content = `const products = ${JSON.stringify(products, null, 4)};\n\nmodule.exports = products;\n`;
    fs.writeFileSync('./server/data/products_local.js', content);
    console.log(`\nDownload complete. Success: ${successCount}, Failed: ${failCount}`);
    console.log('Updated data saved to server/data/products_local.js');
};

processProducts();
