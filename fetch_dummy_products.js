const https = require('https');

const url = 'https://dummyjson.com/products?skip=100&limit=100';

https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        const products = JSON.parse(data).products;
        const fs = require('fs');
        let output = '';
        products.forEach(p => {
            output += `${p.id}: ${p.title} (${p.category}) - ${p.thumbnail}\n`;
        });
        fs.writeFileSync('dummy_products_list.txt', output);
        console.log('Written to dummy_products_list.txt');
    });
}).on('error', (err) => {
    console.error('Error:', err.message);
});
