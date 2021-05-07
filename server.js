const path = require('path');
const express = require('express');
const app = express();
const port = 80;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.htm'));
});

app.get('/discord', (req, res) => {
    res.redirect("https://discord.gg/vcr7Fk6MT6");
});

app.use(express.static('public', { dotfiles: 'allow' }));

app.listen(port, () => {
    console.log(`[mgg-comingsoon] Server running on port ${port}`);
})