require('dotenv').config();

const path = require('path');
const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const forceSecure = require('express-force-https');

let isDev = process.env.NODE_ENV !== 'prod';

const app = express();

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.htm'));
});

app.get('/discord', (req, res) => {
    res.redirect("https://discord.gg/vcr7Fk6MT6");
});

app.use(express.static('public', { dotfiles: 'allow' }));

// HTTP to HTTPS redirect
if(!isDev) {
    app.use(forceSecure);
}

// Servers
const httpServer = http.createServer(app);
httpServer.listen(80, () => {
    console.log(`[mgg-comingsoon] HTTP server running.`);
});

if(!isDev) {
    const sslPK = fs.readFileSync('/etc/letsencrypt/live/mygarage.games/privkey.pem', 'utf8');
    const sslCert = fs.readFileSync('/etc/letsencrypt/live/mygarage.games/cert.pem', 'utf8');
    const sslCA = fs.readFileSync('/etc/letsencrypt/live/mygarage.games/chain.pem', 'utf8');
    const credentials = {
        key: sslPK,
        cert: sslCert,
        ca: sslCA
    };

    const httpsServer = https.createServer(credentials, app);
    httpsServer.listen(443, () => {
        console.log(`[mgg-comingsoon] HTTPS server running.`);
    });
} else {
    console.log(`[mgg-comingsoon] HTTPS server disabled on development instances.`);
}