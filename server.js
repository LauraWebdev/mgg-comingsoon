const path = require('path');
const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const app = express();

// Certificate
const sslPK = fs.readFileSync('/etc/letsencrypt/live/mygarage.games/privkey.pem', 'utf8');
const sslCert = fs.readFileSync('/etc/letsencrypt/live/mygarage.games/cert.pem', 'utf8');
const sslCA = fs.readFileSync('/etc/letsencrypt/live/mygarage.games/chain.pem', 'utf8');
const credentials = {
    key: sslPK,
    cert: sslCert,
    ca: sslCA
};

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.htm'));
});

app.get('/discord', (req, res) => {
    res.redirect("https://discord.gg/vcr7Fk6MT6");
});

app.use(express.static('public', { dotfiles: 'allow' }));

// Servers
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(80, () => {
    console.log(`[mgg-comingsoon] HTTP server running.`);
});
httpsServer.listen(443, () => {
    console.log(`[mgg-comingsoon] HTTPS server running.`);
});