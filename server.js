const express = require("express"),
      app = express(),
      logger = require("morgan"),
      PORT = process.env.PORT || 3001,
      fs = require('fs'),
      path = require('path'),
      axios = require('axios');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("dev"));
app.use(express.static('public'));

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
  }

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
});

app.get('/#/hash', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/hash.html'));
})

app.post('/bombbomb', async (req, res) => {
    const data = await axios.post('https://app.bombbomb.com/auth/access_token', req.body)
    res.json(data);
})

app.listen(PORT, () => console.log(`The server has started on PORT: ${PORT}`));
